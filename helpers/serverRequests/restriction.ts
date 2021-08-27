import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/restriction`;

export const getRestrictions = async (locale: string) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
