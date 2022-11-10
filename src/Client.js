import axios from "axios";
import {compareArraysAsSet} from "@testing-library/jest-dom/dist/utils";


class Client {

    static apiUrl = "https://api.oxinance.com"

    static addProductToCart(product, amount, callback, errorCallback) {
        axios.post(`${this.apiUrl}/v1/cart/add`, { price: product.default_price.id, amount: amount })
            .then(response => callback(response))
            .catch(error => errorCallback(error))
    }

    static getCart(callback, errorCallback) {
        axios.get(`${this.apiUrl}/v1/cart`)
            .then(response => console.log(response))
            .catch(error => errorCallback(error))
    }

    static getProducts(callback, errorCallback) {
        axios.get(`${this.apiUrl}/v1/products`)
            .then(response => callback(response))
            .catch(error => errorCallback(error))
    }
}

export default Client;