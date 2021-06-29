import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;

export const loginWithSocialMedia = async (token) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/login`,
            data: { token },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
