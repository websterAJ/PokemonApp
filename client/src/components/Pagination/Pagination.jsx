import React from "react";
import "./Pagination.css";


export default function Pagination({ pokemonsPerPage, totalPokemons, paginate, next,prev }){
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <nav className="Nav">
            <div>
                <button className="btn paginacion" onClick={(e)=>paginate(prev)}>Prev</button>
                {
                pageNumber && pageNumber.map((number) => (
                    <button className="btn paginacion" onClick={(e)=>paginate(number)}>{number}</button>
                ))
                }
                <button className="btn paginacion" onClick={(e)=>paginate(next)}>Next</button>
            </div>
        </nav>
    );
};