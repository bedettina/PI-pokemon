/*const axios = require("axios");
const { Pokemon, Type } = require("../db");

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

// tengo un arreglo con ["https://pokeapi.co/api/v2/pokemon/1/"", "https://pokeapi.co/api/v2/pokemon/2/", "https://pokeapi.co/api/v2/pokemon/3/"]

const getAllPokemons = async() => {
    const pokemoncitos = []
    const pokemonsHere = await getPokemonUrls()
    await Promise.all(pokemonsHere.map(async (pok) => { 
        const response = await axios.get(pok);
        pokemoncitos.push(
        { 
            name: response.data.name,
            image: response.data.sprites.other.official_artwork,
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

}

const getApiInfo = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      const pokemonData = response.data.results;
      const pokemonList = [];
  
      for (let i = 0; i < pokemonData.length; i++) {
        const url = pokemonData[i].url;
        const pokemonResponse = await axios.get(url);
        const { id, name, sprites, stats, height, weight } = pokemonResponse.data;
  
        // Crea un objeto Pokemon utilizando el modelo
        const pokemon = new Pokemon(
          id,
          name,
          sprites.front_default,
          stats[0].base_stat,
          stats[1].base_stat,
          stats[2].base_stat,
          stats[5].base_stat,
          height,
          weight
        );
        pokemonList.push(pokemon);
      }
  
      return pokemonList;
    } catch (error) {
      console.error(error);
    }
  };
/* async function fetchPokemonUrls() {
    let pokemonUrls = [];
    let url = 'https://pokeapi.co/api/v2/pokemon';
    while (url) {
      const response = await axios.get(url);
      const data = response.data;
      pokemonUrls.push(...data.results.map(pokemon => pokemon.url));
      url = data.next;
    }
    return pokemonUrls;
  } solución original de Rubén 
  module.exports = {
    getPokemonUrls,
    getAllPokemons,
  };
  */