import "./Navbar.css"
import logo from "../../assets/img/pokemonLogo.png"
import Input from "../Input/Input"
import Button from "../Button/Button"
import { useDispatch } from "react-redux";
import { ClearFilter,filterByName} from "../../redux/Actions/index";
export default function Navbar() {
    const dispatch = useDispatch();
    const filter = ()=> {
        let input = document.getElementById("search");
        dispatch(ClearFilter());
        dispatch(filterByName(input.value));
    };

    return(
        <div className="container">
            <div className="navbar">
                <img src={logo} className="logo_navbar" alt="Pokemon logo" />
                <div className="center w-25">
                    <div className="control-group">
                        <Input type="text" id="search" name="search" css="mr-10" placeholder="Ingrese el nombre de su pokemon" label="false"/>
                        <Button textType="icon" text="search" onclick={filter} type="icon btn-radius"/>
                    </div>
                </div>
                <Button text="Nuevo Pokemon" to="/create-pokemon" type="mt-10 btn-radius"/>
            </div>
        </div>
    );
}