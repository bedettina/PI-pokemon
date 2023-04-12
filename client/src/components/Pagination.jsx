import React from 'react';
import { useState, useEffect } from 'react';
import styles from './Pagination.module.css';

export default function Pagination ({pokesPerPage, allPokemons, pagination, currentPage}) {
    const pageNumbers = [];

    //Esta constante calcula el número total de páginas
    const totalPages = Math.ceil(allPokemons/ pokesPerPage)

    //Esta calcula el rango de página en base a la current page
    const [pageRange, setPageRange] = useState({
        start: 1,
        end: Math.min(20, Math.ceil(allPokemons / pokesPerPage))
      });

      useEffect(() => {
        setPageRange({
          start: 1,
          end: Math.min(20, totalPages)
        });
      }, [totalPages]);
    
    /* VERSIÓN ORIGINAL:
    for(let i=0; i <= Math.ceil(allPokemons/  pokesPerPage); i++) { //recorro el número redondo que resulta de dividir todos los countries por los countries por página que yo quiera. Y con eso que genero en el for, ese número lo pusheo en mi page Numbers. Eso resulta en un arreglo de números
        pageNumbers.push(i+1);
    }*/

    const handleNextClick = () => {
        const newStart = Math.min(pageRange.start + 20, totalPages - 19);
        const newEnd = Math.min(pageRange.end + 20, totalPages);
        setPageRange({
          start: newStart,
          end: newEnd
        });
        pagination(newStart);
      };
    
      const handlePrevClick = () => {
        const newStart = Math.max(pageRange.start - 20, 1);
        const newEnd = Math.max(pageRange.end - 20, 20);
        setPageRange({
          start: newStart,
          end: newEnd
        });
        pagination(newStart);
      };

    for(let i = pageRange.start; i <= pageRange.end; i++){
        pageNumbers.push(i);
    }

    return (
    <nav>
        <ul className={styles.pagination}>
            {/* PREVIOUS BUTTON: */}
            {currentPage > 1 && (
          <li className={styles.list}>
            <button onClick={handlePrevClick}
            className={styles.nextprevbutton}
             disabled={currentPage === 1}>
              Previous
            </button>
          </li>
        )}

            { pageNumbers && //si tengo este arreglo entonces mapeámelo, y devolveme cada uno de los numeritos que te devuelva el paginado.
            pageNumbers.map(number => (
              <li className={styles.paginationcontainer} key={number} >
                <button 
                onClick={() => pagination(number)} 
                className={`${styles.number} ${currentPage === number ? styles.active : ''}`}>
                {number}
                </button>
              </li>
                ))
}
          <li className={pageRange.end >= totalPages ? 'disabled' : ''}>
            {/* PREVIOUS BUTTON: */}
            <button  
            onClick={handleNextClick}
            className={styles.nextprevbutton}
            disabled={pageRange.end >= totalPages}>
              Next
            </button>
          </li>
        </ul>
        </nav>
    )
}