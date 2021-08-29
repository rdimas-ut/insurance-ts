import { PolicyForm, DefaultPremiumFee, DefaultVendorFee } from "../../logic/ModalData";
import React from "react";
import { Vendor, Item, Account } from  "../../logic/AppData";

interface PolicyProps {
    onForm: any,
    policyData: PolicyForm,
    onPolicyData: (policyData: PolicyForm) => void,
    vendorOptions: Array<Vendor>,
    itemOptions: Array<Item>,
    accountOptions: Array<Account>
}

export function Policy(props: PolicyProps) {
    const {onForm, policyData, onPolicyData, vendorOptions, itemOptions, accountOptions} = props;

    const addPremiumFee = () => {
        let premiumFees = policyData.PremiumFee;
        premiumFees.push(Object.assign({}, DefaultPremiumFee));
        onPolicyData({...policyData, 
            PremiumFee: premiumFees
        })
    }

    const subPremiumFee = (subIndex: number) => {
        let premiumFees = policyData.PremiumFee.filter((pf, index) => index !== subIndex)
        onPolicyData({...policyData, 
            PremiumFee: premiumFees
        })
    }

    const addVendorFee = () => {
        let vendorFees = policyData.VendorFee;
        vendorFees.push(Object.assign({}, DefaultVendorFee));
        onPolicyData({...policyData, 
            VendorFee: vendorFees
        })
    }

    const subVendorFee = (subIndex: number) => {
        let vendorFees = policyData.VendorFee.filter((pf, index) => index !== subIndex)
        onPolicyData({...policyData, 
            VendorFee: vendorFees
        })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.checkValidity()
        onForm("policy")
    }

    return (
        <form onSubmit={handleSubmit} className="row g-3" id="policyform">
            <h4>Stop Loss Terms</h4>

            <div className="mb-3">
                <label htmlFor="mgu" className="form-label">MGU</label>
                <input value={policyData.MGU}
                    onChange={(event) => {onPolicyData({...policyData, MGU: event.target.value})}}
                    name="MGU" type="text" className="form-control" id="mgu"/>
            </div>

            <div className="mb-3">
                <label htmlFor="carrier" className="form-label">Carrier</label>
                <input value={policyData.Carrier}
                    onChange={(event) => {onPolicyData({...policyData, Carrier: event.target.value})}} 
                    name="Carrier" type="text" className="form-control" id="carrier"/>
            </div>

            <div className="mb-3">
                <label htmlFor="network" className="form-label">Network</label>
                <input value={policyData.Network}
                    onChange={(event) => {onPolicyData({...policyData, Network: event.target.value})}} 
                    name="Network" type="text" className="form-control" id="network"/>
            </div>

            <div className="mb-3">
                <label htmlFor="admintpa" className="form-label">Administrator/TPA</label>
                <input value={policyData.AdminTPA}
                    onChange={(event) => {onPolicyData({...policyData, AdminTPA: event.target.value})}} 
                    name="AdminTPA" type="text" className="form-control" id="admintpa"/>
            </div>

            <div className="mb-3">
                <label htmlFor="mic" className="form-label">Months in Contract</label>
                <input value={policyData.MIC}
                    onChange={(event) => {onPolicyData({...policyData, MIC: event.target.value})}} 
                    name="MIC" type="number" className="form-control" id="mic"/>
            </div>

            <div className="mb-3">
                <label htmlFor="billingtype" className="form-label">Billing Type</label>
                <select value={policyData.BillingType} 
                    onChange={(event) => {onPolicyData({...policyData, BillingType: event.target.value})}}
                    name="BillingType" className="form-select" id="billingtype" aria-label="billingtype">
                    <option value="">Choose...</option>
                    <option value="Census">Census</option>
                    <option value="Self-Bill">Self-Bill</option>
                    <option value="Self-Adjust">Self-Adjust</option>
                </select>
            </div>

            <div className="mb-3">
                <label htmlFor="startdate" className="form-label">Start Date</label>
                <input value={policyData.StartDate}
                    onChange={(event) => {onPolicyData({...policyData, StartDate: event.target.value})}} 
                    name="StartDate" type="month" className="form-control" id="startdate"/>
            </div>

            <h4>Premium Rates</h4>
            <div className="mb-3">
                <label htmlFor="specifictierstruc" className="form-label">Specific Rate Structure</label>
                <select value={policyData.SpecStruct}
                    onChange={(event) => {onPolicyData({...policyData, SpecStruct: event.target.value})}} 
                    name="SpecificTierStruc" className="form-select" id="specifictierstruc" aria-label="specifictierstruc">
                    <option value="">Choose...</option>
                    <option value="4-Tier">4-Tier</option>
                    <option value="2-Tier">2-Tier</option>
                    <option value="1-Tier">1-Tier</option>
                </select>
            </div>
            {policyData.SpecStruct !== "" && policyData.SpecStruct !== "1-Tier" &&
            <div className="col-md-3">
                <label htmlFor="specificee" className="form-label">EE</label>
                <input value={policyData.SpecEE}
                    onChange={(event) => {onPolicyData({...policyData, SpecEE: event.target.value})}} 
                    name="SpecificEE" type="number" className="form-control" placeholder="0" step=".01" id="specificee" aria-label="specificee"/>
            </div>}
            {policyData.SpecStruct !== "" && policyData.SpecStruct === "4-Tier" &&
            <div className="col-md-3">
                <label htmlFor="specifices" className="form-label">ES</label>
                <input value={policyData.SpecES}
                    onChange={(event) => {onPolicyData({...policyData, SpecES: event.target.value})}} 
                    name="SpecificES" type="number" className="form-control" placeholder="0" step=".01" id="specifices"  aria-label="specifices"/>
            </div>}
            {policyData.SpecStruct !== "" && policyData.SpecStruct === "4-Tier" &&
            <div className="col-md-3">
                <label htmlFor="specificec" className="form-label">EC</label>
                <input value={policyData.SpecEC}
                    onChange={(event) => {onPolicyData({...policyData, SpecEC: event.target.value})}} 
                    name="SpecificEC" type="number" className="form-control" placeholder="0" step=".01" id="specificec" aria-label="specificec"/>
            </div>}
            {policyData.SpecStruct !== "" &&
            <div className="col-md-3">
                <label htmlFor="specificef" className="form-label">{policyData.SpecStruct === "1-Tier" ? "Comp" : "EF"}</label>
                <input value={policyData.SpecEF}
                    onChange={(event) => {onPolicyData({...policyData, SpecEF: event.target.value})}} 
                    name="SpecificEF" type="number" className="form-control" placeholder="0" step=".01" id="specificef" aria-label="specificef"/>
            </div>}

            <div className="mb-3">
                <label htmlFor="aggregatetierstruc" className="form-label">Aggregate Rate Structure</label>
                <select value={policyData.AggreStruct}
                    onChange={(event) => {onPolicyData({...policyData, AggreStruct: event.target.value})}} 
                    name="AggregateTierStruc" className="form-select" id="aggregatetierstruc" aria-label="aggregatetierstruc">
                    <option value="">Choose...</option>
                    <option value="4-Tier">4-Tier</option>
                    <option value="2-Tier">2-Tier</option>
                    <option value="1-Tier">1-Tier</option>
                </select>
            </div>
            {policyData.AggreStruct !== "" && policyData.AggreStruct !== "1-Tier" &&
            <div className="col-md-3">
                <label htmlFor="aggregateee" className="form-label">EE</label>
                <input value={policyData.AggreEE}
                    onChange={(event) => {onPolicyData({...policyData, AggreEE: event.target.value})}} 
                    name="AggregateEE" type="number" className="form-control" placeholder="0" step=".01" id="aggregateee" aria-label="aggregateee"/>
            </div>}
            {policyData.AggreStruct !== "" && policyData.AggreStruct === "4-Tier" &&
            <div className="col-md-3">
                <label htmlFor="aggregatees" className="form-label">ES</label>
                <input value={policyData.AggreES}
                    onChange={(event) => {onPolicyData({...policyData, AggreES: event.target.value})}} 
                    name="AggregateES" type="number" className="form-control" placeholder="0" step=".01" id="aggregatees"  aria-label="aggregatees"/>
            </div>}
            {policyData.AggreStruct !== "" && policyData.AggreStruct === "4-Tier" &&
            <div className="col-md-3">
                <label htmlFor="aggregateec" className="form-label">EC</label>
                <input value={policyData.AggreEC}
                    onChange={(event) => {onPolicyData({...policyData, AggreEC: event.target.value})}}
                    name="AggregateEC" type="number" className="form-control" placeholder="0" step=".01" id="aggregateec" aria-label="aggregateec"/>
            </div>}
            {policyData.AggreStruct !== "" &&
            <div className="col-md-3">
                <label htmlFor="aggregateef" className="form-label">{policyData.AggreStruct === "1-Tier" ? "Comp" : "EF"}</label>
                <input value={policyData.AggreEF}
                    onChange={(event) => {onPolicyData({...policyData, AggreEF: event.target.value})}} 
                    name="AggregateEF" type="number" className="form-control" placeholder="0" step=".01" id="aggregateef" aria-label="aggregateef"/>
            </div>}

            <h4>Premium Fees</h4>
            {policyData.PremiumFee.map((pf, index) => {
                return (
                    <React.Fragment key={index}>
                        <div className="col-md-3">
                            <label htmlFor={`description-${index}`} className="form-label">Description</label>
                            <input value={pf.Description}
                                onChange={(event) => {
                                    let newPremiumFee = [...policyData.PremiumFee]
                                    newPremiumFee[index].Description = event.target.value
                                    onPolicyData({...policyData, PremiumFee: newPremiumFee})
                                }}
                                name="Description" type="text" className="form-control" id={`description-${index}`} aria-label={`description-${index}`}/>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor={`item-${index}`} className="form-label">Item</label>
                            <select value={pf.Item}
                                onChange={(event) => {
                                    let newPremiumFee = [...policyData.PremiumFee]
                                    newPremiumFee[index].Item = event.target.value
                                    onPolicyData({...policyData, PremiumFee: newPremiumFee})
                                }}
                                name="Item" className="form-select" id={`item-${index}`} aria-label={`item-${index}`}>
                                <option value="">Choose...</option>
                                {itemOptions.map((item, index) => {
                                    return (
                                        <option key={item.Name} value={item.Name}>{item.Name}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <label htmlFor={`premiumcalc-${index}`} className="form-label">Calculation Method</label>
                            <select value={pf.CalcMethod}
                                onChange={(event) => {
                                    let newPremiumFee = [...policyData.PremiumFee]
                                    newPremiumFee[index].CalcMethod = event.target.value
                                    onPolicyData({...policyData, PremiumFee: newPremiumFee})
                                }} 
                                name="PremiumCalc" className="form-select" id={`premiumcalc-${index}`} aria-label={`premiumcalc-${index}`}>
                                <option value="">Choose...</option>
                                <option value="Flat Fee">Flat Fee</option>
                                <option value="Flat Per Census EE">Flat Per Census EE</option>
                                <option value="Flat Per Census ES">Flat Per Census ES</option>
                                <option value="Flat Per Census EC">Flat Per Census EC</option>
                                <option value="Flat Per Census EF">Flat Per Census EF</option>
                                <option value="Flat Per Census Composite">Flat Per Census Composite</option>
                            </select>
                        </div>
                        <div className="col-md-2">
                            <label htmlFor={`premiumrate-${index}`} className="form-label">Rate</label>
                            <input value={pf.Rate}
                                onChange={(event) => {
                                    let newPremiumFee = [...policyData.PremiumFee]
                                    newPremiumFee[index].Rate = event.target.value
                                    onPolicyData({...policyData, PremiumFee: newPremiumFee})
                                }} 
                                name="PremiumRate" type="number" className="form-control" placeholder="0" step=".01" id={`premiumrate-${index}`} aria-label={`premiumrate-${index}`}/>
                        </div>
                        {policyData.PremiumFee.length === index + 1 &&
                        <div className="col-md-1">
                            <button type="button" className="btn btn-primary btn-small" onClick={() => {addPremiumFee()}} style={{marginTop: "30px"}} >+</button>
                        </div>
                        }

                        {policyData.PremiumFee.length !== 1 && policyData.PremiumFee.length !== index + 1 &&
                        <div className="col-md-1">
                            <button type="button" className="btn btn-danger btn-small" onClick={() => {subPremiumFee(index)}} style={{marginTop: "30px"}} >x</button>
                        </div>
                        }
                    </React.Fragment>
                )
            })}
            

            <h4>Vendor Fees</h4>
            {policyData.VendorFee.map((vf, index) => {
                return(
                <React.Fragment key={index}>
                    <div className="col-md-3">
                        <label htmlFor="vendor" className="form-label">Vendor</label>
                        <select value={vf.Vendor}
                            onChange={(event) => {
                                let newVendorFee = [...policyData.VendorFee]
                                newVendorFee[index].Vendor = event.target.value
                                onPolicyData({...policyData, VendorFee: newVendorFee})
                            }}
                            name="Vendor" className="form-select" id="vendor" aria-label="vendor">
                            <option value="">Choose...</option>
                            {vendorOptions.map((vendor, index) => {
                                return (
                                    <option key={vendor.DispName} value={vendor.DispName}>{vendor.DispName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="account" className="form-label">Account</label>
                        <select value={vf.Account}
                            onChange={(event) => {
                                let newVendorFee = [...policyData.VendorFee]
                                newVendorFee[index].Account = event.target.value
                                onPolicyData({...policyData, VendorFee: newVendorFee})
                            }}
                            name="Account" className="form-select" id="account" aria-label="account">
                            <option value="">Choose...</option>
                            {accountOptions.map((account, index) => {
                                return (
                                    <option key={account.Name} value={account.Name}>{account.Name}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="col-md-3">
                        <label htmlFor="billcalc" className="form-label">Calculation Method</label>
                        <select value={vf.CalcMethod}
                            onChange={(event) => {
                                let newVendorFee = [...policyData.VendorFee]
                                newVendorFee[index].CalcMethod = event.target.value
                                onPolicyData({...policyData, VendorFee: newVendorFee})
                            }} 
                            name="BillCalc" className="form-select" id="billcalc" aria-label="billcalc">
                            <option value="" >Choose...</option>
                            <option value="Flat Fee">Flat Fee</option>
                            <option value="Flat Per Census EE">Flat Per Census EE</option>
                            <option value="Flat Per Census ES">Flat Per Census ES</option>
                            <option value="Flat Per Census EC">Flat Per Census EC</option>
                            <option value="Flat Per Census EF">Flat Per Census EF</option>
                            <option value="Flat Per Census Composite">Flat Per Census Composite</option>
                            <option value="Percent of Premium (Group)">Percent of Premium (Group)</option>
                            <option value="Percent of Premium (Carrier)">Percent of Premium (Carrier)</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <label htmlFor="billrate" className="form-label">Rate</label>
                        <input value={vf.Rate}
                            onChange={(event) => {
                                let newVendorFee = [...policyData.VendorFee]
                                newVendorFee[index].Rate = event.target.value
                                onPolicyData({...policyData, VendorFee: newVendorFee})
                            }} 
                            name="BillRate" type="number" className="form-control" placeholder="0" step=".01" id="billrate" aria-label="billrate"/>
                    </div>

                    {policyData.VendorFee.length === index + 1 &&
                    <div className="col-md-1">
                        <button type="button" className="btn btn-primary btn-small" onClick={() => {addVendorFee()}} style={{marginTop: "30px"}} >+</button>
                    </div>
                    }

                    {policyData.VendorFee.length !== 1 && policyData.VendorFee.length !== index+1 &&
                    <div className="col-md-1">
                        <button type="button" className="btn btn-danger btn-small" onClick={() => {subVendorFee(index)}} style={{marginTop: "30px"}} >x</button>
                    </div>
                    }
                </React.Fragment>
                )
            })}
            
                
            <h4>Source</h4>

            <div className="mb-3">
                <input value={policyData.Source}
                    onChange={(event) => {onPolicyData({...policyData, Source: event.target.value})}} 
                    name="Source" className="form-control" type="file" id="source"/>
            </div>
            
            <div className="col-md-2">
                <button type="submit" form="policyform" value="Submit" className="btn btn-primary" style={{margin: "10px"}}>Submit</button>
            </div>

        </form>
    )
}