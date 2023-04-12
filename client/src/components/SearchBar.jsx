import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePoke } from '../actions/actions.js';
import styles from './SearchBar.module.css'


export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value); //voy guardando lo que tipee en name
        console.log(name); 
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePoke(name)); //despacho la acción con el name que ingresó el usuario 
        setName('');
    }

    return(
        <div className={styles.searchcontainer}>
        <input
          type="text"
          placeholder="Search pokemons..."
          className={styles.searchinput}
          onChange={(e) => handleInputChange(e)}
          value={name}
        />
        <button
          type="submit"
          className={styles.searchbutton}
          onClick={(e) => handleSubmit(e)}
        >
          Search
        </button>
      </div>
    )
}