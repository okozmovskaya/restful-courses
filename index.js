// dependencies
const Joi = require('joi');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

// use this package to read data from the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// JSON (Q *Where was this used*)
const packageJson = require("pkg.json");
app.use(express.json()); // parsing of JSON object in the body of the request


// reading dB
const data = fs.readFileSync('./pets.json');
const dB = JSON.parse(data);

// POST

// adding data
app.post("/api", (req, res) => {
    
    const schema = Joi.object({
        id:Joi.number(),
        name:Joi.string().min(3).required(),
        img: Joi.string(),
        type: Joi.string().min(3).required(),
        breed: Joi.string().min(3).required(),
        description: Joi.string(),
        age: Joi.string(),
        inoculations: Joi.array().items(Joi.string()),
        diseases: Joi.array().items(Joi.string()),
        parasites: Joi.array().items(Joi.string())
    });

    const result = schema.validate(req.body);

    if(result.error) return res.status(400).send(result.error.details[0].message);

    const pet = {
        id: dB.length + 1,
        name: req.body.name,
        img: req.body.img,
        type: req.body.type,
        breed: req.body.breed,
        description: req.body.description,
        age: req.body.age,
        inoculations: req.body.inoculations,
        diseases: req.body.diseases,
        parasites: req.body.parasites
    };
        
    dB.push(pet);
    res.send(pet);
});

// Testing the dB (delete when finished)
console.log(dB);


// DELETE
app.delete("/api/dB/:id", (req, res) => {
    // Look up the pet
    // Not existing, return 404
    let pet = dB.find(c => c.id === parseInt(req.params.id));
    if (!pet) res.status(404).send("The pet with the given ID was not found.");
    res.send(pet);

    // Delete
    const index = dB.indexOf(pet);
    dB.splice(index, 1);

    // Return the same pet
    res.send(pet);
});


// Server
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
app.listen(port, () => console.log(`Listening on port ${port}...`));
