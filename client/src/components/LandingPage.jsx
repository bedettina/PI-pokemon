import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
    
    return (
    <div>
        <h1> Pokemones para la pipol </h1>
        <Link to='/home'>
        <button> Go! </button>
        </Link>
    
    </div>
    )

}