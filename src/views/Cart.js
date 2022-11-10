import {useEffect} from "react";
import Client from "../Client";


const Cart = () => {

    useEffect(() => {
        Client.getCart()
    }, [])

    return (
        <p>CART</p>
    )
}

export default Cart;