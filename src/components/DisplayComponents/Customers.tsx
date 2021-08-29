import {Table as Overview, Format, TableProps} from "../HelperComponents/Table";
import { CustDVOption, ModalOption } from "../../logic/Options"
import {AppData, Census, Customer, Policy} from  "../../logic/AppData";
import { Detailview, TablesProps } from "./SubDisplayComponents/Detailview";
import { TabData } from "./SubDisplayComponents/TopBar";
import { ModalData, DefaultPolicy, DefaultCensusForm } from "../../logic/ModalData";


interface CustomerProps {
    modalData: ModalData,
    setModalData: React.Dispatch<React.SetStateAction<ModalData>>,
    custSelect: string,
    custDVSelect: CustDVOption,
    onCustDVSelect: React.Dispatch<React.SetStateAction<CustDVOption>>
    onCustSelect: React.Dispatch<React.SetStateAction<string>>, 
    onCensusSelect: (covDate: string) => void,
    onPolicySelect: (pid: number) => void,
    appData: AppData,
    onModalSelect: React.Dispatch<React.SetStateAction<ModalOption>>,
    censusFormDisabled: boolean,
    onCensusFormDisabled: React.Dispatch<React.SetStateAction<boolean>>, 
}

function Customers(props: CustomerProps) {
    const {
        modalData, 
        setModalData, 
        custDVSelect, 
        onCustDVSelect, 
        custSelect, 
        onCustSelect, 
        onCensusSelect, 
        appData, 
        onModalSelect,
        censusFormDisabled,
        onCensusFormDisabled,
        onPolicySelect,
    } = props;

    // Customers data and format preparation
    let customers = appData.Customer;
    let customerListData: Array<Customer> = [{DispName: "Test"}];
    let customerListFormat: Format = {
        proportions: {DispName: "100"},
        displayName: {DispName: "Display Name"},
        selectable: true,
        onSelect: onCustSelect,
        primaryKey: "DispName",
    };

    customerListData = customers.map((cust, index) => {
        return {DispName: cust.DispName}
    })

    // Census data and format preparation
    let census = appData.Census;
    let censusListData: Array<Census> = [];
    let censusListFormat: Format = {
        proportions: {CovDate: "30", EE: "17.5", ES: "17.5", EC: "17.5", EF: "17.5"},
        displayName: {CovDate: "Coverage Date", EE: "EE", ES: "ES", EC: "EC", EF: "EF"},
        selectable: true,
        onSelect: onCensusSelect,
        primaryKey: "CovDate"
    }

    censusListData = census.filter((cen, index) => cen.Status === "Actual" && cen.Customer === custSelect)
    censusListData = censusListData.map((cen, index) => {
        let month: Array<string> = ["January", "Febuary", "March", "April", 
                                    "May", "June", "July", "August", "September",
                                    "October", "November", "December"] 
        let newCen = cen;
        newCen["CovDate"] = `${month[cen.CovMonth - 1]}-${String(cen.CovYear)}`
        return newCen
    })

    // Policies data and format
    let policies = appData.Policy
    let policiesListData: Array<Policy> = []
    let policiesListFormat: Format = {
        proportions: {
            StartDate: "20",
            MIC: "16",
            MGU: "16",
            Carrier: "16",
            Network: "16",
            AdminTPA: "16",
        },
        displayName: {
            StartDate: "Start Date",
            MIC: "MIC",
            MGU: "MGU",
            Carrier: "Carrier",
            Network: "Network",
            AdminTPA: "Admin/TPA",
        },
        selectable: true,
        onSelect: onPolicySelect,
        primaryKey: "PID",
    };
    
    policiesListData = policies.filter((pol, index) => pol.Customer === custSelect)
    policiesListData = policiesListData.map((pol, index) => {
        let month: Array<string> = ["January", "Febuary", "March", "April", 
                                    "May", "June", "July", "August", "September",
                                    "October", "November", "December"] 
        
        let newPol = pol;
        newPol["StartDate"] = `${pol.StartYear}-${month[pol.StartMonth-1]}`
        return newPol;
    })

    const opt: Array<TabData<CustDVOption>> = [{
        tabOption: CustDVOption.Invoices,
        new: true,
        onNew: () => {onModalSelect(ModalOption.Invoice)},
    }, {
        tabOption: CustDVOption.Policies,
        new: true,
        onNew: () => {
            setModalData({...modalData, Policy: Object.assign({}, DefaultPolicy)})
            onModalSelect(ModalOption.Policy)}
    }, {
        tabOption: CustDVOption.Census,
        new: true,
        onNew: () => {
            onCensusFormDisabled(false)
            setModalData({...modalData, CensusForm: Object.assign({}, DefaultCensusForm)})
            onModalSelect(ModalOption.Census)}
    }, {
        tabOption: CustDVOption.Back,
        new: false,
        onNew: () => {}
    }
    ]

    let tableProps: TablesProps = {
    "Customer": {
        format: customerListFormat,
        data: customerListData,
        },
    "Census": {
        format: censusListFormat,
        data: censusListData,
        },
    "Policies": {
        format: policiesListFormat,
        data: policiesListData,
        },
    }

    return (
        <div>
            { custSelect !== "" &&
            <Detailview<CustDVOption, Customer> 
                tableProps={tableProps} 
                header={custSelect} 
                tabSelect={custDVSelect} 
                onTabSelect={onCustDVSelect} 
                tabData={opt}
            />
            }
            { custSelect === "" &&
            <Overview format={customerListFormat} data={customerListData} />
            }
        </div>
    )
}

export default Customers;