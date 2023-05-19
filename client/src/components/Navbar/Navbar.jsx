import "./Navbar.css"
import logo from "../../assets/img/pokemonLogo.png"
import Input from "../Input/Input"
import Button from "../Button/Button"
import IconSearch from "../../assets/img/Iconzoom.png"

export default function Navbar() {
    return(
        <div className="container">
            <div className="navbar">
                <img src={logo} className="logo_navbar" alt="Pokemon logo" />
                <div className="container-center w-25">
                    <Input type="text" id="search" name="search" placeholder="Ingrese el nombre de su pokemon" label="false"/>
                    <Button textType="img" text={IconSearch}/>
                </div>
            </div>
        </div>
    );
}