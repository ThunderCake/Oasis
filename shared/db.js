const nedb = require('nedb');
const { promisify } = require('util');

const oasis = new nedb({ filename: './oasis.db', autoload: true });
const hosts = new nedb({ filename: './host.db', autoload: true });

for (const method of ['insert', 'remove', 'find', 'findOne', 'ensureIndex']) {
    oasis[method + 'Async'] = promisify(oasis[method])
    hosts[method + 'Async'] = promisify(hosts[method])
}

module.exports = { oasis, hosts };