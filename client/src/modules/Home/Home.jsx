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

export default function Home(){
	const dispatch = useDispatch();
    let AllData = useSelector(state => state.pokemons);
    let AllTypes = useSelector(state => state.ListTypes);
    let Orders = ["ascendente","descendente"];
    let next = useSelector(state => state.next);
    let prev = useSelector(state => state.prev);
    const loading = useSelector((state) => state.loading);

    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage] = useState(20);

    useEffect(() => {
        dispatch(GetPokemons());
        dispatch(getAllTypes());
    }, [dispatch]);

    let currentPokemons = AllData.filter((item,index)=>{
        return AllData.indexOf(item) === index;
    });

    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    console.log(AllTypes);
    console.log(Orders);
	
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
                                    <div key={i}>
                                        <Card
                                            id={dta.id}
                                            imagen={dta.imagen}
                                            nombre={dta.nombre}
                                            Types={dta.Types}
                                        />
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
                totalPokemons="100"
                paginate={paginate}
                next={next}
                prev={prev}
        	/>
		</div>
	);
};