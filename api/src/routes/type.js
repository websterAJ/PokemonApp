const express = require("express");
const router = express.Router();
const TypeController = require("../controllers/Type");

router.get("/",TypeController.findAll);

module.exports= router