import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePoke } from '../actions/actions.js';


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
        <div>
            <input 
            type = 'text'
            placeholder = 'Buscar...'
            onChange = { (e) => handleInputChange(e)}
            />
            <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>

        </div>
    )
}