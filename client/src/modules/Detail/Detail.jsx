import React from "react";
import "./Detail.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Loading from "../../components/Loading/Loading";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../redux/Actions/index";
import { useParams } from "react-router-dom";

function Detail(){
	const dispatch = useDispatch();
	const pokemon = useSelector((state) => state.pokemon);
	const [loading, setLoading] = useState(true);
	const { id } = useParams();
	let PokemonDetail,tipos,bd;

	useEffect(() => {
		const getData = async () => {
		  setLoading(true);
		  await dispatch(getPokemonDetail(id));
		  setLoading(false);
		};
		getData();
	  }, [dispatch, id]);
	  if(loading === false){
		PokemonDetail=pokemon.data;
		console.log(PokemonDetail);
		if(PokemonDetail.Types){
			tipos =PokemonDetail.Types;
		}else if(PokemonDetail.types){
			tipos =PokemonDetail.types.map((t)=>{
				return t.nombre+" ";
			});
			bd= true;
		}
	  }
	return (
		<>
			<Header/>
			<Button to="/home" text="Volver"/>
			{
				loading ? (
					<Loading />
				) :(
					<div className="container mt-20 w-100 divGeneral">
						<div className="w-40 divImg">
							<img src={PokemonDetail.imagen} alt="pokemon" />
						</div>
						<div className="w-60 divContainer">
							<table>
								<tbody>
									<tr>
										<td>Nombre:</td>
										<td>{PokemonDetail.nombre}</td>
									</tr>
									<tr>
										<td>Vida:</td>
										<td>{PokemonDetail.vida}</td>
									</tr>
									<tr>
										<td>Ataque:</td>
										<td>{PokemonDetail.ataque}</td>
									</tr>
									<tr>
										<td>Defensa:</td>
										<td>{PokemonDetail.defensa}</td>
									</tr>
									<tr>
										<td>Velocidad:</td>
										<td>{PokemonDetail.velocidad}</td>
									</tr>
									<tr>
										<td>Altura:</td>
										<td>{PokemonDetail.altura}</td>
									</tr>
									<tr>
										<td>Peso:</td>
										<td>{PokemonDetail.peso}</td>
									</tr>
									<tr>
										<td>Tipos:</td>
										<td>{tipos}</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div className="w-100 mt-50 center divContainer">
							{/*bd?(
								<>
									<Button to="/home" text="Eliminar" type="primary"/>
									<Button to="/home" text="Editar"/>
								</>
							):""*/}
						</div>
					</div>
				)
			}
			
		</>
	);
};

export default Detail;