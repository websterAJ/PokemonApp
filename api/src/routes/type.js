const express = require("express");
const router = express.Router();
const db = require("../db");
const Type = db.Type;

router.get("/",(req, res) => {
    Type.findAll().then( async  (data)=> {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving type."
        });
    });
});

module.exports= router