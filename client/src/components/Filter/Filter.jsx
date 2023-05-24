import "./Filter.css"
import Select from "../Select/Select";
import {useDispatch } from "react-redux";

import { filterByTypes, filterByOrder,ClearFilter} from "../../redux/Actions/index";

export default function Filter({Types,Orders}){
    const dispatch = useDispatch();
    let dataType = ["All"]
    Types.map((dta)=>{
        return dataType.push(dta.nombre);
    })

    const filterOrder = (e)=> {
        e.preventDefault();
        dispatch(ClearFilter());
        dispatch(filterByOrder(e.target.value));
    };

    const filterType = (e)=> {
        e.preventDefault();
        dispatch(ClearFilter());
        dispatch(filterByTypes(e.target.value));
    };

    
    return (
        <div className="container-flex right">
            <Select data={dataType} onChange={(e)=>{filterType(e)}}/>
            <Select data={Orders} onChange={(e)=>{filterOrder(e)}}/>
        </div>
    );
}