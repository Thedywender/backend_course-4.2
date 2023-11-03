const express = require('express');

const app = express();

app.get('/', (req, res) => res.status(200).json({ mesage: 'Olá mundo' }));

module.exports = app;