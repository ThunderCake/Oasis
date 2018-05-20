const chokidar = require('chokidar')
const md5 = require('md5-file/promise')
const chalk = require('chalk')
const { basename } = require('path')
const { refine, tmdb } = require('rafini')

const { oasis } = require('../shared/db')

const toWatch = [
    '/Users/yadomi/Movies/*.mp4',
    '/Users/yadomi/Movies/*.mkv',
    '/Users/yadomi/Movies/*.avi',
]

const upsert = async (path) => {
    const hash = await md5(path)
    const entry = await oasis.findOneAsync({ hash })
    if (entry) return

    const filename = basename(path)
    const title = refine(filename)
    const match = await tmdb(title, { apikey: process.env.API_KEY })

    if (!match || !title || title === '') {
        console.info(chalk.yellow(`[Warning]: `) + `Movie ${filename} was not found on TMDB`)
        console.info(chalk.yellow(`[Warning]: `) + `Consider renaming it for a better match`)
    } else {
        await oasis.insertAsync({ hash, path, ...match })
        console.info(chalk.green(`[New]: `) + `${match.title}`)
    }
}

const remove = async (path) => {
    const entry = await oasis.findOneAsync({ path })
    if (entry) {
        await oasis.removeAsync({ path })
        console.info(chalk.red(`[Removed]: `) + `${entry.title}`)
    }
}

const shouldInitDatabaseIfEmpty = async () => {
    const entries = await oasis.findAsync({})
    return Boolean(entries.length)
}

(async () => {
    await oasis.ensureIndexAsync({ fieldName: 'hash', unique: true })
    const ignoreInitial = await shouldInitDatabaseIfEmpty()

    if (!ignoreInitial) {
        console.log(chalk.blue('[Notice]: ') + 'Database is empty, will run initial scan')
    }

    chokidar.watch(toWatch, { persistent: true, ignoreInitial })
        .on('ready', () => console.log(chalk.green('[Ready]: ') + 'Oasis Watcher is ready for changes'))
        .on('add', upsert)
        .on('unlink', remove)
})()
