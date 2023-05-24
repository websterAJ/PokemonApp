import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetPokemons, getAllTypes} from "../../redux/Actions/index";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination"
import notFoundImg from "../../assets/img/erreur404.png"
import Card from "../../components/Card/Card"
import Loading from "../../components/Loading/Loading";
import { Link } from "react-router-dom";

export default function Home(){
	const dispatch = useDispatch();
    let AllData = useSelector(state => state.pokemons);
    let AllTypes = useSelector(state => state.ListTypes);
    let countPokemon = useSelector(state => state.countPokemon);
    const loading = useSelector((state) => state.loading);
    const [pokemonsPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);


    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;

    let next = currentPage+1;
    let prev = currentPage-1;
    let Orders = ["pokedex","Order A-Z","Order Z-A","Attack +","Attack -","DB","Api"];

    useEffect(() => {
        dispatch(GetPokemons());
        dispatch(getAllTypes());
    }, [dispatch]);

    let hash = {};
    let currentPokemons = AllData.filter(o => hash[o.id] ? false : hash[o.id] = true);
    
    currentPokemons = currentPokemons.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    )
    
    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
    };
	
	return (
		<div className="container">
			<Navbar/>
            {
                loading ? (
                    <Loading/>
                ) :
                <>
                    <Filter 
                        Types ={AllTypes}
                        Orders ={Orders}
                    />
                    <div className="row">
                        {currentPokemons.length ? (
                            currentPokemons.map((dta,i)=>{
                                return(
                                    <div key={dta.nombre}>
                                        <Link to={"/details/"+dta.id}>
                                            <Card
                                                id={dta.id}
                                                imagen={dta.imagen}
                                                nombre={dta.nombre}
                                                Types={dta.Types ? dta.Types: dta.types}
                                            />
                                        </Link>
                                    </div>
                                )
                            })
                        ) : (
                            <div>
                                <h2>No hay Pokemon registrados</h2>
                                <img src={notFoundImg} alt='Not Found' />
                            </div>
                        )}
                    </div>
                </>
            }
			<Pagination
                pokemonsPerPage={pokemonsPerPage}
                totalPokemons={countPokemon}
                paginate={paginate}
                next={next}
                prev={prev}
        	/>
		</div>
	);
};