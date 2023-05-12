const express = require("express");
const router = express.Router();
const PokemonController = require("../controllers/Pokemons");


router.get("/", PokemonController.findAll);
router.get("/?page(1-9)", PokemonController.findAll);
router.get("/name?", PokemonController.findByName);
router.get("/:idPokemon",PokemonController.findById);
router.post("/",PokemonController.create);
router.delete("/",PokemonController.delete);
router.put("/:id",PokemonController.update);

module.exports= router