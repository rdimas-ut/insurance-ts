import "./Table.css";

export interface Format {
    proportions: {[key: string]: string},
    displayName: {[key: string]: string},
    selectable: Boolean,
    onSelect: Function,
    primaryKey: string,
}

export interface TableProps<Type>{
    format: Format,
    data: Array<Type>
}

export function Table<Type extends {[key: string]: any;}>(props: TableProps<Type>) {
    const {format, data} = props;
    let labels: string[]; 
    if(format !== undefined) {
        labels = Object.keys(format.proportions)
    }

    return (
        <div className="Table" >
            { (data !== undefined && format !== undefined) && <div>
            <div>
                <table>
                    <thead>
                        <tr>
                            {labels.map((label, index)=> {
                                return (
                                    <th key={label} style={{width: `${format.proportions[label]}%`}} >{format.displayName[label]}</th>
                                )
                            })}
                        </tr>
                    </thead>
                </table>
            </div>

            {data.map((entry, index) => {
                let cursor = format.selectable ? "pointer" : "default";
            return (
                <div key={index} style={{cursor}} onClick={() => {format.onSelect(entry[format.primaryKey])}}>
                    <table>
                        <tbody>
                            <tr>
                                {labels.map((label, indexTwo) => {
                                    return(
                                    <td key={indexTwo}  style={{width: `${format.proportions[label]}%`}} >
                                        {entry[label]}
                                    </td>)
                                })}
                            </tr>
                        </tbody>
                    </table>
                </div>
                    );
                })}
            </div>}
            {
               (data === undefined || format === undefined) &&
               <a>Data and/or format are undefined</a> 
            }
        </div>
    )
}