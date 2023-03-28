import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokeDetail } from '../actions/actions.js';
import styles from './PokemonDetail.module.css';


export default function PokemonDetail({id}){

    const thisPoke = useSelector((state) => state.pokeDetail);

    const dispatch = useDispatch();

    useEffect( () => { //trae los countries de nuevo cada vez que renderiza o que hay un cambio.
        dispatch(getPokeDetail(id));
    },[dispatch, id]);


    return (
    <div className={styles.container}>
        <h1>{thisPoke.name}</h1>
        <h4>Speed:</h4>
        <p> {thisPoke.speed}</p>
        <h4>Image:</h4>
        <p> <img src={thisPoke.image} alt={thisPoke.name} width="200" height="200"/></p>
        <h4>Attack:</h4>
        <p>{thisPoke.attack}</p>
        <h4>Weight:</h4>
        <p> {thisPoke.weight}</p>
        <h4>HP:</h4>
        <p> {thisPoke.hp}</p>
        <h4>Defense:</h4>
        <p> {thisPoke.defense}</p>
        <h4>Type:</h4>
{/*        <h5> {thisCountry.activities.name}</h5>
        <h5> {thisCountry.activities.difficulty}</h5>
        <h5> {thisCountry.activities.duration}</h5>
    <h5> {thisCountry.activities.season}</h5>*/}
    <div>{thisPoke.types?.map(t => (
                        <div className={styles.type}>
                           <p>{t.name}</p>
                        </div>
                        ))}
                        </div>
    </div>
    )
}