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


const pets = [{
        id: 1,
        name: 'cat'
    },
    {
        id: 2,
        name: 'dog'
    },
    {
        id: 3,
        name: 'horse'
    }
];
/*
 * get method
 * @param path/url & callback function (a route handler) with request and response params 
 */

// Create a get method
// Define a route 
app.get('/', (req, res) => {
    // request obj info on incoming requests
    res.send('Pets World');
});

// define another route to get list of pets from the database
app.get('/api/pets', (req, res) => {
    res.send(pets);
});

// Implement route to get a single pet
app.get('/api/pets/:id', (req, res) => {
    //send to client
    const pet = pets.find(c => c.id === parseInt(req.params.id));
    if (!pet) {
        res.status(404).send('This pet was not found');
    };
    res.send(pet);

});

// multiple parameters
// app.get('/api/pets/:year/:month', (req, res) => {
//     res.send(req.params); //send to client
// });

// Optional query parameters
// app.get('/api/pets/:year/:month', (req, res) => {
//     res.send(req.query); //send to client
// });

// listen on a given port

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening to PORT ${port} ...`)
});

// NB: read objects in js from json
