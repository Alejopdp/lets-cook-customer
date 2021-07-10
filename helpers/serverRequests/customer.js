import Axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/customer`;

export const updatePersonalData = async (id, data) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${apiUrl}/update-info/${id}`,
            data,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};
