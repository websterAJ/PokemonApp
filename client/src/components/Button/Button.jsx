import "./Button.css"
import { Link } from "react-router-dom";
export default function Button(props) {
    let button;
    if (props.onclick) {
        if (props.textType === "icon") {
            button = <button className={"btn "+props.type}>
                    <span className={props.text}></span>
                </button>
        }else{
            button = <button className={"btn "+props.type}>{props.text}</button>
        }
    }else if(props.form === "true"){
        button = <button type={props.typeBtn} className={"btn "+props.type}>{props.text}</button>
    }else{
        button = <Link to={props.to}><button className={"btn "+props.type}>{props.text}</button></Link>
    }
    return(
        button
    )
}