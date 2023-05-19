import "./Button.css"
import { Link } from "react-router-dom";
export default function Button(props) {
    let button;
    if (props.onclick) {
        button = <button className={"btn "+props.type}>{props.text}</button>
    }else{
        button = <Link to={props.to}><button className={"btn "+props.type}>{props.text}</button></Link>
    }
    return(
        button
    )
}