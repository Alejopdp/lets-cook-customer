import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;
const userApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/user`;

export const loginWithSocialMedia = async (token) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/social-auth/${token}`,
            data: { token },
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
