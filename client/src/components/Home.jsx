import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
//import {  } from '../actions/index.js';
import Cards from './Cards.jsx';
import SearchBar from './SearchBar.jsx';
import Pagination from './Pagination';
import styles from './Home.module.css'
import { getPokemons, getTypes, filterByOrigin, filterByType, filterByAZ } from '../actions/actions.js';


export default function Home() {

//DECLARO DISPATCH
const dispatch = useDispatch();

//ESTADOS INICIALES
const allPokemons = useSelector((state) => state.pokemons);
const allTypes = useSelector((state) => state.types);
//const [, setPoke] = useState("all");

//ESTADOS y CONST DEL PAGINADO
const [currentPage, setCurrentPage] = useState(1);
const [pokesPerPage, setPokesPerPage] = useState(12);
const indexOfLastPoke = currentPage * pokesPerPage;
const indexOfFirstPoke = indexOfLastPoke - pokesPerPage;
const currentPokes = allPokemons.slice(indexOfFirstPoke, indexOfLastPoke)
const pagination = (pageNumber) => {
  setCurrentPage(pageNumber);
}

//MÁS ESTADOS LOCALES PARA LOS FILTROS
const [selectedType, setSelectedType] = useState("");
const [selectedAlphabet, setSelectedAlphabet] = useState("");
const [selectedOrigin, setSelectedOrigin] = useState("");



  //UseEffect para efectos secundarios
useEffect(() => {
    dispatch(getPokemons()); //trae los pokes y los types
    dispatch(getTypes()); //cada vez que renderiza o hay un cambio
},[dispatch])

function handleClick(e){
  e.preventDefault();
  dispatch(getPokemons());
}

function handleFilterOrigin(e){
  e.preventDefault();
  setSelectedOrigin(e.target.value);
  dispatch(filterByOrigin(e.target.value));
  //setPoke(e.target.value)
}


function handleFilterTypes(e){
  e.preventDefault();
  setSelectedType(e.target.value);
  dispatch(filterByType(e.target.value));
}

function handleFilterAZ(e){
  e.preventDefault();
  setSelectedAlphabet(e.target.value);
  dispatch(filterByAZ(e.target.value));
}


//RENDERIZADO:

return (
<div className={styles.container}>
    <div className={`${styles.header} ${styles.headertext}`}>
      
      <div className={styles.bold}>
      <p>All pokemons you can think of.</p>
      </div>
      <p>And also the ones you never thought of.</p>
    </div>

    <div className={styles.search}>
        <SearchBar />

        <div className={styles.loadbuttons}>
        <div className={styles.bodies}>
          <Link to= '/createpokemons'>
           <button className={`${styles.generalbuttons} ${styles.bodies}`}>Create your own Pokemon!</button>
        </Link>
        </div>

        <div className={styles.bodies}>
          <button onClick={e=> {handleClick(e)}} className={`${styles.generalbuttons} ${styles.bodies}`}>
            Reload all Pokemons
          </button>
        </div>
      </div>

    </div>

      <div className={styles.pagination}>
  <Pagination
    pokesPerPage={pokesPerPage}
    allPokemons={allPokemons.length}
    pagination = {pagination}
    currentPage = {currentPage}
  />
  </div>

  {/* FILTROS */}
  <div className={`${styles.filters} ${styles.bodies} ${styles.filtersContainer}`}>
      <div className={styles.bodies}>
        <select value={selectedAlphabet} onChange={e => handleFilterAZ(e)}>
          <optgroup label='Filter alphabetically'>
            <option value='a-z'>A-Z order</option>
            <option value='z-a'>Z-A order</option>
          </optgroup>
        </select>
      </div>

    <div className={styles.bodies}>
      <select value={selectedOrigin} onChange={e => handleFilterOrigin(e)}>
        <optgroup label='Filter by origin'>
        <option value='all'>All</option>
        <option value='apiPoke'>Original Pokemons</option>
        <option value='newPoke'>New Pokemons</option>
        </optgroup>
      </select>
    </div>

    <div className={styles.bodies}>
      <select value={selectedType} onChange={e => handleFilterTypes(e)}>
      <optgroup label='Filter by type'>
        {/*Hicimos un estado selected Type donde el value es un strign vacío inicialmente*/}
        <option value='types'>All Types</option>
            {allTypes.map(type => (
            <option key={type.id} value={type.name}>{type.name}</option>
          ))}
          </optgroup>
      </select>
    </div>
  </div>
  

  {/* RENDERIZADO DE CARDS */}
  <div className={styles.cardscontainer}>
            {currentPokes?.map((el) => {
               // borrando esta linea, tambien renderiza, "ver el porque"
                return(

            
              <div key={el.id}>
                <Cards 
                id={el.id}
                image={el.image}
                name={el.name}
                types={el.types.join(", ") || []}
                cardClass={styles.pokemoncard}
                />
                
              </div>
                )
            })}
            </div>
            
{/* El "value" te permite después usarlo como payload al despachar acciones.
Botones/Opciones para filtrar por tipo, y por si su origen es de la API o de la base de datos (creados por nosotros desde el formulario).
Botones/Opciones para ordenar tanto ascendentemente como descendentemente los pokemones por orden alfabético y por ataque.*/}

</div>
)
};

/* GET POKEMONS TRAE ESTO
[
    {
        "id": 848,
        "name": "toxel",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/848.png",
        "hp": 40,
        "attack": 38,
        "defense": 35,
        "speed": 40,
        "height": 4,
        "weight": 110,
        "types": [
            "electric",
            "poison"
        ]
    },
    {
        "id": 831,
        "name": "wooloo",
        "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/831.png",
        "hp": 42,
        "attack": 40,
        "defense": 55,
        "speed": 48,
        "height": 6,
        "weight": 60,
        "types": [
            "normal"
        ]
    }, */

    /* GET TYPES TRAE ESTO:
    [
    {
        "id": "23851fea-3450-4631-ad0a-fd7acec2f97d",
        "name": "normal",
        "createdAt": "2023-03-19T12:38:11.832Z",
        "updatedAt": "2023-03-19T12:38:11.832Z"
    },
    {
        "id": "09d106fb-2453-4a7f-9f1d-f2a0901bd877",
        "name": "fighting",
        "createdAt": "2023-03-19T12:38:11.851Z",
        "updatedAt": "2023-03-19T12:38:11.851Z"
    },

    Esto sirve para filtrar sólo nombres, id's e imagen

    function getNames(array){
const result = array.reduce((acc, current) => {
  if (!acc[current.name]) {
    acc[current.name] = {
      id: current.id,
      image: current.image,
    };
  }
  return acc;
}, {});
  return result
}
    */