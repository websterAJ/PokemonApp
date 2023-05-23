import React from "react";
import "./Form.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import axios from "axios";
import Validator from "./Validator";
//import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { getAllTypes} from "../../redux/Actions/index";

export default function Form(){
	const dispatch = useDispatch();
	let AllTypes = useSelector(state => state.ListTypes);
	const [selectedTypes, setSelectedTypes] = useState([]);
	const [pokemonCreated, setPokemonCreated] = useState(false);
	const [pokemonError, setPokemonError] = useState(false);
	
	const [form, setForm] = useState({
		nombre:"",
		vida:0,
		imagen:"",
		ataque:0,
		defensa:0,
		velocidad:0,
		altura:0.0,
		peso:0.0,
		Type:[]
	});

	const [error, setError] = useState({
		nombre:"",
		vida:"",
		imagen:"",
		ataque:"",
		defensa:"",
		velocidad:"",
		altura:"",
		peso:"",
		Type:[]
	  });

	const submitHandler = (event)=>{
		event.preventDefault();
		console.log(form);
		if(!form.Type.length){
			form.Type.push("normal")
		}

		axios.post("http://localhost:3001/pokemons", form)
		.then((res) => {
			setPokemonCreated(true);
			setPokemonError(false);
		})
		.catch((err) => {
			setPokemonCreated(false);
			setPokemonError(true);
		});
	}
	const changeHandler = (event) => {
		let property = event.target.name;
		let value = event.target.value;
	
		if (property === "nombre"){
			value = value.toLocaleLowerCase();
		}
	
		setError(Validator(property, value));
		setForm({ ...form, [property]: value });
	};
	const changeHandlerType = (e,type) => {
		e.preventDefault();
		if (selectedTypes.length < 2) {
			setSelectedTypes([...selectedTypes, type]);
			setForm({ ...form, Type: [...form.Type, type] });
		} else {
			selectedTypes[0] = selectedTypes[1];
			selectedTypes[1] = type;
			setSelectedTypes([...selectedTypes]);
			setForm({ ...form, Type: [selectedTypes[0], selectedTypes[1]] });
		}
	};
	
	useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);
	return (
		<>
			<Header/>
			<Button to="/home" text="Volver"/>
			<div className="container w-80 center">
				<h2>Registro de nuevo Pokemon</h2>
				{pokemonCreated && <h3>Pokemon creado con exito</h3>}
				{pokemonError && <h3>Error al crear su pokemon</h3>}
				<form onSubmit={submitHandler}>

					<div className="divInput" key="nombre">
						<label>Nombre</label>
						<input onChange={changeHandler} type="text" id="nombre" name="nombre" className="border-round " placeholder="Ingrese el nombre de su pokemon"  />
						{error.nombre && <p className="Error">{error.nombre}</p>}
					</div>
					<div className="divInput" key="vida">
						<label>Vida</label>
						<input onChange={changeHandler} type="number" id="vida" name="vida" className="border-round " placeholder="Ingrese la vida de su pokemon"  />
						{error.vida && <p className="Error">{error.vida}</p>}
					</div>
					<div className="divInput" key="imagen">
						<label>Imagen</label>
						<input onChange={changeHandler} type="text" id="imagen" name="imagen" className="border-round " placeholder="Ingrese el link de la imagen de su pokemon"  />
						{error.imagen && <p className="Error">{error.imagen}</p>}
					</div>
					<div className="divInput" key="ataque">
						<label>Ataque</label>
						<input onChange={changeHandler} type="number" id="ataque" name="ataque" className="border-round " placeholder="Ingrese el ataque de su pokemon"  />
						{error.ataque && <p className="Error">{error.ataque}</p>}
					</div>
					<div className="divInput" key="defensa">
						<label>Defensa</label>
						<input onChange={changeHandler} type="number" id="defensa" name="defensa" className="border-round " placeholder="Ingrese el defensa de su pokemon"  />
						{error.defensa && <p className="Error">{error.defensa}</p>}
					</div>
					<div className="divInput" key="velocidad">
						<label>Velocidad</label>
						<input onChange={changeHandler} type="number" id="velocidad" name="velocidad" className="border-round " placeholder="Ingrese la velocidad de su pokemon"  />
						{error.velocidad && <p className="Error">{error.velocidad}</p>}
					</div>
					<div className="divInput" key="altura">
						<label>Altura</label>
						<input onChange={changeHandler} type="number" id="altura" name="altura" className="border-round " placeholder="Ingrese la altura de su pokemon"  />
						{error.altura && <p className="Error">{error.altura}</p>}
					</div>
					<div className="divInput" key="peso">
						<label>Peso</label>
						<input onChange={changeHandler} type="number" id="peso" name="peso" className="border-round " placeholder="Ingrese el peso de su pokemon"  />
						{error.peso && <p className="Error">{error.peso}</p>}
					</div>
					<div className="grid">
						{
							AllTypes.map((item)=>{
								return (
									<div key={item.id}>
										<label className="checkbox">{item.nombre}
											<input type="checkbox" id={item.nombre} name={item.nombre} value={item.nombre} className="border-round" onChange={(e)=> changeHandlerType(e,item.nombre)}/>
											<span className="checkmark"></span>
										</label>
									</div>
								)
							})
						}
					</div>
					<Button btnForm="true" tpbtn="submit" text="Registrar" type="primary"/>
					<Button btnForm="true" tpbtn="reset" text="Limpiar" type=""/>
				</form>
			</div>
		</>
	);
};
