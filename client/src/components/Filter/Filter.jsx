import "./Filter.css"
import Select from "../Select/Select";
export default function Filter(){
    let data =[
		"a",
		"b",
		"c"
	]
    return (
        <div className="container-flex right">
            <Select data={data}/>
            <Select data={data}/>
        </div>
    );
}