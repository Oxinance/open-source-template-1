import React from "react";


const AddressForm = ({proceedToCheckout}) => {
    return (
        <form style={{display: "block", width: "100%"}}>
            <div style={{marginBottom: 10}}>
                <p className={"payment-label"}>Email Address</p>
                <input placeholder={"Jane@example.com"} className={"payment-input"} type="text" />
            </div>
            <div style={{marginBottom: 10}}>
                <p className={"payment-label"}>Address</p>
                <input placeholder={"Address"} className={"payment-input"} type="text"/>
            </div>
            <div style={{marginBottom: 10}}>
                <p className={"payment-label"}>Apartment, suite, etc.</p>
                <input placeholder={"Address"} className={"payment-input"} type="text"/>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", columnGap: 12}}>
                <div style={{marginBottom: 10, width: "100%"}}>
                    <p className={"payment-label"}>Country</p>
                    <input placeholder={"Address"} className={"payment-input"} type="text"/>
                </div>
                <div style={{marginBottom: 10, width: "100%"}}>
                    <p className={"payment-label"}>Postal Code</p>
                    <input placeholder={"Address"} className={"payment-input"} type="text"/>
                </div>
            </div>
            <button onClick={proceedToCheckout} style={{marginTop: 15}} id="submit">
                <span id="button-text">{false ? <div className="spinner" id="spinner"></div> : "Proceed to checkout"}</span>
            </button>
        </form>
    )
}

export default AddressForm;