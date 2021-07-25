import { PaymentRounded } from "@material-ui/icons";
import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/payment-order`;

export const getCustomerPaymentOrders = async (customerId: string, locale: string) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/by-customer/${customerId}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const getPaymentOrderById = async (paymentOrderId: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/${paymentOrderId}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};
