import "./Filter.css"
import Select from "../Select/Select";
export default function Filter({Types,Orders}){
    let dataType = []
    Types.map((dta)=>{
        return dataType.push(dta.nombre);
    })
    return (
        <div className="container-flex right">
            <Select data={dataType}/>
            <Select data={Orders}/>
        </div>
    );
}