const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload')
const app = express();

app.use(fileupload())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/', require('./api/index'))

app.listen(8080, (err) => {
    if (err) throw err;
    console.log("server's alive")
});