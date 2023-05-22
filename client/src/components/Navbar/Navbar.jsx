import "./Navbar.css"
import logo from "../../assets/img/pokemonLogo.png"
import Input from "../Input/Input"
import Button from "../Button/Button"

export default function Navbar() {
    return(
        <div className="container">
            <div className="navbar">
                <img src={logo} className="logo_navbar" alt="Pokemon logo" />
                <div className="center w-25">
                    <div className="control-group">
                        <Input type="text" id="search" name="search" css="mr-10" placeholder="Ingrese el nombre de su pokemon" label="false"/>
                        <Button textType="icon" text="search" onclick="accion" type="icon btn-radius"/>
                    </div>
                </div>
                <Button text="Nuevo Pokemon" to="/create-pokemon" type="mt-10 btn-radius"/>
            </div>
        </div>
    );
}