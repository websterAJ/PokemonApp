import React from "react";
import "./Form.css";
import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
//import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllTypes} from "../../redux/Actions/index";

function Form(){
	const dispatch = useDispatch();
	let AllTypes = useSelector(state => state.ListTypes);
	
	useEffect(() => {
        dispatch(getAllTypes());
    }, [dispatch]);
	return (
		<>
			<Header/>
			<Button to="/home" text="Volver"/>
			<div className="container w-80 center">
				<h2>Registro de nuevo Pokemon</h2>
				<form>
					
					<Input 
						label="true"
						type="text"
						id="nombre"
						css=""
						placeholder="Ingrese el nombre de su pokemon"
					/>

					<Input 
						label="true"
						type="number"
						id="vida"
						css=""
						placeholder="Ingrese la vida de su pokemon"
					/>

					<Input 
						label="true"
						type="text"
						id="imagen"
						css=""
						placeholder="Ingrese el link de la imagen de su pokemon"
					/>

					<Input 
						label="true"
						type="number"
						id="ataque"
						css=""
						placeholder="Ingrese el ataque de su pokemon"
					/>
					<Input 
						label="true"
						type="number"
						id="defensa"
						css=""
						placeholder="Ingrese el defensa de su pokemon"
					/>
					<Input 
						label="true"
						type="number"
						id="velocidad"
						css=""
						placeholder="Ingrese la velocidad de su pokemon"
					/>
					<Input 
						label="true"
						type="number"
						id="altura"
						css=""
						placeholder="Ingrese la altura de su pokemon"
					/>
					<Input 
						label="true"
						type="number"
						id="peso"
						css=""
						placeholder="Ingrese el peso de su pokemon"
					/>
					<div className="grid">
						{
							AllTypes.map((item,i)=>{
								return (
									<Input
										key={i}
										label="true"
										type="checkbox"
										id={item.nombre}
									/>
								)
							})
						}
					</div>
					<Button form="true" typeBtn="submit" text="Registrar" type="primary"/>
					<Button form="true" typeBtn="reset" text="Limpiar" type=""/>
				</form>
			</div>
		</>
	);
};

export default Form;