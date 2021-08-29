import { CensusForm } from "../../logic/ModalData";

interface CensusProps {
    onForm: any,
    censusModalData: CensusForm,
    onCensusModalData: React.Dispatch<React.SetStateAction<CensusForm>>,
    censusFormDisabled: boolean,
    onCensusFormDisabled: React.Dispatch<React.SetStateAction<boolean>>
}

export function Census(props: CensusProps) {
    const {
        onForm, 
        censusModalData, 
        onCensusModalData,
        censusFormDisabled,
        onCensusFormDisabled,
    } = props;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        event.currentTarget.checkValidity()
        onForm("census")
    }

    return (
        <form onSubmit={handleSubmit} id="censusform">
            <div className="mb-3">
            <label htmlFor="user" className="form-label">User</label>
            <input value={censusModalData.User} 
                onChange={(event) => {onCensusModalData({...censusModalData, User: event.target.value})}}
                disabled={censusFormDisabled}
                type="text" className="form-control" id="user" placeholder="First Last" required />
            </div>

            <div className="mb-3">
            <label htmlFor="coverage-month" className="form-label">Coverage Month</label>
            <input value={censusModalData.CovMonth} 
                onChange={(event) => {onCensusModalData({...censusModalData, CovMonth: event.target.value})}}
                disabled={censusFormDisabled}
                type="month" className="form-control" id="coverage-month" required />
            </div>

            <div className="row g-3">
                <div className="col-md-2">
                    <label htmlFor="ee" className="form-label">EE</label>
                    <input value={censusModalData.EE} 
                        onChange={(event) => {onCensusModalData({...censusModalData, EE: event.target.value})}} 
                        disabled={censusFormDisabled}
                        type="number" className="form-control" placeholder="0" id="ee" aria-label="ee"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="es" className="form-label">ES</label>
                    <input value={censusModalData.ES} 
                        onChange={(event) => {onCensusModalData({...censusModalData, ES: event.target.value})}}
                        disabled={censusFormDisabled}
                        type="number" className="form-control" placeholder="0" id="es" aria-label="es"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="ec" className="form-label">EC</label>
                    <input value={censusModalData.EC} 
                        onChange={(event) => {onCensusModalData({...censusModalData, EC: event.target.value})}}
                        disabled={censusFormDisabled}
                        type="number" className="form-control" placeholder="0" id="ec" aria-label="ec"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="ef" className="form-label">EF/Comp</label>
                    <input value={censusModalData.EF} 
                        onChange={(event) => {onCensusModalData({...censusModalData, EF: event.target.value})}}
                        disabled={censusFormDisabled}
                        type="number" className="form-control" placeholder="0" id="ef" aria-label="ef"/>
                </div>
                <div className="col-md-2">
                    <label htmlFor="comp" className="form-label">Composite</label>
                    <input value={censusModalData.Comp} 
                        onChange={(event) => {onCensusModalData({...censusModalData, Comp: event.target.value})}}
                        disabled
                        type="number" className="form-control" placeholder="0" id="comp" aria-label="comp"/>
                </div>
            </div>
            <div className="row g-3" style={{paddingTop: "20px"}} >
                {!censusFormDisabled &&
                <div className="col-md-2">
                    <button type="submit" form="censusform" value="Submit" className="btn btn-primary" style={{margin: "10px"}}>Submit</button>
                </div>}
                {censusFormDisabled &&
                <div className="col-md-2">
                    <button onClick={() => {onCensusFormDisabled(false)}} type="button" className="btn btn-primary" style={{margin: "10px"}}>Edit</button>
                </div>}
            </div>
        </form>
    )
}