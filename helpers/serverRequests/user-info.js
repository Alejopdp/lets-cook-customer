import Axios from "axios";

export const getUserInfo = async (id, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/customer/${id}`,
            params: {
                locale,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};
