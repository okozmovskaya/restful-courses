// dependencies
const Joi = require('joi');
const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');


// I use this package to read data from the body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// reading dB
const data = fs.readFileSync('./pets.json');
const dB = JSON.parse(data);

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

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`))
