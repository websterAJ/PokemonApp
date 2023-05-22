import React from "react";
import "../../assets/index.css"
import "./Welcome.css";
import logo from "../../assets/img/pokemonLogo.png"
import Button from "../../components/Button/Button";

function Welcome (){
	return (
		<div className="container">
			<div className="welcome">
				<img src={logo} alt="Pokemon logo" className="logo"/>
				<h1>Bienvenidos a mi PokeDex</h1>
				<Button text="Ingresar" to="/home" type="primary mt-20 btn-radius"/>
			</div>
		</div>
	);
};

export default Welcome;