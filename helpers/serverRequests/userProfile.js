import Axios from "axios";

// Profile

export const getProfileInfo = async (customerId, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/subscription/by-customer/${customerId}`,
            params: {
                locale,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

// Plan Details

export const getSubscriptionById = async (subscriptionId, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/subscription/${subscriptionId}`,
            params: {
                locale,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const swapPlan = async (subscriptionId, newPlanId, newPlanVariantId) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/subscription/swap-plan/${subscriptionId}`,
            data: {
                newPlanId: newPlanId,
                newPlanVariantId: newPlanVariantId,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};
