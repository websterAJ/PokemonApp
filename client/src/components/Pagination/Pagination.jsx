import React from "react";
import "./Pagination.css"
import Button from "../Button/Button";


export default function Pagination({ pokemonsPerPage, totalPokemons, paginate, next,prev }){
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <nav className="Nav">
            <div>
                <Button onClick={() => paginate(prev)} text="Prev" type="paginacion"/>
                {
                pageNumber && pageNumber.map((number) => (
                    <Button onClick={() => paginate(number)}  key={number} text={number} type="paginacion"/>
                ))
                }
                <Button onClick={() => paginate(next)} text="Next" type="paginacion"/>
            </div>
        </nav>
    );
};