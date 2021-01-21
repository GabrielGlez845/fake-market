const express = require('express');

const app = express();

app.use(require('./cliente'));
app.use(require('./mueble'));

module.exports = app;