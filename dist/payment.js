import axios from "axios";
import { headers } from "./config.js";
import { PAYMENT_BASE_URL } from "./config.js";
export const initializeTransaction = async (email, amount, metadata) => {
    try {
        const response = await axios.post(`${PAYMENT_BASE_URL}/transaction/initialize`, {
            email,
            amount: amount * 100,
            callback_url: "http://kingslayer.space",
            metadata,
        }, { headers });
        return response.data;
    }
    catch (error) {
        console.log("error in initialize ==========> ", error);
    }
};
export const verifyTransaction = async (reference) => {
    try {
        const response = await axios.get(`${PAYMENT_BASE_URL}/transaction/verify/${reference}`, {
            headers,
        });
        return response.data;
    }
    catch (error) {
        console.log("error in verify ===> ", error);
    }
};
