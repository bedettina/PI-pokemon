/*const { Router } = require("express");
const { 
    getPokemonUrls,
    getAllPokemons,
  } = require("./controllers");
  const axios = require('axios')
  const { Op } = require("sequelize");
  const { Pokemon, Type } = require("../db");

  const router = Router();
/*
router.get('/pokemons', async (req, res, next) => {
    try {
      const pokemonis = await getAllPokemons()
      console.log(pokemonis)
      
      if (pokemonis.length === 0) {
          res.status(404).send('No se encontraron pokemones.');
        } else {
        console.log(pokemonis)
        res.status(200).send(pokemonis);
      }
    } catch (error) {
      next(error);
    }
  });
  
  
  module.exports = router;
  */