import "./Input.css"

export default function Input(props) {
    let label;
    let element;
    if(props.label === "true" && props.type !== "checkbox") {
        label = <label >{props.id.charAt(0).toUpperCase() + props.id.slice(1)}</label>
    }

    if(props.type !=="checkbox"){
        element =<div className="divInput">{label}<input type={props.type} id={props.id} name={props.id} className={"border-round "+props.css } placeholder={props.placeholder} /></div>
    }else{
        element = <div key={props.key}><label class="checkbox">{props.id}<input type="checkbox" id={props.id} name={props.id} className="border-round "/><span class="checkmark"></span></label></div>
    }
    return(
        element
    );
}