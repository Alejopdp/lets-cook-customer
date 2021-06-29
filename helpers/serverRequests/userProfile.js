import Axios from "axios";

export const getSubscriptionById = async (subscriptionId, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe`,
            params: {
                locale,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};