import "./Button.css"
import { Link } from "react-router-dom";
export default function Button(props) {
    let button;
    
    if (props.onclick && props.onclick !== "") {
        if(props.textType === "icon"){
            button = <button className={"btn "+props.type} onClick={props.onclick}>
            <span className={props.text}></span>
        </button>
        }else{
            button = <button className={"btn "+props.type} onClick={props.onclick}>{props.text}</button>
        }
        
    }else if(props.textType === "icon"){
        button = <button className={"btn "+props.type}>
            <span className={props.text}></span>
        </button>
    }else if(props.form === "true"){
        button = <button type={props.typeBtn} className={"btn "+props.type}>{props.text}</button>
    }else{
        
        if(props.btnForm === "true"){
            button = <button type={props.tpbtn} className={"btn "+props.type}>{props.text}</button>
        }else{
            button = <Link to={props.to}><button className={"btn "+props.type}>{props.text}</button></Link>
        }
    }
    return(
        button
    )
}