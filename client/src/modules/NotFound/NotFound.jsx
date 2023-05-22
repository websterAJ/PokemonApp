import React from "react";
import "../../assets/index.css";
import "./NotFound.css";

import Button from "../../components/Button/Button";
import error404 from "../../assets/img/erreur404.png"

function NotFound(){
	return (
		<div className="container">
			<div className="TextContainer">
                <h1 className="title">4 <span className="iconTitle"></span>  4</h1>
				<h2 className="TextError">
					Uh - OH !
				</h2>
                <h2>ha ocurrido un problema <br /> La pagina que estas intentando acceder no se encuentra disponible</h2>
				<p>
					Posiblemente se encuentra en proceso de mantenimiento, descuida que
					nuestro maestro pokemon esta dando lo mejor de el para solucionarlo
				</p>
			</div>
            <div className="center">
                <img
                    src={error404}
                    alt='error404'
                />
            </div>
			
            <Button type="primary btn-radius" to='/home/' text="REGRESAR AL HOME"/>
		</div>
	);
};

export default NotFound;