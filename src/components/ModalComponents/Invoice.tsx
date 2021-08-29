export function Invoice(props: any) {
    return (
        <form className="row g-3" id="invoiceform">
            <div className="mb-3">
                <label htmlFor="policy" className="form-label">Policy</label>
                <input type="text" className="form-control" id="policy" placeholder="Carrier-MMMM-YYYY" disabled/>
            </div>
            <div className="mb-3">
                <label htmlFor="billingtype" className="form-label">Billing Type</label>
                <input type="text" className="form-control" id="billingtype" placeholder="Census/Self-Bill/Self-Adjust" disabled/>
            </div>

            <div className="mb-3">
                <label htmlFor="invoicemonth" className="form-label">Ivoice Month</label>
                <input type="month" className="form-control" id="invoicemonth" />
            </div>

            <h4>Census</h4>
            <div className="col-md-2">
                <label htmlFor="ee" className="form-label">EE</label>
                    <input type="number" className="form-control" id="ee" placeholder="0" aria-label="First name"/>
            </div>
            <div className="col-md-2">
                <label htmlFor="es" className="form-label">ES</label>
                <input type="number" className="form-control" id="es" placeholder="0" aria-label="Last name"/>
            </div>
            <div className="col-md-2">
                <label htmlFor="ec" className="form-label">EC</label>
                <input type="number" className="form-control" id="ec" placeholder="0" aria-label="Last name"/>
            </div>
            <div className="col-md-2">
                <label htmlFor="ef" className="form-label">EF/Comp</label>
                <input type="number" className="form-control" id="ef" placeholder="0" aria-label="Last name"/>
            </div>
            <div className="col-md-2">
                <label htmlFor="comp" className="form-label">Composite</label>
                <input type="number" className="form-control" id="comp" placeholder="0" aria-label="Last name" disabled/>
            </div>

            
            <h4>Lines</h4>
            <a> table here</a>
        </form>
    )
}