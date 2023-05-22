import "./Loading.css"

import pokebola from "../../assets/img/pokeBola2.png"

export default function Loading() {
    return(
        <div className="loading">
            <div className="pokeball">
                <img src={pokebola} alt="pokebola" />
                <h2>Cargando ...</h2>
            </div>
        </div>
    );
}