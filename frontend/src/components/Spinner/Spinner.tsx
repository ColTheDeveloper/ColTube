import "./Spinner.css"

const Spinner=()=>{
    return(
        <div className="Loading">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Spinner;