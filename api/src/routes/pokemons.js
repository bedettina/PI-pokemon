const { Router } = require("express");
const { 
    getPokemonUrls,
    getAllPokemons,
  } = require("./controllers");
  const axios = require('axios')
  const { Op } = require("sequelize");
  const { Pokemon, Type } = require("../db");

  const router = Router();

router.get('/pokemons', async (req, res) => {
    res.send.json('Hello');
  });

  

  module.exports = router;
