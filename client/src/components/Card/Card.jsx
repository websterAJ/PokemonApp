import "./Card.css"

export default function Card(props) {
    let Types ="";
    if(props.Types.length >0){
        Types = props.Types.map(type=>{
            return Types = <span className={type}>{type}</span>
        })
    }
    
    return (
    <div className="card">
        <img src={props.imagen} alt="pokemon" />
        <div className="container-card">
            <h4><b>{props.nombre}</b></h4>
            {Types}
        </div>
    </div>
    )
}