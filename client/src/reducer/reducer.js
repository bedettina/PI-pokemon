import { GET_POKEMONS, GET_TYPES, FILTER_BY_ORIGIN, FILTER_BY_TYPE, FILTER_BY_AZ, GET_POKE_DETAIL } from '../actions/actions.js';

const initialState = {
    pokemons: [],
    types: [],
    filteredTypes: [],
    filteredPokes: [],
    typesToFilter: [],
    pokeDetail: [],
}

function rootReducer(state= initialState, action) {
    switch(action.type) {
        case GET_POKEMONS:
            
            return{
                ...state,
                pokemons: action.payload, 
                filteredPokes: action.payload,
                typesToFilter: action.payload
            }

        case GET_TYPES:
            return{
                ...state,
                types: action.payload,
                filteredTypes: action.payload
            }
        case GET_POKE_DETAIL:
          return {
            ...state,
            pokeDetail: action.payload
          }

            case FILTER_BY_ORIGIN:
                if (action.payload === 'all') {
                  return {
                    ...state,
                    pokemons: state.filteredPokes,
                  };
                } else if (action.payload === 'apiPoke') {
                  const filteredPokemons = state.filteredPokes.filter(pokemon => pokemon.idAPI);
                  console.log(filteredPokemons);
                  return {
                    ...state,
                    pokemons: filteredPokemons,
                  };
                } else if (action.payload === 'newPoke') {
                  const filteredPokeys = state.filteredPokes.filter(pokemon => !pokemon.idAPI);
                  console.log(filteredPokeys);
                  return {
                    ...state,
                    pokemons: filteredPokeys,
                  };
                }
            case FILTER_BY_TYPE:
                const typesToFilter = state.typesToFilter; //tenemos un estado separado con todos los pokemones para no filtrar sobre lo ya filtrado
                const typesFiltered = action.payload === 'types' ? typesToFilter : typesToFilter.filter((c) =>{return c.types.some((a) => (a === action.payload))}); //si el value es types (o sea no se eligió ninguno) devuelve todos los pokemones, sino, se fija de devolver los que incluyan el nombre del tipo (que viene en la action type)
                
                return {
                        ...state,
                        pokemons: typesFiltered,
                    };

            case FILTER_BY_AZ:
            if (action.payload === 'a-z') {
                      // si el payload es az, entonces que me devuelva el estado inicial
                return {
                     ...state,
                    pokemons: state.pokemons.sort(function (a, b) {
                          // ordena de la A a la Z
                        if (a.name > b.name) {
                            // si el nombre de a es mayor que el de b
                            return 1; // b
                          }
                        if (b.name > a.name) {
                            // si el nombre de b es mayor que el de a
                            return -1; // a
                          }
                        return 0; // si son iguales lo deja como esta
                        }),
                      };
                    }
                    if (action.payload === 'z-a') {
                      return {
                        ...state,
                        pokemons: state.pokemons.sort(function (a, b) {
                          if (a.name > b.name) {
                            return -1;
                          }
                          if (b.name > a.name) {
                            return 1;
                          }
                          return 0;
                        }),
                      };
                    }
                    break;

            default:
            return state;
    }
}

export default rootReducer;