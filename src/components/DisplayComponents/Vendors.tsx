import {Table as Overview, Format, TableProps} from "../HelperComponents/Table";
import { VendDVOption, ModalOption } from "../../logic/Options";
import {AppData, Vendor} from  "../../logic/AppData";
import { Detailview, TablesProps } from "./SubDisplayComponents/Detailview";
import { TabData } from "./SubDisplayComponents/TopBar";

interface VendorsProps {
    vendSelect: string,
    vendDVSelect: VendDVOption,
    onVendDVSelect: React.Dispatch<React.SetStateAction<VendDVOption>>,
    onVendSelect: React.Dispatch<React.SetStateAction<string>>,
    appData: AppData,
    onModalSelect: React.Dispatch<React.SetStateAction<ModalOption>>, 
}

function Vendors(props: VendorsProps) {
    const {vendDVSelect, onVendDVSelect, vendSelect, onVendSelect, appData, onModalSelect} = props;

    let vendoors = appData.Vendor
    let vendorListData: Array<Vendor> = [{DispName: "Test"}];
    let vendorListFormat: Format = {
        proportions: {DispName: "100"},
        displayName: {DispName: "Display Name"},
        selectable: true,
        onSelect: onVendSelect,
        primaryKey: "DispName",
    };

    vendorListData = vendoors.map((vend, index) => {
        return {DispName: vend.DispName}
    })

    const opt: Array<TabData<VendDVOption>> = [{
        tabOption: VendDVOption.Bills,
        new: true,
        onNew: () => {onModalSelect(ModalOption.Bill)}
    }, {
        tabOption: VendDVOption.Back,
        new: false,
        onNew: () => {}
    }
    ]

    let tableProps: TablesProps = {
        "Vendor" : {
            format: vendorListFormat,
            data: vendorListData
        }
    }

    console.log(vendSelect)

    return (
        <div>
            {vendSelect !== "" &&
            <Detailview<VendDVOption, Vendor> 
            tableProps={tableProps} 
            header={vendSelect} 
            tabSelect={vendDVSelect} 
            onTabSelect={onVendDVSelect} 
            tabData={opt}
            /> 
            }
            {vendSelect === "" &&
            <Overview format={vendorListFormat} data={vendorListData} />
            }
        </div>
    )
}

export default Vendors;