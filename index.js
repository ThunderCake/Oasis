const chokidar = require('chokidar');
const md5 = require('md5-file/promise');
const { existSync, writeFileSync } = require('fs');
const { promisify } = require('util');
const nedb = require('nedb');

const db = new nedb({ filename: './oasis.db', autoload: true });
for (const method of ['insert', 'find', 'ensureIndex']) {
    db[method + 'Async'] = promisify(db[method])
}

const toWatch = [
    // '/Users/yadomi/Movies/*.mp4',
    '/Users/yadomi/Movies/*.mkv',
    // '/Users/yadomi/Movies/*.avi',
]

const upsert = async (path) => {
    const hash = await md5(path);
    const b = await db.findAsync({ hash })

    console.log({ b })

    // const a = await db.insertAsync({ hash, path });
    // console.log({ a })
}

(async () => {
    await db.ensureIndex({ fieldName: 'hash', unique: true });

    chokidar.watch(toWatch, { persistent: true })
        .on('add', upsert)
})();