import "./Input.css"

export default function Input(props) {
    let label;
    if(props.label == "true") {
        label = <label >{props.name}</label>
    }
    return(
        <>
            {label}
            <input type={props.type} id={props.id} name={props.name} className="border-round" placeholder={props.placeholder} />
        </>
    );
}