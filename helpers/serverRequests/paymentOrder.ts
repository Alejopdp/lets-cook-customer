import { PaymentRounded } from "@material-ui/icons";
import axios from "axios";
import { PaymentOrderState } from "types/paymentOrderState";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment-order`;

export const getCustomerPaymentOrders = async (customerId: string, locale: string) => {
    try {
        const res = await axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/by-customer/${customerId}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getPaymentOrderById = async (paymentOrderId: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/${paymentOrderId}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updatePaymentOrderState = async (paymentOrderId: string, state: PaymentOrderState) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/update-state/${paymentOrderId}`,
            data: {
                state,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
