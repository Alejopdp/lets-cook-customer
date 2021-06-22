import Axios from "axios";
const localUrl = 'http://localhost:3001/api/v1';
export const getRecipes = async (locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL || localUrl}/recipe`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
