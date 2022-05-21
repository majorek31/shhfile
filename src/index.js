const express = require('express');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload')
const app = express();
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

try {
    fs.mkdirSync(path.join(__dirname, '../data'))
} catch (err) {
    if (err)
        if (!err.code === "EEXIST")
            throw err
}

app.use(fileupload())
app.use(bodyparser.urlencoded({extended: true}))

app.use('/api/', require('./api/index'))
app.use('/files/', require('./files/index'))

if (config.routing.enabled){
    try {
        fs.mkdirSync(path.join(__dirname, '../public'))
    } catch (err) {
        if (err)
         if (!err.code === "EEXIST")
            throw err
    }
    app.use('/', express.static(path.join(__dirname, '../public')))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, `../public/${config.routing.index}`))
    })
}

app.listen(config.port, (err) => {
    if (err) throw err;
    console.log(`Server started listening on port: ${config.port}`)
});