import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetPokemons} from "../../rebux/Actions/index";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Filter from "../../components/Filter/Filter";
import Pagination from "../../components/Pagination/Pagination"
import notFoundImg from "../../assets/img/erreur404.png"
import Card from "../../components/Card/Card"

function Home(){
	const dispatch = useDispatch();
    const AllData = useSelector(state => state.pokemons);
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(5);
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    useEffect(() => {
        dispatch(GetPokemons());
    }, [dispatch]);
    const currentPokemons = AllData.slice(
        indexOfFirstPokemon,
        indexOfLastPokemon
    );
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

	
	return (
		<div className="container">
			<Navbar/>
			<Filter/>
			<div className="row">
			{currentPokemons.length ?
                currentPokemons.map((dta,i)=>{
                    return(
                        <Card
							key={i}
							id={dta.id}
							imagen={dta.imagen}
							nombre={dta.nombre}
							Types={dta.Types}
                        />
                    )
                })
            :
            <div>
                <img src={notFoundImg} alt='Not Found' />
            </div>
            }
			</div>
			<Pagination
                key={AllData.id}
                pokemonsPerPage={pokemonsPerPage}
                totalPokemons={AllData.length}
                paginate={paginate}
        	/>
		</div>
	);
};

export default Home;