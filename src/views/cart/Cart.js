import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./Cart.css";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Client from "../../Client";
import {Checkbox} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CartList from "./CartList";
import AddressForm from "./AddressForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51K9jweCqicEaleYSVRY4sveoKeqRArJNS4iPh3PutWsH0afSOkTFqDjbBjxIkeAJVAY0scyFo3zIm3L7ccZlMg7V00oJgdKICr", {stripeAccount: "acct_1LvUjfCj6RTtxjtc"});

export default function Cart() {

    const [displayCheckoutForm, setDisplayCheckoutForm] = useState(false);
    const [displaySkeleton, setDisplaySkeleton] = useState(true)
    const [clientSecret, setClientSecret] = useState(null);

    const proceedToCheckout = (event) => {
        event.preventDefault();
        axios.get("https://api.oxinance.com/v1/stripe/payment-intent").then((response) => {
            console.log(response)
            setClientSecret(response.data.client_secret)
            setDisplayCheckoutForm(true)
        })
            .then(error => console.log(error.response))
    }

    const appearance = {
        theme: 'stripe',
    };
    const options = {
        clientSecret,
        appearance,
    };
    console.log(options)
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", width: "100%", marginTop: 100, marginBottom: 200}}>
            <div className={"checkout-form"}>
                <CartList/>
                {displayCheckoutForm ? <Elements options={options} stripe={stripePromise}><CheckoutForm clientSecret={clientSecret}/></Elements> : <AddressForm proceedToCheckout={proceedToCheckout}/>}
            </div>
        </div>
    );
}
