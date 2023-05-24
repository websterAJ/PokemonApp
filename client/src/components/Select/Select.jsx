import "./Select.css"


export default function Select(props) {
    let dataFinal=props.data.map(items =>{
        return <option key={items} value={items}>{items}</option>
    })
    return (
        <select id={props.id} onChange={props.onChange}>
            {dataFinal}
        </select>
    );
}