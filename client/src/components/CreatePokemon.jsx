import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postPokemon, getPokemons, getTypes } from '../actions/actions.js';
import styles from './CreatePokemon.module.css';

function validate(input) {
    let errors = {};
    if(!input.name){ //si en mi estado local input no hay nada, en el objeto errors pongo un .name que retorne un string
        errors.name = "A name is required";
    } else if(input.image && !input.image.startsWith("https://")) {
        errors.image = "Image URL must be a valid url";
    } else if(input.hp && (input.hp > 500 || input.hp < 1)){
        errors.hp = "HP must be a number between 1 and 500";
    } else if(input.attack && (input.attack > 500 || input.attack < 1)){
        errors.attack = "Attack must be a number between 1 and 500";
    } else if(input.defense && (input.defense > 500 || input.defense < 1)){
      errors.defense = "Defense must be a number between 1 and 500";
    } else if(input.speed && (input.speed > 100 || input.speed < 1)){
    errors.defense = "Speed must be a number between 1 and 100";
    } else if(input.weight && (input.weight > 1500 || input.weight < 1)){
      errors.weight = "Weight must be a number between 1 and 1500";
      } else if(input.height && (input.height > 400 || input.height < 1)){
        errors.height = "Height must be a number between 1 and 400";
        }
    return errors   
}


export default function CreatePokemon(){
    const dispatch = useDispatch();
    const history = useHistory();
    const allPokemons = useSelector((state) => state.pokemons);
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});

    const [ input, setInput ] = useState({ //le paso a este objeto LO QUE NECESITA EL POST
        name: '',
        image: '', 
        hp: '', 
        speed: '', 
        defense: '',
        attack: '', 
        weight: '', 
        height: '',
        types: []
    })

    //Estados locales para comprobación de llenado



    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value //va agarrando los inputs que definimos arriba y les va sumando el value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value //seteame el estado errores con lo mismo así lo valida
        }))
        console.log(input)
    }

    /*function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                season: e.target.value,
            })
        }
    }*/

    function handleSelect(e){
        const selectedType = e.target.value;
        if (!input.types.includes(selectedType)) {
        setInput({
            ...input,
            types: [...input.types, selectedType],
        });
    }
    }
    
    function handleDelete(e, el) {
        e.preventDefault(); //evita que pasen cosas relacionadas con el botón de delete como lo que nos pasaba de que volvíamos al home.
        setInput({ //seteo el countries 
          ...input, //el countries que tiene todo y no quiero que se vaya
          types: input.types.filter(item => item !== el), //a countries le digo, filtramelo por todo lo que no sea ese elemento. Va a agarrar y me va a devolver el estado nuevo sin ese elemento que yo clickee
        });
      }
      
    function handleSubmit(e){
        e.preventDefault();
        console.log(input);
        dispatch(postPokemon(input));
        alert("Pokemon created!");//tiro una alert después de crearla.
        setInput({ //limpio los campos
            name: '',
            image: '', 
            hp: '', 
            speed: '', 
            defense: '',
            attack: '', 
            weight: '', 
            height: '',
            types: []
        })
        history.push('/home'); //esto lo que hace es redirigirte al home después de crear la activity.
    
    }



    useEffect(() => {
        dispatch(getPokemons());
        dispatch(getTypes());
    }, [dispatch]);

    return(
        <div>
            <Link to= '/home'><button className='button'>Return to Home</button></Link>
            <h1>Create your own pokemons!</h1>

    <form className='form' onSubmit={e => {handleSubmit(e)}}>
                <div>
                    <label>Name:</label>
                    <input type="text" value={input.name} name='name' 
                    onChange={e => handleChange(e)} onBlur={validate}>
                    </input>
                    {errors.name && (<p className={styles.error}>{errors.name}</p>)}
                    {/*Si hay algo en errors.name, entonces renderizamelo*/}
                </div>

                <div>
                    <label>Image:</label>
                    <input type="text" value={input.image} 
                    name='image' 
                    onChange={e => handleChange(e)} 
                    onBlur={validate}
                    disabled={!input.name}>
                    </input>
                    {errors.image && (<p className={styles.error}>{errors.image}</p>)}
                    {/*Si hay algo en errors.name, entonces renderizamelo*/}
                </div>

                <div>
                    <label>HP:</label>
                    <input type='number' value={input.hp} name='hp'
                     onChange={e => handleChange(e)}
                     onBlur={validate}
                    disabled={!input.image || !!errors.image}
                    >  
                    </input>
                    {errors.hp && (<p className={styles.error}>{errors.hp}</p>)}
                    {/*Si hay algo en errors.name, entonces renderizamelo*/}
                </div>

                <div>
            <label>Speed:</label>
               <input value={input.speed} name='speed' onChange={e => handleChange(e)}
               onBlur={validate}
               disabled={!input.hp || !!errors.hp}>
              </input>
              {errors.speed && (<p className={styles.error}>{errors.speed}</p>)}
                </div>

                <div>
            <label>Defense:</label>
               <input value={input.defense} name='defense' onChange={e => handleChange(e)}
               onBlur={validate}
               disabled={!input.speed || !!errors.speed}>
              </input>
              {errors.defense && (<p className={styles.error}>{errors.defense}</p>)}
              {/*Si hay algo en errors.name, entonces renderizamelo*/}
                </div>
               
                <div>
                    <label>Attack:</label>
                    <input type='number' value={input.attack} name='attack'
                     onChange={e => handleChange(e)}
                     onBlur={validate}
                    disabled={!input.defense || !!errors.defense}>  
                    </input>
                    {errors.attack && (<p className={styles.error}>{errors.attack}</p>)}
                    {/*Si hay algo en errors.name, entonces renderizamelo*/}
                </div>

                <div>
                    <label>Weight:</label>
                    <input type='number' value={input.weight} name='weight'
                     onChange={e => handleChange(e)}
                     onBlur={validate}
                    disabled={!input.attack || !!errors.attack}>  
                    </input>
                    {errors.weight && (<p className={styles.error}>{errors.weight}</p>)}
                    {/*Si hay algo en errors.name, entonces renderizamelo*/}
                </div>

                <div>
                    <label>Height:</label>
                    <input type='number' value={input.height} name='height'
                     onChange={e => handleChange(e)}
                     onBlur={validate}
                    disabled={!input.weight || !!errors.weight}>  
                    </input>
                    {errors.height && (<p className={styles.error}>{errors.height}</p>)}
                    {/*Si hay algo en errors.name, entonces renderizamelo*/}
                </div>

                <div>
                <label>Types:</label>

                  <select name='types' value={input.types} onChange={e => handleSelect(e)}>
                    {types.map(el => (
                        <option key={el.id} value={el.name}>{el.name}</option>
                        ))
                        }
                  </select>

                    <div> {input.types?.map(el => (
                    <span key={el.id}>
                    <p className='typesSelected'> {el}</p>
                    <button className='button' onClick={(e) => handleDelete(e, el)}>x</button>
                    </span> // En la fn de handleDelete no hace falta pasarle el evento como primer argumento, pero es buena práctica.
                    ))}
                    </div>

                </div>


                <button type='Submit'>Create Pokemon</button>
                
            </form>
        </div>
    )

}

/*
hp: {
    min: 1,
    max: 500,
  },
  attack: {
    min: 1,
    max: 500,
  },
  defense: {
    min: 1,
    max: 400,
  },
  speed: {
    min: 1,
    max: 100,
  },
  height: {
    min: 1,
    max: 300,
  },
  weight: {
    min: 1,
    max: 1500,
  },
*/