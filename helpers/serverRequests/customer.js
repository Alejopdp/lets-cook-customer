import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;
const userApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export const loginWithSocialMedia = async (token, email = "") => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/social-auth/${token}`,
            data: { token, email },
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

export const signUp = async (email, password) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/sign-up`,
            data: { email, password },
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
            url: `${apiUrl}/update-shipping/${id}`,
            data,
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
