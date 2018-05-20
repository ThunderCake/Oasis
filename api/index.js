const express = require('express');
const api = express();
const nedb = require('nedb');
const { promisify } = require('util');
const { hosts } = require('../shared/db');
const { settings } = require('../shared/db');


const PORT = 4242;
api.use(express.json());

api.get('/hosts', async (req, res) => {
    const results = await hosts.findAsync({}).catch(e => e.message);
    res.send(results);
});

api.post('/hosts/add', async (req, res) => {
    const posts = req.body;
    await hosts.ensureIndexAsync({ fieldName: 'domain', unique: true });
    try {

        const query = await hosts.insertAsync(posts);

        res.status(200);
        return res.json(query);
    } catch(e) {
        res.status(400);
        return res.json({"error" : e.message});
    }

});

api.get('/settings', async(req, res) => {
    const results = await settings.findAsync({});
    
    res.json(results);
});

api.post('/settings/add', async(req, res) => {
    const params = req.body;
    await settings.ensureIndexAsync({ fieldName: 'key', unique: true });
    try {

        const query = await settings.insertAsync(params);

        res.status(200);
        return res.json(query);
    } catch(e) {
        res.status(400);
        return res.json({"error" : e.message});
    }

});

api.listen(PORT, () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
});