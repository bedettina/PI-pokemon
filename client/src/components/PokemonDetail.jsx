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
        <div className={styles.pokecard}>
        <h1 className={styles.title}>{thisPoke.name}</h1>
        <p> <img src={thisPoke.image} alt={thisPoke.name} width="100" height="100"/></p>
        <h4>HP:</h4>
        <p> {thisPoke.hp}</p>
        <h4>Attack:</h4>
        <p>{thisPoke.attack}</p>
        <h4>Defense:</h4>
        <p> {thisPoke.defense}</p>
        <h4>Speed:</h4>
        <p> {thisPoke.speed}</p>
        <h4>Height:</h4>
        <p> {thisPoke.height}</p>
        <h4>Weight:</h4>
        <p> {thisPoke.weight}</p>
        <h4 className={styles.types}>Types:</h4>
    <div>{thisPoke.types?.map(t => (
                        <div className={styles.type}>
                           <p>{t.name}</p>
                        </div>
                        ))}
                        </div>
        </div>
    </div>
    )
}