import React from 'react';
import './Pagination.css';

export default function Pagination ({pokesPerPage, allPokemons, pagination}) {
    const pageNumbers = [];

    for(let i=0; i <= Math.ceil(allPokemons/pokesPerPage); i++) { //recorro el número redondo que resulta de dividir todos los countries por los countries por página que yo quiera. Y con eso que genero en el for, ese número lo pusheo en mi page Numbers. Eso resulta en un arreglo de números
        pageNumbers.push(i+1);
    }

    return (
        <nav>
            <ul className='pagination'>
                { pageNumbers && //si tengo este arreglo entonces mapeámelo, y devolveme cada uno de los numeritos que te devuelva el paginado.
                    pageNumbers.map(number => (
                    <li className='number' key={number} >
                    <a onClick={() => pagination(number)}>{number}</a>
                    </li>
                ))
}
            </ul>
        </nav>
    )
}