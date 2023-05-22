import "./Header.css"
import logo from "../../assets/img/pokemonLogo.png"
export default function Header() {
    return(
        <div className="container">
            <img src={logo} className="logo_navbar" alt="Pokemon logo" />
            
        </div>
    );
}