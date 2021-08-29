import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./components/Sidebar";
import Display from "./components/Display";
import { Modal } from "./components/Modal"
import { SideOption, CustDVOption, VendDVOption, ModalOption } from "./logic/Options"
import { select, postForm } from "./logic/AzureRequest";
import { AppData, Customer, Vendor, Item, Account, Policy,  CensusFee, BillFee, PremiumFee, Census, Adjustment, Invoice, CensusLogActual} from  "./logic/AppData";
import { ModalData, CensusForm, PolicyForm , DefaultCensusForm, DefaultPolicy, Bill, PremiumFee as PremiumFeeForm, DefaultPremiumFee, VendorFee, DefaultVendorFee } from  "./logic/ModalData";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal as BootModal} from "bootstrap";
// import { ipcRenderer } from 'electron'
import "./App.css";

export function App() {

  // Sidebar selection state. Can range from home, customers, or vendors
  const [sideSelect, setSideSelect] = useState(SideOption.Home);

  // Customer and Vendor selected to work on.
  const [custSelect, setCustSelect] = useState("");
  const [vendSelect, setVendSelect] = useState("");

  // This keeps the state of a detail view for  customer or vendor.
  // So when the user changes to a different tab the app will remember
  const [custDVSelect, setCustDVSelect] = useState(CustDVOption.Invoices);
  const [vendDVSelect, setVendDVSelect] = useState(VendDVOption.Bills);

  // All app data stored in the azure blob storage database 
  const [appData, setAppData] = useState<AppData>({
    Customer: [] as Array<Customer>,
    Vendor: [] as Array<Vendor>,
    Item: [] as Array<Item>,
    Account: [] as Array<Account>,
    Policy: [] as Array<Policy>,
    CensusFee:[] as Array<CensusFee>,
    PremiumFee: [] as Array<PremiumFee>,
    BillFee: [] as Array<BillFee>,
    Census: [] as Array<Census>,
    Adjustment: [] as Array<Adjustment>,
    Bill: [] as Array<Object>,
    Invoice: [] as Array<Invoice>,
    BillLine: [] as Array<Object>
  });

  const appDataRef= useRef(appData);
  appDataRef.current = appData;

  // Modal data being use in the modal and which modal is currently selected(doesn't mean its shown)
  const [modalData, setModalData] = useState<ModalData>({
    CensusForm: DefaultCensusForm as CensusForm,
    Policy: DefaultPolicy as PolicyForm,
    Invoice: {},
    Bill: {},
  });
  const [modalSelect, setModalSelect] = useState(ModalOption.Error);

  // Modal form state of disabled or abled
  const [censusFormDisabled, setCensusFormDisabled] = useState(false)

  const handleCensusForm = () => {
    let form_values: CensusLogActual = {
      Customer: custSelect,
      EE: parseInt(modalData.CensusForm.EE),
      ES: parseInt(modalData.CensusForm.ES),
      EC: parseInt(modalData.CensusForm.EC),
      EF: parseInt(modalData.CensusForm.EF),
      DTS: Date.now(),
      CovMonth: parseInt(modalData.CensusForm.CovMonth.split('-')[1]),
      CovYear: parseInt(modalData.CensusForm.CovMonth.split('-')[0]),
      Status: "Actual",
      User: modalData.CensusForm.User
    }

    let form_data = {
      form_type: "Census",
      form_values: form_values
    }

    // Hides the modal after the formsubmt has been performed
    let onlyModal =  BootModal.getInstance(document.getElementById("staticBackdrop"))
    onlyModal.hide()

    postForm(form_data)
    .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    })

    select(`select * from ${"Census"}`).then((data) => {
      if (data instanceof Array) {
        setAppData({
          ...appDataRef.current,
          ["Census"]: data
        })
      }
    })
  }

  const handlePolicyForm = () => {
    interface PolicyFormSubmit {
      Policy: Policy,
      CensusFees: Array<CensusFee>,
      PremiumFees: Array<PremiumFee>,
      BillFees: Array<BillFee>
    }

    let processedPolicy: Policy = {
      Customer: custSelect,
      MGU: modalData.Policy.MGU,
      Carrier: modalData.Policy.Carrier,
      Network: modalData.Policy.Network,
      AdminTPA: modalData.Policy.AdminTPA,
      MIC: !isNaN(parseInt(modalData.Policy.MIC)) ? parseInt(modalData.Policy.MIC) : 0,
      StartMonth: !isNaN(parseInt(modalData.Policy.StartDate.split('-')[1])) ? parseInt(modalData.Policy.StartDate.split('-')[1]) : 1,
      StartYear: !isNaN(parseInt(modalData.Policy.StartDate.split('-')[0])) ? parseInt(modalData.Policy.StartDate.split('-')[0]): 0,
      Source: modalData.Policy.Source,
      BillingType: modalData.Policy.BillingType,
    }
    if (modalData.Policy.PID !== -1) {
      processedPolicy["PID"] = modalData.Policy.PID
    }
    console.log(processedPolicy)

    let processedCensusFees: Array<CensusFee> = []

    if ((modalData.Policy.SpecEE !== "" ||  modalData.Policy.SpecES !== "" ||
    modalData.Policy.SpecEC !== "" || modalData.Policy.SpecEF !== "") && modalData.Policy.SpecStruct !== "") {
      let SpecCensusFee: CensusFee = {
        TierStruct: modalData.Policy.SpecStruct,
        Type: "Specific",
        EE: !isNaN(parseFloat(modalData.Policy.SpecEE)) ? parseFloat(modalData.Policy.SpecEE) : 0,
        ES: !isNaN(parseFloat(modalData.Policy.SpecES)) ? parseFloat(modalData.Policy.SpecES) : 0,
        EC: !isNaN(parseFloat(modalData.Policy.SpecEC)) ? parseFloat(modalData.Policy.SpecEC) : 0,
        EF: !isNaN(parseFloat(modalData.Policy.SpecEF)) ? parseFloat(modalData.Policy.SpecEF) : 0,
      }
      if (modalData.Policy.PID !== -1) {
        SpecCensusFee["PID"] = modalData.Policy.PID
      }
      processedCensusFees.push(SpecCensusFee)
    }

    if ((modalData.Policy.AggreEE !== "" ||  modalData.Policy.AggreES !== "" ||
    modalData.Policy.AggreEC !== "" || modalData.Policy.AggreEF !== "") && modalData.Policy.AggreStruct !== "") {
      let AggreCensusFee: CensusFee =  {
        TierStruct: modalData.Policy.AggreStruct,
        Type: "Aggregate",
        EE: !isNaN(parseFloat(modalData.Policy.AggreEE)) ? parseFloat(modalData.Policy.AggreEE) : 0,
        ES: !isNaN(parseFloat(modalData.Policy.AggreES)) ? parseFloat(modalData.Policy.AggreES) : 0,
        EC: !isNaN(parseFloat(modalData.Policy.AggreEC)) ? parseFloat(modalData.Policy.AggreEC) : 0,
        EF: !isNaN(parseFloat(modalData.Policy.AggreEF)) ? parseFloat(modalData.Policy.AggreEF) : 0,
      }
      if (modalData.Policy.PID !== -1) {
        AggreCensusFee["PID"] = modalData.Policy.PID
      }
      processedCensusFees.push(AggreCensusFee)
    }

    let processedPremiumFees: Array<PremiumFee> = []

    modalData.Policy.PremiumFee.forEach((pf, index) => {
      if (pf.Item !== "" && pf.Description !== "" && pf.CalcMethod !== "" && pf.Rate !== "") {
        let inPF: PremiumFee = {
          Item: pf.Item,
          Description: pf.Description,
          Calc: pf.CalcMethod,
          Rate:  !isNaN(parseFloat(pf.Rate)) ? parseFloat(pf.Rate) : 0,
        }
  
        if (modalData.Policy.PID !== -1) {
          inPF["PID"] = modalData.Policy.PID
        }
  
        if (pf.PFID !== -1) {
          inPF["PFID"] = pf.PFID
        }
        processedPremiumFees.push(inPF)
      }
    })

    let processedBillFees: Array<BillFee> = []

    modalData.Policy.VendorFee.forEach((vf, index) => {
      if (vf.Account !== "" && vf.Vendor !== "" && vf.CalcMethod !== "" && vf.Rate !== "") {
        let inBF: BillFee = {
          Account: vf.Account,
          Vendor: vf.Vendor,
          Calc: vf.CalcMethod,
          Rate: !isNaN(parseFloat(vf.Rate)) ? parseFloat(vf.Rate) : 0,
        }
  
        if (modalData.Policy.PID !== -1) {
          inBF["PID"] = modalData.Policy.PID
        }
  
        if (vf.BFID !== -1) {
          inBF["PFID"] = vf.BFID
        }
        processedBillFees.push(inBF)
      }
    })
    
    let processedFormValues: PolicyFormSubmit = {
      Policy: processedPolicy,
      CensusFees: processedCensusFees,
      PremiumFees: processedPremiumFees,
      BillFees: processedBillFees,
    }

    let form_data = {
      form_type: "Policy",
      form_values: processedFormValues
    }

    // Hides the modal after the formsubmt has been performed
    let onlyModal =  BootModal.getInstance(document.getElementById("staticBackdrop"))
    onlyModal.hide()

    postForm(form_data)
    .then(data => {
    console.log(data); // JSON data parsed by `data.json()` call
    })

    // Reloads data after it was submitted to database
    let tableNames: Array<string> = ["Policy", "CensusFee", "PremiumFee", "BillFee"]
    
    const promises = tableNames.map(async (tname, index) => {
      console.log(`Running request for table ${tname}`)
      let data = await select(`select * from ${tname}`)
        console.log(data);
        console.log({
          ...appDataRef.current,
          [tname]: data
        })
        if (data instanceof Array) {
          setAppData({
            ...appDataRef.current,
            [tname]: data
          })
        }
    })

    async function getData(promises: Array<Promise<any>>) {
      await Promise.all(promises)
    }
        
    getData(promises)
  }

  const handleForm = (form_type: string) => {
    if (form_type === "census") {
      handleCensusForm()
    } else if (form_type === "policy") {
      handlePolicyForm()
    } else { 
      console.log("No form configuration exist")
    }
  }

  const handleCensusSelect = (covDate: string) => {
    let month: Array<string> = ["January", "Febuary", "March", "April", 
                                    "May", "June", "July", "August", "September",
                                    "October", "November", "December"]

    let covYear = parseInt(covDate.split("-")[1])
    let covMonth = month.indexOf(covDate.split("-")[0]) + 1

    let newCovDate: string;
    if (covMonth < 10) {
      newCovDate = `${String(covYear)}-0${String(covMonth)}`
    } else {
      newCovDate = `${String(covYear)}-${String(covMonth)}`
    }

    // Finds the selected census entry
    let censusSelected = appData.Census.filter((cen, index) => 
      cen.CovMonth === covMonth && 
      cen.CovYear === covYear && 
      cen.Status === "Actual" && 
      cen.Customer === custSelect)[0]
    let newCensusForm: CensusForm = {
      User: "",
      EE: String(censusSelected.EE),
      ES: String(censusSelected.ES),
      EC: String(censusSelected.EC),
      EF: String(censusSelected.EF),
      Comp: "0",
      CovMonth: newCovDate,
    }

    setModalData({...modalData, CensusForm: newCensusForm})
    setModalSelect(ModalOption.Census);
    setCensusFormDisabled(true);
    let onlyModal =  new BootModal("#staticBackdrop")
    onlyModal.show()
  }

  const handlePolicySelect = (pid: number) => {
    let selectedPolicy = appData.Policy.filter((pol, index) => {
      return pol.PID === pid
    })[0]

    let selectedCensusFees = appData.CensusFee.filter((cf, index) => {
      return cf.PID === pid
    })

    let selectedPremiumFee = appData.PremiumFee.filter((pf, index) => {
      return pf.PID === pid
    })

    let selectedBillFee = appData.BillFee.filter((bf, index) => {
      return bf.PID === pid
    })

    let newPolicyModalData: PolicyForm = Object.assign({}, DefaultPolicy)

    let startYear = selectedPolicy.StartYear
    let startMonth = selectedPolicy.StartMonth

    let newStartDate: string;
    if (startMonth < 10) {
      newStartDate = `${String(startYear)}-0${String(startMonth)}`
    } else {
      newStartDate = `${String(startYear)}-${String(startMonth)}`
    }
    // Sets policy data to the modal
    newPolicyModalData.PID = selectedPolicy.PID
    newPolicyModalData.MGU = selectedPolicy.MGU
    newPolicyModalData.Network = selectedPolicy.Carrier
    newPolicyModalData.Carrier = selectedPolicy.Carrier
    newPolicyModalData.AdminTPA = selectedPolicy.AdminTPA
    newPolicyModalData.MIC = String(selectedPolicy.MIC)
    newPolicyModalData.BillingType = selectedPolicy.BillingType
    newPolicyModalData.StartDate = newStartDate
    newPolicyModalData.Source = selectedPolicy.Source

    selectedCensusFees.forEach((cf, index) => {
      if (cf.TierStruct !== "" && cf.Type === "Specific") {
        newPolicyModalData.SpecStruct = cf.TierStruct
        newPolicyModalData.SpecEE = String(cf.EE)
        newPolicyModalData.SpecES = String(cf.ES)
        newPolicyModalData.SpecEC = String(cf.EC)
        newPolicyModalData.SpecEF = String(cf.EF)
      }

      if (cf.TierStruct !== "" && cf.Type === "Aggregate") {
        newPolicyModalData.AggreStruct = cf.TierStruct
        newPolicyModalData.AggreEE = String(cf.EE)
        newPolicyModalData.AggreES = String(cf.ES)
        newPolicyModalData.AggreEC = String(cf.EC)
        newPolicyModalData.AggreEF = String(cf.EF)
      }
    })

    let newPremiumFeeData: Array<PremiumFeeForm> = []
    selectedPremiumFee.forEach((pf, index) => {
      newPremiumFeeData.push({
        PFID: pf.PFID,
        Description: pf.Description,
        Item: pf.Item,
        CalcMethod: pf.Calc,
        Rate: String(pf.Rate),
      })
    })
    newPremiumFeeData.push(Object.assign({}, DefaultPremiumFee))

    let newBillFee: Array<VendorFee> = []
    selectedBillFee.forEach((bf, index) => {
      newBillFee.push({
        BFID: bf.BFID,
        Vendor: bf.Vendor,
        Account: bf.Account,
        CalcMethod: bf.Calc,
        Rate: String(bf.Rate),
      })
    })
    newBillFee.push(Object.assign({}, DefaultVendorFee))

    newPolicyModalData.PremiumFee = newPremiumFeeData
    newPolicyModalData.VendorFee = newBillFee

    setModalData({...modalData, Policy:newPolicyModalData})
    setModalSelect(ModalOption.Policy);
    let onlyModal =  new BootModal("#staticBackdrop")
    onlyModal.show()
  }

  // Use Effect Hooks
  useEffect(() => {
    let tableNames: Array<string> = ["Customer", "Vendor", "Item", "Account", 
                                     "Policy", "CensusFee", "PremiumFee", "BillFee",
                                     "Census", "Adjustment", "Bill", "Invoice", "BillLine"]
    
    const promises = tableNames.map(async (tname, index) => {
      console.log(`Running request for table ${tname}`)
      let data = await select(`select * from ${tname}`)
        console.log(data);
        console.log({
          ...appDataRef.current,
          [tname]: data
        })
        if (data instanceof Array) {
          setAppData({
            ...appDataRef.current,
            [tname]: data
          })
        }
    })
    async function getData(promises: Array<Promise<any>>) {
      await Promise.all(promises)
    }
    getData(promises)

    // const getSelect = async (selectCommd: string, tname: string) => {
    //   try {
    //     const data = await ipcRenderer.invoke("select", selectCommd);
    //     setAppData({
    //       ...appDataRef.current,
    //       [tname]: data
    //     });
    //   } catch (err) {
    //     console.error(err);
    //   }
    // };

    // tableNames.forEach((tname, index) => {
    //   getSelect(`select * from ${tname}`, tname)
    // })

  }, [])

  useEffect(() => {
    if (custDVSelect == CustDVOption.Back) {
      setCustSelect("");
      setCustDVSelect(CustDVOption.Invoices)
    }

    if (vendDVSelect == VendDVOption.Back) {
      setVendSelect("");
      setVendDVSelect(VendDVOption.Bills)
    }
  })

  // Calculates the composite for the census modal
  useEffect(() => {
    let ee: number = +modalData.CensusForm.EE;
    let es: number = +modalData.CensusForm.ES;
    let ec: number = +modalData.CensusForm.EC;
    let ef: number = +modalData.CensusForm.EF;

    let comp: string = (ee + es + ec + ef).toString();
    setModalData({...modalData, CensusForm: {...modalData.CensusForm, Comp: comp}})
  }, [modalData.CensusForm.ES, modalData.CensusForm.EC, modalData.CensusForm.EE, modalData.CensusForm.EF])

  return (
    <React.Fragment>
      <Sidebar sideSelect={sideSelect} onSideSelect={setSideSelect} />
      <Display
        onPolicySelect={handlePolicySelect}
        modalData={modalData}
        setModalData={setModalData} 
        sideSelect={sideSelect}
        onModalSelect={setModalSelect}
        custSelect={custSelect} 
        onCustSelect={setCustSelect}
        custDVSelect={custDVSelect} 
        onCustDVSelect={setCustDVSelect}
        vendSelect={vendSelect}
        onVendSelect={setVendSelect}
        vendDVSelect={vendDVSelect}
        onVendDVSelect={setVendDVSelect}
        onCensusSelect={handleCensusSelect}
        censusFormDisabled={censusFormDisabled}
        onCensusFormDisabled={setCensusFormDisabled}
        appData={appData}
      />
      <Modal
        accountOptions={appData.Account}
        itemOptions={appData.Item}
        vendorOptions={appData.Vendor}
        onForm={handleForm}
        censusData={modalData.CensusForm}
        modalSelect={modalSelect}
        modalData={modalData}
        onModalData={setModalData}
        censusFormDisabled={censusFormDisabled}
        onCensusFormDisabled={setCensusFormDisabled}
        />
    </React.Fragment>
  );
}
