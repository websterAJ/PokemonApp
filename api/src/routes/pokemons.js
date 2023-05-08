const express = require("express");
const axios = require("axios");
const router = express.Router();
const db = require("../db");
const Pokemon = db.Pokemon;

router.get("/", async (req, res) => {
    let result = {};

    await axios.get("https://pokeapi.co/api/v2/pokemon/").then(data=>{
        let dtaApi = data.data.results;
        for (let i = 0; i < dtaApi.length; i++) {
            let element = dtaApi[i];
            element.url = "localhost:3001/pokemons/"+dtaApi[i].url.substring(dtaApi[i].url.length-2)
            console.log(element);
        }
    });
    
    Pokemon.findAll().then(data => {
        if(data != ""){
            console.log("tengo data");
            result= data;
        }
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving Pokemon."
        });
    });

    res.send(result);
});

router.get("/:idPokemon",(req, res) => {
    let id = req.params.idPokemon;
    console.log(typeof id);
    if(id != null){
        Pokemon.findByPk(id).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Pokemon."
            });
        });
    }else{
        res.status(500).send({message:"you must specify an id"});
    }
});

router.post("/",(req, res) => {
    if (!req.body.pass || !req.body.email) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const Pokemon = {
        pass: req.body.pass,
        email: req.body.email,
    };
    Pokemon.create(Pokemon).then(data => { res.send(data);})
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Pokemon."
        });
    });
});

module.exports= router