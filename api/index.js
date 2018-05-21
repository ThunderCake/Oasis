const express = require('express')
const NeDB = require('nedb')
const Rsync = require('rsync')
const { hosts, settings } = require('../shared/db')
const { resolve } = require('path');

const api = express()
api.use(express.json())

const PORT = 4242
const NODE_ENV = process.env.NODE_ENV || 'development';

if (NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');

    const config = require('../webpack.development.js');
    const compiler = webpack(config);

    api.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));
    api.use(require("webpack-hot-middleware")(compiler));
} else {
    api.use('/public', express.static(resolve(__dirname, '../public/')));
}

/**
 * setting endpoint
 */
api.get('/api/settings', async (req, res) => {
    const results = await settings.findAsync({})
    return res.json(results)
})

api.post('/api/settings/add', async (req, res) => {
    const params = req.body
    await settings.ensureIndexAsync({ fieldName: 'key', unique: true })
    try {
        const entries = await settings.insertAsync(params)
        return res.json(entries)
    } catch (e) {
        res.status(400)
        return res.json({ error: e.message })
    }
})

/**
 * host endpoint
 */
api.get('/api/host/list', async (req, res) => {
    const result = await hosts.findAsync({})
    res.send(result)
})

api.post('/api/host/add', async (req, res) => {
    const posts = req.body
    await hosts.ensureIndexAsync({ fieldName: 'domain', unique: true })
    try {
        const entries = await hosts.insertAsync(posts)
        return res.json(entries)
    } catch (e) {
        res.status(400)
        return res.json({ error: e.message })
    }
})

api.put('/api/host/update/:id', async (req, res) => {
    const body = req.body
    const { id } = req.params

    const entry = await hosts.findOneAsync({ _id: id })
    if (!entry) return res.status(404).send({ error: 'Not found' })

    await hosts.updateAsync({ _id: id }, body)
    res.send({ status: 'ok' })
})

/**
 * remote db endpoint
 */
api.post('/api/remotedb/:id', async (req, res) => {
    const { id } = req.params

    const entry = await hosts.findOneAsync({ _id: id })
    if (!entry) return res.status(404).send({ error: 'Not found' })

    const { privateKey, username, hostname, db } = entry
    const destination = `/tmp/${hostname}.oasis.db`
    const source = `${username}@${hostname}:${db}`

    const rsync = new Rsync()
        .set('rsh', `ssh -i ${privateKey} -o StrictHostKeyChecking=no`)
        .flags('az')
        .source(source)
        .destination(destination)

    rsync.execute((error, code, cmd) => {
        if (error) {
            return res.status(400).send({ error, code })
        }

        const db = new NeDB({ filename: destination, autoload: true })
        db.find({}, (err, entries) => {
            if (err) {
                return res.status(400).send(err)
            }
            return res.send(entries)
        })
    })
})

api.get('*', (req, res) => {
    return res.sendFile(resolve(__dirname, '../public/index.html'));
})

api.listen(PORT, () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`)
})
