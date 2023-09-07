const app = require('express')();
const routes = require('./routes.js');

app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use('/api', routes)

app.get('/test', (req, res) => {res.send(":D")});

module.exports= app;