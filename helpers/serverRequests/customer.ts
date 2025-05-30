import { Wallet } from "@stores";
import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;
const userApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export const loginWithSocialMedia = async (token: string, email: string, isInCheckout: boolean) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/social-auth/${token}`,
            data: { token, email, isInCheckout },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const loginWithEmail = async (email, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/sign-in`,
            data: { email, password },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const verifyToken = async (token) => {
    try {
        const res = await axios({
            method: "GET",
            headers: {
                Authorization: token,
            },
            url: `${userApiUrl}/verify-token`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const signUp = async (email: string, password: string, isInCheckout: boolean) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/sign-up`,
            data: { email, password, isInCheckout },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updatePersonalData = async (id, data) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/update-info/${id}`,
            data,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateShippingAddress = async (id, data) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/update-shipping/${id}`,
            data: { ...data, lat: data.latitude, long: data.longitude, delivery_time: data.preferredShippingHour },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateBillingData = async (id, data) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/update-billing/${id}`,
            data,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const forgotPassword = async (email) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/forgot-password/${email}`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const validateRecoverPasswordCode = async (code, email) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/validation/${code}`,
            data: {
                email,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const resetPassword = async (newPassword, email, code) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/reset-password/${email}`,
            data: {
                email,
                newPassword,
                code,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const addNewPaymentMethod = async (customerId: string, stripePaymentMethodId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/add-payment-method/${customerId}`,
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            data: {
                stripePaymentMethodId,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const changeDefaultPaymentMethod = async (paymentMethodId: string, customerId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/update-payment/${customerId}`,
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            data: {
                id: paymentMethodId,
                isDefault: true,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const setupFuturePaymentMethod = async (customerId: string) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/setup-future-payment-method/${customerId}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const checkIfEmailExists = async (email: string) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/check-if-email-exists`,
            data: {
                email,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const changePasswordWithoutCode = async (customerEmail: string, newPassword: string) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/change-password/${customerEmail}`,
            data: {
                newPassword,
            },
        });

        return res;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export const sendUpdateEmailEmail = async (newEmail: string, customerId: string, locale: string) => {
    try {
        const res = await axios({
            method: "POST",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/request-email-change/${customerId}`,
            params: {
                locale,
            },
            data: {
                email: newEmail,
            },
        });

        return res;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export const updateEmail = async (token: string, customerId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/update-email`,
            data: {
                token,
            },
        });

        return res;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export const getCustomerById = async (customerId: string, locale: string) => {
    try {
        const res = await axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/${customerId}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        console.error(error);
        return error.response;
    }
};

export const updateWallet = async (customerId: string, wallet: Wallet, locale: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/wallet/${customerId}`,
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            params: { locale },
            data: {
                ...wallet,
            },
        });

        return res
    } catch (error) {
        return error.response;
    }
}


export const chargeMoneyToWallet = async (customerId: string, amountToCharge: number, locale: string, paymentMethodId?: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/wallet/charge/${customerId}`,
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            params: { locale },
            data: {
                amountToCharge,
                paymentMethodId
            },
        });

        return res
    } catch (error) {
        return error.response;
    }
}