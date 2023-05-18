import "./Button.css"
import { Link } from "react-router-dom";
export default function Button(props) {
    console.log(props);
    
    return(
        <Link to={props.to}>
            <button className={"btn "+props.type}>{props.text}</button>
        </Link>
    )
}