const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define(
    "pokemonTypes",
    {},
    { timestamps: false }
  );
};