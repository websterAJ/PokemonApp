const db = require("../db");
const Pokemon = db.Pokemon;
const { Op } = require("sequelize");

let PokemonDta = {
    "nombre":"",
    "vida":0,
    "imagen":"",
    "ataque":0,
    "defensa":0,
    "velocidad":0,
    "altura":0.0,
    "peso":0.0
};

const validar= (body) =>{
    let resutl = true;
    for (let ele in body){
        let element =body[ele];
        if(typeof(element) == 'string'){
            if (element !== "" && PokemonDta[ele] != undefined ) {
                PokemonDta[ele] = element
            }else{
                resutl= false; 
            }
        }else if(typeof(element) == 'number'){
            if (element > 0 && PokemonDta[ele] != undefined ) {
                PokemonDta[ele] = element
            }else if(ele != "velocidad" && ele != "altura" && ele != "peso"){
                resutl= false;
            }
        }
    }
    return resutl;
}

exports.create = async (req, res) => {
    if (!validar(req.body)) {
        res.status(400).send({
            message: "error while processing data please check"
        });
    }
    let dta = await Pokemon.findOne({where:{ nombre: { [Op.eq]: PokemonDta.nombre } }});
    if(dta == null){
        Pokemon.create(PokemonDta).then(data => { 
            res.send({data:data,message:"data successfully saved"});
        }).catch(err => {
            res.status(400).send({
                message:  err.message || "error while processing data please check"
            });
        });
    }else{
        res.status(400).send({
            message:  "pokemon already registered in database"
        }); 
    }
    
    
};


exports.findAll = async (req, res) => {
    let result = {};
    await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100").then(data=>{
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
};

exports.findById = (req, res) => {
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
};