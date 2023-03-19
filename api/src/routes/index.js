const { Router } = require('express');
const {Pokemon, Type, Pokemons_Types } = require ('../db.js');
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
        const types = response.data.types.map((type) => type.type.name);
        pokemoncitos.push({  
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.other.dream_world.front_default ? response.data.sprites.other.dream_world.front_default : response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          height: response.data.height,
          weight: response.data.weight,
          types: types,
        });
    })
    );
    console.log(pokemoncitos)
    return pokemoncitos;
  }


/* Código original sin instanciar en la DB

const getAllPokemons = async() => {
const pokemoncitos = []
const pokemonsHere = await getPokemonUrls()
await Promise.all(pokemonsHere.map(async (pok) => { 
  const response = await axios.get(pok); //tenés que esperar que traiga ESA URL ESPECÍFICA
  const newPokemon = {
    name: response.data.name,
    image: response.data.sprites.other.dream_world.front_default ? response.data.sprites.other.dream_world.front_default : response.data.sprites.front_default,
    hp: response.data.stats[0].base_stat,
    attack: response.data.stats[1].base_stat,
    defense: response.data.stats[2].base_stat,
    speed: response.data.stats[5].base_stat,
    height: response.data.height,
    weight: response.data.weight,
  };
  const [pokemonInstance, created] = await Pokemon.findOrCreate({ //el findOrCreate busca con el "where" a ver si hay algún pokemon con el mismo nombre que la instancia de newPokemon. Si está, lo retorna, y sino, se crea uno nuevo usando la opción "default" con los valores que indica el default, y luego es retornado. La variablae created indica si se creó una nuva instancia o no.
    where: { name: newPokemon.name },
    defaults: newPokemon
  }); // Usamos findOrCreate para no estar creándolos cada vez que los traemos.
    pokemoncitos.push(pokemonInstance);
}));
console.log(pokemoncitos)
return pokemoncitos;
}*/


const getAllTypes = async() => {
  let types = []
    const typesHere = await axios.get('https://pokeapi.co/api/v2/type');
    // devuelve un arreglo con el objeto adentro. hay que acceder a results - y luego a cada nombre.
     //devuelve un arreglo con nombres así pelados. No sé si los necesitamos así pero bueno (?)
    await Promise.all(typesHere.data.results.map(async (typ) => { 
      const newType = {
        name: typ.name, //mapeo y saco el nombre que es lo único que me sirve
      };
      const [typeNew, created] = await Type.findOrCreate({
        where: { name: newType.name },
        defaults: newType //uso el findOrCreate para guardar en la DB
      });
      types.push(typeNew); //Pusheo la nueva instancia.
      console.log(types);
    }))
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
    const [apiInfo, dbInfo] = await Promise.all([getAllPokemons(), getDBinfo()]); // hacemos destructuring para crear las dos variables a la vez y hay dos promesas que se tienen que resolver.
    const allInfo = [...apiInfo, ...dbInfo]; //concatenamos la info
    return allInfo; //la devolvemos
  };
  
//contemplamos name también en la ruta principal 
// http://localhost:3001/pokemons?name=silcoon

router.get('/pokemons', async (req, res, next) => {
  if(req.query.name) { 
    const { name } = req.query;
    const pokemones = await getAllDbAndApi();
    const result = pokemones.find((el) =>
      el.name.toLowerCase().includes(name.toLowerCase())
    );
      
      if (result.length === 0) {
          res.status(404).send('No se encontraron pokemones.');
        } else {
        res.status(200).send(result);
      }
    } else {
      try {
        let total = await getAllDbAndApi();
        res.status(200).json(total);
      } catch (error) {
        res.status(400).json(error);
      }
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

  /*router.get('/types', async(req,res, next) => {
    
    const typesHere = await getAllTypes();
    
    const typesAll = []

    await Promise.all(typesHere.map(async (typ) => { 
      const newType = {
       id: data.typ.id,
       name: data.typ.name
      };
      const [typeInstance, created] = await Type.findOrCreate({
        where: { name: newType.name },
        defaults: newType
      }); // Usamos findOrCreate para no estar creándolos cada vez que los traemos.
        typesAll.push(typesAll);
  });*/
  
  
// http://localhost:3001/pokemons/622

  router.get('/pokemons/:idPokemon', async (req, res) => {
    let { idPokemon } = req.params;
    try {
      let pokemonId = await getAllPokemons();
      let finds = pokemonId.filter((po) => po.id === parseInt(idPokemon));
      
      console.log(finds)
      if(finds.length === 0) {
          return res.status(404).json({ message: 'Ups! Hubo un error, no tenemos mucha idea de por qué. Perdón.' });
      }
  
      res.status(200).json(finds);
    
    } catch (error) { //manejo de errores
        res.status(404).json('Ups! Hubo un error, no tenemos mucha idea de por qué. Perdón.');
      }
}); 

router.post('/pokemons', async (req, res) => {
  const { name, image, hp, attack, defense, speed, height, weight, types } = req.body;

try {

  const allPokes = await getAllDbAndApi();
  const filteredPoke = allPokes.find((e) => e.name === name)

  if (filteredPoke.length !== 0) {
    return res.status(409).send('Este pokemon ya existe');
  }

  else {
    const newPoke= await Pokemon.create({
      name, 
      image, 
      hp, 
      attack, 
      defense, 
      speed, 
      height, 
      weight,
    });
    const typeList = await Type.findAll({
      where: {
        name: types
      }
    });
    await newPoke.addTypes(typeList);
    res.status(201).send('Pokemon creado correctamente');
    return newPoke;
  }
} catch (error) {
  console.log(error);
  res.status(500).send('Error en el servidor');
}
}); 

module.exports = router;

/* Ruta GET original sin contemplar name

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
  */

  /* getAllPokemons sin types

  const getAllPokemons = async() => {
    const pokemoncitos = []
    const pokemonsHere = await getPokemonUrls()
    await Promise.all(pokemonsHere.map(async (pok) => { 
        const response = await axios.get(pok);
        const types = response.data.types.map((type) => type.type.name);
        pokemoncitos.push(
        {   
          id: response.data.id,
          name: response.data.name,
          image: response.data.sprites.other.dream_world.front_default ? response.data.sprites.other.dream_world.front_default : response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          speed: response.data.stats[5].base_stat,
          height: response.data.height,
          weight: response.data.weight,
          types: types,
        })
    }));
    console.log(pokemoncitos)
    return pokemoncitos;
}*/

/* Intento de linkear types de los pokemones con la tabla relacional

  const linkPokemonWithTypes = async (pokemonsArray) => {
    const typesArray = await Type.findAll(); // traerte todos los types
    const typesMap = typesArray.reduce((acc, type) => {
      acc[type.name] = type.id;
      return acc;
    }, {});
  
    // Guardarlos en la tabla relacional
    await Promise.all(
      pokemonsArray.map(async (pokemon) => {
        const typesIds = pokemon.types.map((type) => typesMap[type]);
        await Pokemon_Types.bulkCreate(
          typesIds.map((typeId) => ({
            pokemon_id: pokemon.id,
            type_id: typeId,
          }))
        );
      })
    );
  };
  */