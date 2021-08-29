export interface AppData {
    Customer: Array<Customer>,
    Vendor: Array<Vendor>,
    Item: Array<Item>,
    Account: Array<Account>,
    Policy: Array<Policy>,
    CensusFee:Array<CensusFee>,
    PremiumFee: Array<PremiumFee>,
    BillFee: Array<BillFee>,
    Census: Array<Census>,
    Adjustment: Array<Adjustment>,
    Bill: Array<object>,
    Invoice: Array<Invoice>,
    BillLine: Array<object>,
}


export interface Customer {
    [key: string]: any,
    DispName: string,
}

export interface Vendor {
    [key: string]: any,
    DispName: string,
}

export interface Account {
    [key: string]: any,
    Name: string,
}

export interface Item {
    [key: string]: any,
    Name: string,
}

export interface Policy {
    [key: string]: any,
    PID?: number,
    Customer: string,
    MGU: string,
    Carrier: string,
    Network: string,
    AdminTPA: string,
    MIC: number,
    StartMonth: number,
    StartYear: number,
    Source: string,
    BillingType: string,
}

export interface CensusFee {
    [key: string]: any,
    PID?: number,
    TierStruct: string,
    Type: string,
    EE: number,
    ES: number,
    EC: number,
    EF: number,
}

export interface PremiumFee {
    [key: string]: any,
    PFID?: number,
    PID?: number,
    Item: string,
    Description: string,
    Calc: string,
    Rate: number,
}

export interface BillFee {
    [key: string]: any,
    BFID?: number,
    PID?: number,
    Account: string,
    Vendor: string,
    Calc: string,
    Rate: number,
}

export interface Census {
    [key: string]: any,
    Customer: string,
    EE: number,
    ES: number,
    EC: number,
    EF: number,
    InvMonth: number,
    InvYear: number,
    CovMonth: number,
    CovYear: number,
    Status: string,
}

export interface Adjustment {
    [key: string]: any,
    Customer: string,
    EE: number,
    ES: number,
    EC: number,
    EF: number,
    CovMonth: number,
    CovYear: number,
    Status: string,
}

export interface Invoice {
    [key: string]: any,
    IID: number,
    InvNum: string,
    InvMonth: number,
    InvYear: number,
    Customer: string,
    TotalDue: number,
    Balance: number,
}

export interface CensusLog {
    [key: string]: any,
    Customer: string,
    EE: number,
    ES: number,
    EC: number,
    EF: number,
    DTS: number,
    InvMonth: number,
    InvYear: number,
    CovMonth: number,
    CovYear: number,
    Status: string,
    User: string,
}

export interface CensusLogActual {
    [key: string]: any,
    Customer: string,
    EE: number,
    ES: number,
    EC: number,
    EF: number,
    DTS: number,
    CovMonth: number,
    CovYear: number,
    Status: string,
    User: string,
}
