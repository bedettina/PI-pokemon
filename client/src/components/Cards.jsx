import React from 'react';
import { Link } from 'react-router-dom';

export default function Cards({id, name, image, types}) {

    const allTypes = [];

   /* if (types && types.length > 0) {
        types.forEach((type) => {
            if (!allTypes.includes(type.name)) {
                allTypes.push(type.name);
            }
        });
    }*/

    return (
        <div>
             <Link to={'/pokemons/' + id}>
                <h3>{name}</h3></Link>
            <img src={image} alt="img not found" width='350px' height='200px' />
            <div>Tipos: {types}</div>
        </div>
    );
}

/*types?.map(t => t.name).join(", ") */