import React from "react";
import "./Pagination.css"
import Button from "../Button/Button";


export default function Pagination({ pokemonsPerPage, totalPokemons, paginate }){
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <nav className="Nav">
            <div>
                {
                pageNumber && pageNumber.map((number) => (
                    <Button onClick={() => paginate(number)}  key={number} text={number} type="paginacion"/>
                ))
                }
            </div>
        </nav>
    );
};