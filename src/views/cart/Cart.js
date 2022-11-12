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

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51K9jweCqicEaleYSVRY4sveoKeqRArJNS4iPh3PutWsH0afSOkTFqDjbBjxIkeAJVAY0scyFo3zIm3L7ccZlMg7V00oJgdKICr", {stripeAccount: "acct_1LvUjfCj6RTtxjtc"});


function AlignItemsList() {

    const [cartItems, setCartItems] = useState([])

    useEffect(() => {

        const callback = (response) => {
            console.log(response)
            setCartItems(response.data)
            let amount = 0;
            response.data.map(item => {
                amount = 0;
            })
        }

        const errorCallback = (error) => {
            console.log(error)
        }

        Client.getCart(callback, errorCallback)
    }, [])

    return (
        <div style={{borderRadius: "5px 5px 5px 5px"}} className={"cart-display"}>
            <p style={{background: "#5469d4", color: "white", padding: 5, borderRadius: "5px 5px 0px 0px"}}>Your cart</p>
            <List sx={{ width: '100%', bgcolor: 'white', padding: 5, borderRadius: "0px 0px 5px 5px" }}>
                {cartItems.map((cartItem) => {
                    return (
                        <>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar style={{width: 100, height: 100, borderRadius: 0}} alt="Remy Sharp" src={cartItem.product.images[0]} />
                                </ListItemAvatar>
                                <ListItemText
                                    style={{marginLeft: 20}}
                                    primary="Brunch this weekend?"
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                Ali Connors
                                            </Typography>
                                            {" — I'll be in your neighborhood doing errands this…"}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider component="li" />
                        </>
                    )
                })}
                <p style={{marginTop: 10}}>Total: </p>
            </List>
        </div>
    );
}

export default function Cart() {
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios.get("https://api.oxinance.com/v1/stripe/payment-intent").then((response) => {
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
                    <div style={{display: "flex", alignContent: "space-around"}}>
                        <AlignItemsList/>
                        <CheckoutForm />
                    </div>
                </Elements>
            )}
        </div>
    );
}
