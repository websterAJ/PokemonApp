const express = require("express");
const axios = require("axios");
const router = express.Router();
const PokemonController = require("../controllers/Pokemon");


router.get("/", PokemonController.findAll);
router.get("/:idPokemon",PokemonController.findById);
router.post("/",PokemonController.create);

module.exports= router