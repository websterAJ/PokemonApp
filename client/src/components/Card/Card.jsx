import "./Card.css"

export default function Card(props) {
    let Types ="";
    if(props.Types.length >0){
        Types = props.Types.map(type=>{
            if(typeof(type) == "object"){
                return Types = <span className={type.nombre}>{type.nombre}</span>
            }else{
                return Types = <span className={type}>{type}</span>
            }
        })
    }
    
    return (
        <section className="card">
            <img src={props.imagen} alt="pokemon" />
            <section className="container-card">
                <h4><b>{props.nombre}</b></h4>
                {Types}
            </section>
        </section>
    )
}