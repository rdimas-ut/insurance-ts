export interface ModalData{
    CensusForm: CensusForm,
    Policy: PolicyForm,
    Invoice: Invoice,
    Bill: Bill,
}

export interface CensusForm{
    [key: string]: any,
    User: string,
    CovMonth: string,
    EE: string,
    ES: string,
    EC: string,
    EF: string,
    Comp: string,
}

export interface PolicyForm {
    [key: string]: any,
    PID: number,
    MGU: string,
    Carrier: string,
    Network: string,
    AdminTPA: string,
    MIC: string,
    BillingType: string,
    StartDate: string,
    SpecStruct: string,
    SpecEE: string,
    SpecES: string,
    SpecEC: string,
    SpecEF: string,
    AggreStruct: string,
    AggreEE: string,
    AggreES: string,
    AggreEC: string,
    AggreEF: string,
    PremiumFee: Array<PremiumFee>,
    VendorFee: Array<VendorFee>,
    Source: string,
}

export let DefaultVendorFee: VendorFee = {
    BFID: -1,
    Vendor: "",
    Account: "",
    CalcMethod:"",
    Rate: "",
}

export let DefaultPremiumFee: PremiumFee = {
    PFID: -1,
    Description: "",
    Item: "",
    CalcMethod:"",
    Rate: "", 
}

export let DefaultCensusForm: CensusForm = {
    User: "",
    CovMonth: "",
    EE: "0",
    ES: "0",
    EC: "0",
    EF: "0",
    Comp:"0"
}

export let DefaultPolicy: PolicyForm = {
    PID: -1,
    MGU: "",
    Carrier: "",
    Network: "",
    AdminTPA: "",
    MIC: "",
    BillingType: "",
    StartDate: "",
    SpecStruct: "",
    SpecEE: "",
    SpecES: "",
    SpecEC: "",
    SpecEF: "",
    AggreStruct: "",
    AggreEE: "",
    AggreES: "",
    AggreEC: "",
    AggreEF: "",
    PremiumFee: [
        Object.assign({}, DefaultPremiumFee)
    ] as Array<PremiumFee>,
    VendorFee: [
        Object.assign({}, DefaultVendorFee)
    ] as Array<VendorFee>,
    Source: ""
}

export interface PremiumFee {
    [key: string]: any,
    PFID: number,
    Description: string,
    Item: string,
    CalcMethod:string,
    Rate: string,
}

export interface VendorFee {
    [key: string]: any,
    BFID: number,
    Vendor: string,
    Account: string,
    CalcMethod:string,
    Rate: string,
}

export interface Invoice {

}

export interface Bill {

}

export interface Error {

}

