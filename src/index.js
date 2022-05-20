const express = require('express');
const app = express();

app.use('/api/', require('./api/index'))

app.listen(8080, (err) => {
    if (err) throw err;
});