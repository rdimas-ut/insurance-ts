import { TopBar, TopBarProps } from "./TopBar";
import { Table, TableProps } from "../../HelperComponents/Table";


interface DetailviewProps<Enum> extends TopBarProps<Enum> {
    tableProps: TablesProps
}

export interface TablesProps {
    [key: string] : TableProps<any>,
}

export function Detailview<Enum, Type extends {[key: string]: any}>(props: DetailviewProps<Enum>) {
    const {tabSelect, tabData, onTabSelect ,header, tableProps} = props;
    let tableProp: TableProps<any> = tableProps[tabSelect.toString()] 

    return (
        <div>
            {<TopBar<Enum> header={header} tabSelect={tabSelect} onTabSelect={onTabSelect} tabData={tabData} />}
            {<Table {...tableProp} />}
        </div>
    )
}
