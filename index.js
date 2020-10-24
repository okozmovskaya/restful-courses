// dependencies
const Joi = require('joi');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// reading dB
const data = fs.readFileSync('./pets.json');
const dB = JSON.parse(data);

// POST - Adding data

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

// GET - Reading data
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
app.get('/api', (req, res) => {
    res.send(dB); // Q*Convert json objects to js obj*
}); 

// Implement route to get a single pet
app.get('/api/:id', (req, res) => {
    // Look up the pet with a given id & get a single pet using id
    const pet = dB.find(c => c.id === parseInt(req.params.id));
    // If pet doesn't exist return 404: Not Found
    if (!pet) return res.status(404).send('The pet was not found');
    // Return the pet to the client
    res.send(pet);
});

// PUT - Updating data

app.put('/api/:id', (req, res) => {
    const pet = dB.find(p => p.id === parseInt(req.params.id));
    if (!pet) res.status(404).send('Sorry, the pet was not found!');
    
    const schema = Joi.object({
        name: Joi.string().min(3),
        img: Joi.string(),
        type: Joi.string().min(3),
        breed: Joi.string().min(3),
        description: Joi.string(),
        age: Joi.string(),
        inoculations: Joi.array().items(Joi.string()),
        diseases: Joi.array().items(Joi.string()),
        parasites: Joi.array().items(Joi.string())
    });
    
    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }
    
    if(req.body.name) {
        pet.name = req.body.name;
    }
    if(req.body.img) {
        pet.img = req.body.img;
    }
    if(req.body.type) {
        pet.type = req.body.type;
    }
    if(req.body.breed) {
        pet.breed = req.body.breed;
    }
    if(req.body.description) {
        pet.description = req.body.description;
    }
    if(req.body.age) {
        pet.age = req.body.age;
    }
    if(req.body.inoculations) {
        pet.inoculations = [...req.body.inoculations];
    }
    if(req.body.diseases) {
        pet.diseases = [...req.body.diseases];
    }
    if(req.body.parasites) {
        pet.parasites = [...req.body.parasites];
    }
    
    res.send(pet);
});

// DELETE - Deleting data

app.delete("/api/:id", (req, res) => {
    // Look up the pet
    // Not existing, return 404
    let pet = dB.find(p => p.id === parseInt(req.params.id));
    if (!pet) res.status(404).send("The pet with the given ID was not found.");
    res.send(pet);

    // Delete
    const index = dB.indexOf(pet);
    dB.splice(index, 1);

    // Return the same pet
    res.send(pet);
});

// Server: listening on a given port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
