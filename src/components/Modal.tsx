import React from "react";
import {Census} from "./ModalComponents/Census"
import {Policy} from "./ModalComponents/Policy"
import {Invoice} from "./ModalComponents/Invoice"
import {Bill} from "./ModalComponents/Bill"
import {Error} from "./ModalComponents/Error"
import {ModalOption} from "../logic/Options"
import {CensusForm, ModalData, PolicyForm } from "../logic/ModalData"
import {Vendor, Item, Account } from  "../logic/AppData";


interface ModalProps {
    onForm: any,
    modalSelect: ModalOption,
    modalData: ModalData,
    onModalData: React.Dispatch<React.SetStateAction<ModalData>>
    censusData: CensusForm,
    vendorOptions: Array<Vendor>,
    itemOptions: Array<Item>,
    accountOptions: Array<Account>
    censusFormDisabled: boolean,
    onCensusFormDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export function Modal(props: ModalProps) {
    const {
        accountOptions,
        vendorOptions,
        itemOptions,
        onForm,
        modalSelect, 
        modalData, 
        onModalData, 
        censusData,
        censusFormDisabled,
        onCensusFormDisabled,
    } = props;
    let form: JSX.Element;

    switch(modalSelect){
        case ModalOption.Error: {
            form = <Error message={"Hello"}/>;
            break;
        }
        case ModalOption.Census: {
            form = <Census
                censusFormDisabled={censusFormDisabled}
                onCensusFormDisabled={onCensusFormDisabled}
                onForm={onForm} 
                censusModalData={censusData} 
                onCensusModalData={(censusModalData: CensusForm) => {onModalData({...modalData, CensusForm: censusModalData})}} 
                />;
            break;
        }
        case ModalOption.Policy: {
            form = <Policy
                onForm={onForm}
                policyData={modalData.Policy} 
                onPolicyData={(policyModalData: PolicyForm) => {onModalData({...modalData, Policy: policyModalData})}} 
                vendorOptions={vendorOptions}
                itemOptions={itemOptions}
                accountOptions={accountOptions}
                />;
            break;
        }
        case ModalOption.Invoice: {
            form = <Invoice/>;
            break;
        }
        case ModalOption.Bill: {
            form = <Bill/>;
            break;
        }
    }

    console.log(modalSelect)

    return (
        <React.Fragment>
            {/* <!-- Button trigger modal --> */}
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
            Launch static backdrop modal
            </button> */}

            {/* <!-- Modal --> */}
            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">{modalSelect}</h5>

                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {form}
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Understood</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
