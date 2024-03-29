require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT} = process.env;
const axios = require("axios");

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/pokemon`,
   {
      logging: false, // set to console.log to see the raw SQL queries
      native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
   .filter(
      (file) =>
         file.indexOf('.') !== 0 &&
         file !== basename &&
         file.slice(-3) === '.js'
   )
   .forEach((file) => {
      modelDefiners.push(require(path.join(__dirname, '/models', file)));
   });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
   entry[0][0].toUpperCase() + entry[0].slice(1),
   entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Pokemon, Type} = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);

Pokemon.pokemonType = Pokemon.belongsToMany(Type,{through: "PokemonTypes"});
Type.pokemonType = Type.belongsToMany(Pokemon,{through: "PokemonTypes"});

const getDataApi = async ()=>{
   await axios.get("https://pokeapi.co/api/v2/type")
   .then(dataext => {
      var data = new Array();
      for (let i = 0; i < dataext.data.count; i++) {
         let newType = {
            nombre: dataext.data.results[i].name
         };
         Type.create(newType).then(newData => {
            data.push(newData.dataValues);
         }).catch(err => {
            return err.message;
         });
      }
      return data;
   })
   .catch(err => console.log(err.message));
}
sequelize.addHook('afterBulkSync', function (options) {
   getDataApi();
})

module.exports = {
   ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
   conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
