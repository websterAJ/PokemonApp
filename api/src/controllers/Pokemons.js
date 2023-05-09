const db = require("../db");
const Pokemon = db.Pokemon;
const axios = require("axios");
const { Op } = require("sequelize");
const Type = require("../models/Type");

const URl = "https://pokeapi.co/api/v2/pokemon";

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

let result = {
    "next":"",
    "prev":"",
    "data":[]
};

const validarData= (body) =>{
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
    if (!validarData(req.body)) {
        res.status(400).send({
            message: "error while processing data please check"
        });
    }
    try {
        let dta = await Pokemon.findOne({where:{ nombre: PokemonDta.nombre}});
        if(dta == null){
            Pokemon.create(PokemonDta).then(data => {
                res.send({data:data,message:"data successfully saved"});
            });
        }else{
            res.status(400).send({
                message:  "pokemon already registered in database"
            }); 
        }
    }catch(err){
        console.log(err)
        res.status(400).send({
            message:  err.message || "error while processing data please check"
        });
    }
};




const validarPage=(page)=>{
    let total_Page = 5;
    let condicion = ""
    let ultimoResult = 0;

    if (!page) {
        condicion="offset=0&limit=20"
        ultimoResult=20;
        result["prev"]=null
        result["next"]="localhost:3001/pokemons?page=2"
    }else{
        if (page>=2 && ultimoResult>0) {
            console.log("hola")
            ultimoResult+=20;
            condicion = `offset=${ultimoResult}&limit=20`;
        }else{
            if(page>0){
                ultimoResult = (20*page)-20;
                condicion = `offset=${ultimoResult}&limit=20`;
            }
        }
        let prev = page -1;
        result["prev"]=`localhost:3001/pokemons?page=${prev}`
        page +=1;
        if(page<total_Page){
            result["next"]=`localhost:3001/pokemons?page=${page}`
        }else{
            result["next"]=null
        }
        
    }
    return condicion;
}


exports.findAll = async (req, res) => {
    result["data"]=[];
    let page = parseInt(req.query.page);
    if(!page){
        let count = await Pokemon.count();
        console.log(count);
        await Pokemon.findAll().then((pokemon)=>{
            pokemon.map((tp)=>{
                result["data"].push(tp.dataValues);
            })
        });
    }
    let condicion = validarPage(page);
    await axios.get(`${URl}?${condicion}`).then(async data=>{
        let dtaApi = data.data.results;
        for (let i = 0; i < dtaApi.length; i++) {
            let algo = await axios.get(dtaApi[i].url).then((dt)=>{
                dt = dt.data;
                PokemonDta={}
                PokemonDta["id"]= dt.id
                PokemonDta["nombre"]= dt.name
                PokemonDta["vida"]= dt.stats[0].base_stat
                PokemonDta["imagen"]= dt.sprites.other.dream_world.front_default
                PokemonDta["ataque"]= dt.stats[1].base_stat
                PokemonDta["defensa"]= dt.stats[2].base_stat
                PokemonDta["velocidad"]= dt.stats[5].base_stat
                PokemonDta["altura"]= dt.height
                PokemonDta["peso"]= dt.weight
                PokemonDta["Types"]= dt.types.map((tp)=>tp.type.name)
                return PokemonDta;
            });  
            result["data"].push(algo);
        }
    });
    res.send(result);
};

exports.findById = async (req, res) => {
    let id = req.params.idPokemon;
    if(id != null){
        let {data} =Pokemon.findByPk(id);
        if(!data){
            let {dataApi} = await axios.get(`${URl}${id}`)
            if(dataApi){

            }else{
                res.status(500).send({message:"pokemon does not exist"});
            }
        }
    }else{
        res.status(500).send({message:"you must specify an id"});
    }
};