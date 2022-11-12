import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Cart.css";
import axios from "axios";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51K9jweCqicEaleYSVRY4sveoKeqRArJNS4iPh3PutWsH0afSOkTFqDjbBjxIkeAJVAY0scyFo3zIm3L7ccZlMg7V00oJgdKICr", {stripeAccount: "acct_1LvUjfCj6RTtxjtc"});

export default function Cart() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.get("http://localhost:8000/v1/stripe/payment-intent").then((response) => {
            console.log(response)
            setClientSecret(response.data.client_secret)
        })
            .then(error => console.log(error.response))
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };

    return (
        <div className="App">
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    );
}
