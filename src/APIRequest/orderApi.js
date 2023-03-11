// Order API Request
import axios from "axios";
import toast from "react-hot-toast";

export const getPaymentTokenRequest = async ()=>{
    try {
        const {data} = await axios.get(`/braintree-token`);
        return data
    }catch (e) {
        toast.error(e.response.data.error)
    }
}

export const checkoutRequest = async (nonce, cart, shippingAddress)=>{
    try {
        const {data} = await axios.post(`/checkout`, {nonce, cart, shippingAddress});
        return data
    }catch (e) {
        toast.error(e.response.data.error)
        return false
    }
}

export const getOrdersRequest = async ()=>{
    try {
        const {data} = await axios.get(`/orders`);
        return data
    }catch (e) {
        toast.error(e.response.data.error)
        return false
    }
}
export const getOrderDetailsRequest = async (id)=>{
    try {
        const {data} = await axios.get(`/orders/${id}`);
        return data
    }catch (e) {
        toast.error(e.response.data.error)
        return false
    }
}