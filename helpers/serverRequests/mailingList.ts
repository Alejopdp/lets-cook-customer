import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/mailing-list`;

export const subscribeToMailingListGroup = async (groupId: string, email: string, data: any) => {
    try {
        const res = await axios({
            method: "POST",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/subscribe-to-group/${groupId}`,
            data: {
                email,
                ...data,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateSubscriber = async (email: string, data: object) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/update-subscriber/${email}`,
            data: {
                email,
                data,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
