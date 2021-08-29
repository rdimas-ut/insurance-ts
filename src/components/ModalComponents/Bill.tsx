export function Bill(props: any) {
    return (
        <form className="row g-3" id="billform">
        <div className="mb-3">
            <label htmlFor="billmonth" className="form-label">Bill Month</label>
            <input type="month" className="form-control" id="billmonth"/>
        </div>

        <div className="col-md-3">
            <label htmlFor="customer" className="form-label">Customer</label>
            <input name="Customer" type="text" className="form-control" id="customer" aria-label="description"/>
        </div>
        <div className="col-md-3">
            <label htmlFor="invoicemonth" className="form-label">Invoice Month</label>
            <input type="month" className="form-control" id="invoicemonth"/>
        </div>
        <div className="col-md-2">
            <label htmlFor="premium" className="form-label">Premium</label>
            <input name="Premium" type="number" className="form-control" placeholder="0" step=".01" id="premium" aria-label="premiumrate"/>
        </div>
        <div className="col-md-1">
            <button type="button" className="btn btn-primary btn-small" onClick={() => {}} style={{marginTop: "30px"}} >+</button>
        </div>
        
        <h4>Lines</h4>
        <a> table here</a>
    </form>
    )
}