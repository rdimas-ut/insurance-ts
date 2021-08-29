import { Modal } from "../Modal";

function Home(props: any) {
    return (
        <div style={{padding: "20px"}} >
            <h1 style={{fontSize: "2,5rem",marginTop: "0"}}>
                Quickbook Controls
            </h1>

            <div style={{display: "inline-flex"}} >
                <button style={{margin: "10px"}} className="btn btn-primary">
                    Sign In
                </button>
                <button style={{margin: "10px"}} className="btn btn-primary">
                    Sign Out
                </button >

                <button style={{margin: "10px"}} className="btn btn-primary">
                    Refresh QBO Data
                </button>

                <button style={{margin: "10px"}} className="btn btn-primary">
                    Export Data
                </button>

                <button style={{margin: "10px"}} className="btn btn-primary">
                    Modal
                </button>
            </div>
        </div>
    )
}

export default Home;