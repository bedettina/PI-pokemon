const { Router } = require('express');
const {Pokemon, Type, Pokemons_Types } = require ('../db');
const axios = require('axios')
const { Op } = require("sequelize");

//const type = require("./type");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//const pokemonMiddleware = require('./pokemons');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

//router.use('/pokemons', pokemonMiddleware);

// Hago este paso previo getPokemonUrls para poder traer todas las URLS de los pokemones,
//porque son ocho millones de páginas (?) --- ↓

const getPokemonUrls = async() => {
    let pokemonUrls = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon';
    while (apiUrl) { //Lo sigue trayendo mientras la propiedad next no sea null.
      const response = await axios.get(apiUrl);
      const data = response.data;
      pokemonUrls.push(...data.results.map(pokemon => pokemon.url)); //pushea individualmente las URLs en lugar de todo el array
      apiUrl = data.next; //seteas la variable para que data tome el .next que sigue
    }
    console.log(pokemonUrls)
    return pokemonUrls;
}

// tengo un arreglo con ["https://pokeapi.co/api/v2/pokemon/1/"", "https://pokeapi.co/api/
//v2/pokemon/2/", "https://pokeapi.co/api/v2/pokemon/3/"] y a eso necesito sacarle las propiedades que quiero

const getAllPokemons = async() => {
const pokemoncitos = []
const pokemonsHere = await getPokemonUrls()
await Promise.all(pokemonsHere.map(async (pok) => { 
  const response = await axios.get(pok);
  const newPokemon = {
    name: response.data.name,
    hp: response.data.stats[0].base_stat,
    attack: response.data.stats[1].base_stat,
    defense: response.data.stats[2].base_stat,
    speed: response.data.stats[5].base_stat,
    height: response.data.height,
    weight: response.data.weight,
    createdInDb: false // Seteado en falso porque no estaba cread oen la DB
  };
  const [pokemonInstance, created] = await Pokemon.findOrCreate({ //el findOrCreate busca con el "where" a ver si hay algún pokemon con el mismo nombre que la instancia de newPokemon. Si está, lo retorna, y sino, se crea uno nuevo usando la opción "default" y luego es retornado. La variablae created indica si se creó una nuva instancia o no.
    where: { name: newPokemon.name },
    defaults: newPokemon
  }); // Usamos findOrCreate para no estar creándolos cada vez que los traemos.
    pokemoncitos.push(pokemonInstance);
}));
console.log(pokemoncitos)
return pokemoncitos;

}

/* Código original sin instanciar en la DB

const getAllPokemons = async() => {
const pokemoncitos = []
const pokemonsHere = await getPokemonUrls()
await Promise.all(pokemonsHere.map(async (pok) => { 
    const response = await axios.get(pok);
    pokemoncitos.push(
    {   
        id: response.data.id,
        name: response.data.name,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        speed: response.data.stats[5].base_stat,
        height: response.data.height,
        weight: response.data.weight,
    })
}));
console.log(pokemoncitos)
return pokemoncitos;

}*/

const getAllTypes = async() => {
    let types = []
    const typesHere = await getPokemonUrls()
    await Promise.all(typesHere.map(async (type) => { 
        const response = await axios.get(type);
        const data = response.data;
        types.push(data.types.map(type => type.name));
    }));
    return types;
    }

const getDBinfo = async() => {
    return await Pokemon.findAll({ //uso el selector findAll que trae todo pero le digo que incluya el modelo de Types
        include: {
            model: Type, //además de lo que tiene el modelo country, traeme el modelo Activity
            attributes: ['id', 'name'], //pero traeme estos atributos específicos en esta llamada
            through: { //es una comprobación que se hace de lo de arriba.
                attributes: [],
            },
        }
    })
}

const getAllDbAndApi = async () => {
    const [apiInfo, dbInfo] = await Promise.all([getAllPokemons(), getDBinfo()]); // hacemos destructuring para crear las dos variables a la ves y hay dos promesas que se tienen que resolver.
    const allInfo = [...apiInfo, ...dbInfo]; //concatenamos la info
    return allInfo; //la devolvemos
  };
  

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

  router.get('/types', async (req, res, next) => {
    try {
      const allTypes = await getAllTypes();
      
      if (allTypes.length === 0) {
          res.status(404).send('No se encontraron tipos');
        } else {
        res.status(200).send(allTypes);
      }
    } catch (error) {
      next(error);
    }
  });
  



module.exports = router;
