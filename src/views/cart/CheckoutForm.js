import React, { useEffect, useState } from "react";
import {
    PaymentElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js";

import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Client from "../../Client";
import {Badge, CircularProgress} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import Button from "@mui/material/Button";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.

const getFormattedPrice = (amount, currency) => {

    let amountString = `${amount / 100}`
    const splittedString = amountString.split(".");
    if (splittedString.length > 1) {
        if (splittedString[1].length === 1) {
            amountString = amountString + "0";
        }
    }

    const results = {
        eur: `${amountString} €`,
        usd: `$ ${amountString}`,
        gbp: `£ ${amountString}`,
        jpy: `¥ ${amountString}`
    }

    return results[currency];
}

function AlignItemsList({pendentRequests, updatePendentRequests}) {

    const [cartItems, setCartItems] = useState([])
    const [amount, setAmount] = useState(0)

    const updateCartCallback = (response) => {
        setCartItems(response.data)
        let tempAmount = 0;
        response.data.forEach(item => {
            item["deleting"] = false;
            tempAmount = tempAmount + item.object.unit_amount * item.quantity;
        })
        setAmount(tempAmount)
    }

    useEffect(() => {

        const errorCallback = (error) => {
            console.log(error)
        }

        Client.getCart(updateCartCallback, errorCallback)
    }, [])

    const removeItemFromCart = (cartItem) => {

        const errorCallback = (error) => {
            cartItem["deleting"] = false;
        }
        cartItem["deleting"] = true;
        setPendentRequests((pendentRequests) => ++pendentRequests)
        Client.deleteCartPrice(cartItem.object.id, updateCartCallback, errorCallback)
    }

    return (
            <List sx={{ width: '100%', bgcolor: 'white', borderRadius: "0px 0px 5px 5px" }}>
                {cartItems.map((cartItem) => {
                    return (
                        <>
                            <ListItem
                                secondaryAction={
                                    <div style={{display: "flex"}}>
                                        <p>{getFormattedPrice(cartItem.quantity * cartItem.object.unit_amount, cartItem.object.currency)}</p>
                                        {cartItem["deleting"] ? <CircularProgress style={{marginLeft: 10, height: 24, width: 24}} />
                                        : <CloseIcon onClick={() => removeItemFromCart(cartItem)} className={"close-icon-button"}/> }
                                    </div>
                                }
                                alignItems="flex-start">
                                <ListItemAvatar style={{border: "1px solid lightgray", borderRadius: 3}}>
                                    <Badge color="info" badgeContent={cartItem.quantity}>
                                        <Avatar style={{width: 100, height: 100, borderRadius: 0}} alt="Remy Sharp" src={cartItem.object.product.images[0]} />
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    style={{marginLeft: 20}}
                                    primary={cartItem.object.product.name}
                                />
                            </ListItem>
                            <Divider component="li" />
                        </>
                    )
                })}
                <p style={{marginTop: 10}}>Total: {getFormattedPrice(amount, cartItems)}</p>
            </List>
    );
}

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [pendentRequests, setPendentRequests] = useState(0)

    const [message, setMessage] = useState(null);
    const [form, setForm] = useState("ADDRESS_FORM")
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );

        if (!clientSecret) {
            return;
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong.");
                    break;
            }
        });
    }, [stripe]);

    const generateForm = () => {
        if (form === "ADDRESS_FORM") {
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
                    <div style={{display: "flex", columnGap: 12}}>
                        <div style={{marginBottom: 10}}>
                            <p className={"payment-label"}>Country</p>
                            <input placeholder={"Address"} className={"payment-input"} type="text"/>
                        </div>
                        <div style={{marginBottom: 10}}>
                            <p className={"payment-label"}>Postal Code</p>
                            <input placeholder={"Address"} className={"payment-input"} type="text"/>
                        </div>
                    </div>
                    <button style={{marginTop: 15}} disabled={} id="submit">
                        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Proceed to checkout"}</span>
                    </button>
                </form>
            )
        } else if (form === "CHECKOUT_FORM") {
            return (
                <form id="payment-form" onSubmit={handleSubmit}>
                    <PaymentElement id="payment-element" />
                    <button disabled={isLoading || !stripe || !elements} id="submit">
                        <span id="button-text">{isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}</span>
                    </button>
                    {/* Show any error or success messages */}
                    {message && <div id="payment-message">{message}</div>}
                </form>
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: "http://localhost:3000",
            },
        });

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);
    };

    return (
        <div className={"checkout-form"}>
            <AlignItemsList/>
            {generateForm()}
        </div>
    );
}
