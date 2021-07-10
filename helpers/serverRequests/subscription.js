import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/subscription`;

export const createSubscription = async (data) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}`,
            data,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
