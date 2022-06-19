import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/shipping`;

export const getShippingCost = async (latitude, longitude, locale) => {
    try {
        const res = await axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token") || "") },
            params: {
                locale,
            },
            url: `${apiUrl}/shipping-rate/${latitude}/${longitude}`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
