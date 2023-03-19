const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
  },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdInDb: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },

  });
};

/* 
"stats": [
{
"base_stat": 45,
"effort": 0,
"stat": {
"name": "hp",
"url": "https://pokeapi.co/api/v2/stat/1/"
}
},
{
"base_stat": 49,
"effort": 0,
"stat": {
"name": "attack",
"url": "https://pokeapi.co/api/v2/stat/2/"
}
},
{
"base_stat": 49,
"effort": 0,
"stat": {
"name": "defense",
"url": "https://pokeapi.co/api/v2/stat/3/"
}
},
{
"base_stat": 65,
"effort": 1,
"stat": {
"name": "special-attack",
"url": "https://pokeapi.co/api/v2/stat/4/"
}
},
{
"base_stat": 65,
"effort": 0,
"stat": {
"name": "special-defense",
"url": "https://pokeapi.co/api/v2/stat/5/"
}
},
{
"base_stat": 45,
"effort": 0,
"stat": {
"name": "speed",
"url": "https://pokeapi.co/api/v2/stat/6/"
}
}
],*/