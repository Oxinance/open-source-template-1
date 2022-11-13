import React, {useEffect, useState} from "react";
import Client from "../../Client";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import {Badge, CircularProgress, Skeleton} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";


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

const CartList = ({pendentRequests, updatePendentRequests}) => {

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
        updatePendentRequests((pendentRequests) => ++pendentRequests)
        Client.deleteCartPrice(cartItem.object.id, updateCartCallback, errorCallback)
    }

    return (
        <List sx={{ width: '100%', bgcolor: 'white', borderRadius: "0px 0px 5px 5px" }}>
            {cartItems.map((cartItem) => {
                return (
                    <>
                        <ListItem
                            alignItems="flex-start">
                            <Skeleton style={{borderRadius: 3}} variant="q">
                                <Badge color="info" badgeContent={cartItem.quantity}>
                                    <Avatar style={{width: 100, height: 100, borderRadius: 0}} alt="Remy Sharp" src={cartItem.object.product.images[0]} />
                                </Badge>
                            </Skeleton>
                            <ListItemText
                                primary={<Skeleton style={{marginLeft: 20}}><p>SKELETON EXAMPLE TEXT</p></Skeleton>}
                                secondary={<Skeleton style={{marginLeft: 20}}><p>Quantity: 1</p></Skeleton>}
                            />
                        </ListItem>
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
                                secondary={<p>Quantity: {cartItem.quantity}</p>}
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

export default CartList;