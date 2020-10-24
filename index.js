// dependencies
const Joi = require('joi');
const express = require('express');
const app = express();
const fs = require('fs');

// JSON (Q *Where was this used*)
const packageJson = require("pkg.json");
app.use(express.json()); // parsing of JSON object in the body of the request


// reading dB
const data = fs.readFileSync('./pets.json');
const dB = JSON.parse(data);

// Testing the dB (delete when finished)
console.log(dB);

/**
 * This is a creation of a get method
 * @method
 * @param {url} path - The url path to define a route
 * @param {function} callback - A route handler with request and response params 
 */
app.get('/', (req, res) => {
    // request obj info on incoming requests
    res.send('Hello Pets!!!');
});

// define another route to get list of pets from the database
app.get('/api/pets', (req, res) => {
    res.send(dB); // Q*Convert json objects to js obj*
}); 

// Implement route to get a single pet
app.get('/api/pets/:id', (req, res) => {
    // Look up the pet with a given id & get a single pet using id
    const pet = dB.find(c => c.id === parseInt(req.params.id));
    // If pet doesn't exist return 404: Not Found
    if (!pet) return res.status(404).send('The pet was not found');
    // Return the pet to the client
    res.send(pet);
});

// Server: listening on a given port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
