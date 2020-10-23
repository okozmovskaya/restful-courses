// dependencies
const Joi = require('joi');
const express = require('express');
const app = express();
const fs = require('fs');

// reading dB
const data = fs.readFileSync('./pets.json');
const dB = JSON.parse(data);

// Testing the dB (delete when finished)
console.log(dB);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
