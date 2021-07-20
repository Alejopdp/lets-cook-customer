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

export const cancelSubscription = async (subscriptionId: string, reason: string, comment: string, locale: string = "es") => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/cancel/${subscriptionId}`,
            params: {
                locale,
            },
            data: {
                cancellationReason: reason,
                cancellationComment: comment,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const reorderPlan = async (subscriptionId: string) => {
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/reorder/${subscriptionId}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};
