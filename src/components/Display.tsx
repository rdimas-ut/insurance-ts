import { useState } from "react";
import { SideOption, CustDVOption, VendDVOption, ModalOption } from "../logic/Options"
import "./Display.css";
import Home from "./DisplayComponents/Home";
import Customers from "./DisplayComponents/Customers"
import Vendors from "./DisplayComponents/Vendors";
import {AppData} from  "../logic/AppData";
import { ModalData } from  "../logic/ModalData";

interface DisplayProps {
    modalData: ModalData
    setModalData: React.Dispatch<React.SetStateAction<ModalData>>,
    sideSelect: SideOption,
    onModalSelect: React.Dispatch<React.SetStateAction<ModalOption>>,
    custSelect: string,
    onCustSelect: React.Dispatch<React.SetStateAction<string>>,
    custDVSelect: CustDVOption,
    onCustDVSelect:  React.Dispatch<React.SetStateAction<CustDVOption>>
    vendSelect: string,
    onVendSelect: React.Dispatch<React.SetStateAction<string>>,
    vendDVSelect: VendDVOption,
    onVendDVSelect: React.Dispatch<React.SetStateAction<VendDVOption>>,
    onCensusSelect: (covDate: string) => void,
    onPolicySelect: (pid: number) => void,
    appData: AppData,
    censusFormDisabled: boolean,
    onCensusFormDisabled: React.Dispatch<React.SetStateAction<boolean>>
} 

function Display(props: DisplayProps) {
    const {sideSelect, 
        custDVSelect, 
        onCustDVSelect, 
        custSelect, 
        onCustSelect,
        vendSelect,
        onVendSelect,
        vendDVSelect,
        onVendDVSelect,
        onCensusSelect,
        onPolicySelect,
        appData,
        modalData,
        setModalData,
        onModalSelect,
        censusFormDisabled,
        onCensusFormDisabled,
    } = props;

    let page: JSX.Element; 

    switch(sideSelect) { 
        case SideOption.Home: { 
           page = <Home/>; 
           break; 
        } 
        case SideOption.Customers: { 
           page = <Customers
                    onPolicySelect={onPolicySelect}
                    censusFormDisabled={censusFormDisabled}
                    onCensusFormDisabled={onCensusFormDisabled}
                    appData={appData}
                    modalData={modalData}
                    setModalData={setModalData}
                    onModalSelect={onModalSelect}
                    custSelect={custSelect} 
                    onCustSelect={onCustSelect} 
                    custDVSelect={custDVSelect} 
                    onCustDVSelect={onCustDVSelect}
                    onCensusSelect={onCensusSelect}
                />;
           break; 
        } 
        case SideOption.Vendors: { 
           page = <Vendors
                    appData={appData}
                    onModalSelect={onModalSelect}
                    vendSelect={vendSelect}
                    onVendSelect={onVendSelect}
                    vendDVSelect={vendDVSelect}
                    onVendDVSelect={onVendDVSelect}
                />;
           break; 
        } 
    } 

    return (
        <div className="content">
            {page}
        </div>
    )
}

export default Display;