const NeDB = require('nedb')
const { promisify } = require('util')

const oasis = new NeDB({ filename: './database/oasis.db', autoload: true })

// [
//    {"id_rsa": "/path", "domain": "neo.thundercake.space", "login":"ssh", "port":"2242", "db":"/path/to/oasis.db"},
//    {"id_rsa": "/path", "domain": "yadomi.thundercake.space", "login":"ssh", "port":"2222", "db":"/path/to/oasis.db"}
// ]
const hosts = new NeDB({ filename: './database/host.db', autoload: true })

// [
//   {"key": "tmdb_api_key", "value": "42"},
//   {"key": "watch_paths", "value": [  "/home/lucien/Videos/films/*.avi" ] }
// ]
const settings = new NeDB({ filename: './database/settings.db', autoload: true })

for (const method of ['insert', 'remove', 'update', 'find', 'findOne', 'ensureIndex']) {
    oasis[method + 'Async'] = promisify(oasis[method])
    hosts[method + 'Async'] = promisify(hosts[method])
    settings[method + 'Async'] = promisify(settings[method])
}

module.exports = { oasis, hosts, settings }
