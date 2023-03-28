
import axios from 'axios';

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_BY_ORIGIN = 'FILTER_BY_ORIGIN';
export const FILTER_BY_TYPE = 'FILTER_BY_TYPE';
export const FILTER_BY_AZ = 'FILTER_BY_AZ';
export const GET_POKE_DETAIL = 'GET_POKE_DETAIL';
export const GET_NAME_POKE = 'GET_NAME_POKE';
export const POST_POKEMON = 'POST_POKEMON'

export function getPokemons(){
    return async function(dispatch){
        try {
        const data = await axios.get("http://localhost:3001/")
        
        const filteredData = data.data.map(({ id, idAPI, name, image, hp, speed, attack, weight, height }) => ({ id, idAPI, name, image, hp, speed, attack, weight, height }));


        const filteredArray = data.data
         .filter(pokemon => pokemon.types)
        .map(pokemon => ({
        name: pokemon.name,
        types: pokemon.types.map(type => type.name)
  }));

    const combinedArray = filteredArray.reduce((acc, curr) => {
  const pokemon = filteredData.find(p => p.name === curr.name);
  if (pokemon) {
    acc.push({ ...pokemon, types: curr.types });
  }
  return acc;
}, []);

        return dispatch({
            type: 'GET_POKEMONS',
            payload: combinedArray
        })
    }
catch(error) {
    console.error(error);
}
}
}

export function getTypes(){
    return async function(dispatch){
        let jsona = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: 'GET_TYPES',
            payload: jsona.data
        })
    }
}

export function filterByOrigin(payload){
    return async function(dispatch){
        try {

        return dispatch({
            type: 'FILTER_BY_ORIGIN',
            payload
        })
    }
catch(error) {
    console.error(error);
}
}
}

export function filterByType(type){
    return async function(dispatch){
        try {

        return dispatch({
            type: 'FILTER_BY_TYPE',
            payload: type
        })
    }
catch(error) {
    console.error(error);
}
}
}

export function filterByAZ(order){
    return async function(dispatch){
        try {

        return dispatch({
            type: 'FILTER_BY_AZ',
            payload: order
        })
    }
catch(error) {
    console.error(error);
}
}
}

export function getPokeDetail(id){
return async function(dispatch){
    try {
        let pokeDetail = await axios.get('http://localhost:3001/pokemons/' + id) //también puede ser ('/characters/' + id)
        return dispatch({
            type: 'GET_POKE_DETAIL',
            payload: pokeDetail.data
        });
    } catch(e){
        console.log(e)
    }
}
}

export function getNamePoke(name){
    return async function(dispatch){
        try {
            var json = await axios.get('http://localhost:3001/?name=' + name)

            const filteredDat = json.data.map(({ id, idAPI, name, image, hp, speed, attack, weight, height }) => ({ id, idAPI, name, image, hp, speed, attack, weight, height }));


            const filteredArra = json.data
            .filter(pokemon => pokemon.types)
            .map(pokemon => ({
            name: pokemon.name,
            types: pokemon.types.map(type => type.name)
            }));

            const combinedArra = filteredArra.reduce((acc, curr) => {
            const pokemon = filteredDat.find(p => p.name === curr.name);
            if (pokemon) {
            acc.push({ ...pokemon, types: curr.types });
            }
            return acc;
            }, []);

            return dispatch({
                type: "GET_NAME_POKE",
                payload: combinedArra
            })
        }
        catch (error) {
            console.log(error)
        }
    }
}

export function postPokemon(payload){
    return async function(dispatch){
        try { 
        await axios.post('http://localhost:3001/pokemons', payload); //en esta ruta es donde quiero hacer el post del payload, va como segundo argumento
        return dispatch({
            type: 'POST_POKEMON',
              });
    } catch(error){
        alert('Post failed!');
    }
}
}

/* filteredArray V2:
const filteredArray = data.filter(pokemon => pokemon.types)
.map(({ name, types }) => ({ name, types: types.map(type => type.name) }));
*/