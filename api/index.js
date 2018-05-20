const express = require('express');
const app = express();
const nedb = require('nedb');
const { promisify } = require('util');
const { hosts } = require('../shared/db');

const PORT = 4242;
app.use(express.json());

app.get('/admin/hosts', async (req, res) => {
    const result = await hosts.findAsync({}).catch(e => console.log(e));
    res.send(result);
});

app.post('/admin/add/host', async (req, res) => {
    const posts = req.body;
    await hosts.ensureIndexAsync({ fieldName: 'domain', unique: true });
    const query = await hosts.insertAsync(posts);
});

app.listen(PORT, () => {
    console.log(`Server started on http://0.0.0.0:${PORT}`);
});