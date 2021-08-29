import "./Sidebar.css";
import { SideOption } from "../logic/Options"
import React from "react";
  


interface DisplayProps {
    sideSelect: SideOption,
    onSideSelect: React.Dispatch<React.SetStateAction<SideOption>>
} 

function Sidebar(props: DisplayProps) {
    const {sideSelect, onSideSelect} = props;

    // Button css class to show selection
    let home: string = "";
    let customers: string = "";
    let vendors: string = "";

    switch(sideSelect) { 
        case SideOption.Home: { 
           home = "selected"; 
           break; 
        } 
        case SideOption.Customers: { 
           customers = "selected"
           break; 
        } 
        case SideOption.Vendors: { 
           vendors = "selected"
           break; 
        } 
     } 


    return (
        <div className="sidebar">
            <img src="assets/icon.svg"/>
            <button className={home} onClick={() => onSideSelect(SideOption.Home)} >Home</button>
            <button className={customers} onClick={() => onSideSelect(SideOption.Customers)}  >Customers</button>
            <button className={vendors} onClick={() => onSideSelect(SideOption.Vendors)}  >Vendors</button>
        </div>
    )
}

export default Sidebar;
 