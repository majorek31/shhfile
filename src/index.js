const express = require('express');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload')
const app = express();
const fs = require('fs');
const path = require('path');

fs.mkdirSync(path.join(__dirname, '../data'))

app.use(fileupload())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/', require('./api/index'))
app.use('/files/', require('./files/index'))

app.listen(8080, (err) => {
    if (err) throw err;
    console.log("server's alive")
});