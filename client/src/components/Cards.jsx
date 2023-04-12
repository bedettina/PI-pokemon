import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Cards.module.css';

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
        <div className={`${styles.cardcontainer} ${styles.card}`}>
             <Link to={'/pokemons/' + id} className={styles.card_link}>
                <h3 className={styles.card_name}>{name}</h3>
            <img className={styles.card_image} src={image} alt="img not found" width='200px' height='200px' />
            <div className={styles.card_types}>Types: {types}</div>
            </Link>
        </div>
    );
}

/*types?.map(t => t.name).join(", ") */