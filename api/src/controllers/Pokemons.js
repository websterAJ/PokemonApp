const {Pokemon,Type}= require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const URl = "https://pokeapi.co/api/v2/pokemon";

let PokemonDta = {
    "origin":"",
    "nombre":"",
    "vida":0,
    "imagen":"",
    "ataque":0,
    "defensa":0,
    "velocidad":0,
    "altura":0.0,
    "peso":0.0,
    "Type":[]
};

let result = {
    "next":"",
    "prev":"",
    "count":"",
    "data":[]
};

const validarData= (body) =>{
    let resutl = true;
    for (let ele in body){
        let element =body[ele];
        switch (typeof(element)) {
            case 'string':
                if (element !== "" && PokemonDta[ele] != undefined ) {
                    PokemonDta[ele] = element
                }else{
                    resutl= false; 
                }
                break;
            case 'number':
                if (element > 0 && PokemonDta[ele] != undefined ) {
                    PokemonDta[ele] = element
                }else if(ele != "velocidad" && ele != "altura" && ele != "peso"){
                    resutl= false;
                }
                break;
            default:
                PokemonDta[ele] = element
                break;
        }
    }
    return resutl;
}
const procesarData =(data,origin)=>{
    let dt;
    PokemonDta={}
    if(data.hasOwnProperty("data")){
        dt = data.data
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
        PokemonDta["origin"]=origin;
    }else{
        dt = data.dataValues
        PokemonDta=dt;
        PokemonDta["origin"]=origin;
    }
    return PokemonDta;
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
            let NewPokemon = await Pokemon.create(PokemonDta);
            PokemonDta.Type.map(async(pokeType)=>{
                console.log(pokeType)
                let dataType =await Type.findOne({
                    where:{
                        nombre: {
                            [Op.eq]: pokeType
                        }
                    }
                });
                if(dataType != null){
                    NewPokemon.addTypes(dataType);
                }else{
                    Pokemon.destroy({
                        where: {
                          id: NewPokemon.id
                        }
                    });
                    res.status(400).send({
                        message:  " type of pokemon not registered"
                    }); 
                }
            });
            
            res.send({data:NewPokemon,message:"data successfully registered"});
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
        condicion="offset=0&limit=100"
        ultimoResult=20;
        result["prev"]=null
        result["next"]="localhost:3001/pokemons?page=2"
    }else{
        if (page>=2 && ultimoResult>0) {
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
    result["count"]= 100;
    let page = parseInt(req.query.page);
    if(!page){
        let count = await Pokemon.count();
        result["count"] +=count;
        if(count>0){
            await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes:['nombre']
                }
            }).then((pokemon)=>{
                pokemon.map((tp)=>{
                    let data=procesarData(tp,"db");
                    result["data"].push(data);
                })
            });
        }
    }
    let condicion = validarPage(page);
    await axios.get(`${URl}?${condicion}`).then(async data=>{
        let dtaApi = data.data.results;
        for (let i = 0; i < dtaApi.length; i++) {
            let algo = await axios.get(dtaApi[i].url).then((data)=>{
                return procesarData(data,"api");
            });  
            result["data"].push(algo);
        }
    });
    res.send(result);
};

exports.findById = async (req, res) => {
    try {
        let id = req.params.idPokemon;
        console.log(req.params);
        console.log(id);
        let api = false;
        if(id != null){
            let data ={}
            if(id.length <=3){
                api=true;
                data = await axios.get(`${URl}/${id}`).then(async(dta)=>{
                    PokemonDta={}
                    PokemonDta = procesarData(dta);
                    console.log(PokemonDta);
                    return PokemonDta;
                });
            }else{
                data = await Pokemon.findOne({
                    where:{
                        id: {
                            [Op.eq]: id
                        }
                    },
                    attributes: ['id','nombre','vida','imagen','ataque','defensa','velocidad', 'altura','peso'],
                    include:{
                        model: Type,
                        attributes:['nombre']
                    }
                });
            }
            
            if(data){
                PokemonDta={};
                if(api){
                    PokemonDta= data;
                }else{
                    PokemonDta = data.dataValues
                }
                res.send(PokemonDta);
            }else{
                res.status(500).send({message:"pokemon does not exist"});
            }
        }else{
            res.status(500).send({message:"you must specify an id"});
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).send({message:"Error processing your request"});
    }
    
};


exports.findByName = async (req, res) => {
    let name = req.query.name;
    if(name){
        data = await Pokemon.findOne({
            where:{
                nombre: {
                    [Op.eq]: name
                }
            },
            attributes: ['id','nombre','vida','imagen','ataque','defensa','velocidad', 'altura','peso'],
            include: {
                model: Type,
                attributes:['nombre']
            }
        });
        if(data == null){
            data = await axios.get(`${URl}`).then(async (data)=>{
                let results = data.data.results;
                PokemonDta={}
                for (let i = 0; i < results.length; i++) {
                    if(results[i].name === name){
                        let pokemon =await axios.get(results[i].url).then((detalle_pokemon)=>{
                            PokemonDta = procesarData(detalle_pokemon);
                            return PokemonDta;
                        })
                        return pokemon;
                    }
                }
            })
        }
        res.send(data);
    }else{
        res.status(500).send({message:"pokemon does not exist"});
    }
}

exports.delete=async (req, res)=>{
    let id = req.body.id;
    if(id){
        await Pokemon.destroy({
            where: {
              id: {
                [Op.eq]: id
              }
            }
        });
        res.status(200).send({message:"pokemon removed successfully"});
    }else{
        res.status(500).send({message:"You must send the id of the pokemon to be sent."});
    }
}

exports.update = async (req, res)=>{
    let id = req.params.id;
    try {
        if (id) {
            console.log(id);
            if (!validarData(req.body)) {
                res.status(400).send({
                    message: "error while processing data please check"
                });
            }
            await Pokemon.update(PokemonDta,{
                where: {
                    id:{
                        [Op.eq]: id
                    }
                }
            });
            res.status(200).send({data:PokemonDta,message:"pokemon successfully updated"});
        }else{
            res.status(500).send({message:"You must send the id of the pokemon to be sent."});
        }
    } catch (error) {
        res.status(500).send({message:"Error processing your request"});
    }
    
}