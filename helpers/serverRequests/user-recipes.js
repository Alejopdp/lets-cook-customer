import Axios from "axios";


export const getRecipesByCustomer = async (test, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating/by-customer/test`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
