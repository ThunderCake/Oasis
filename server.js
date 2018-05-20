const express = require('express');
const app = express();
const nedb = require('nedb');
const { promisify } = require('util');

const db = new nedb({ filename: './host.db', autoload: true });


for (const method of ['insert', 'find', 'ensureIndex']) {
    db[method + 'Async'] = promisify(db[method])
}

app.use(express.json());
app.get('/admin/hosts', async (req, res) => {

    const result = await db.findAsync({}).catch(e => console.log(e));
 
    res.send(result);
});

app.post('/admin/add/host', async (req, res) => {

    var posts = req.body;

    await db.ensureIndexAsync({ fieldName: 'domain', unique: true });
    
        const query = await db.insertAsync(posts);
});


app.listen(4242, () => {
    console.log(`Server started on port`);
});