import Axios from "axios";

export const getSubscriptionById = async (subscriptionId, locale) => {
    try {
        const res = await Axios({
            method: "GET",
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
            url: `${process.env.NEXT_PUBLIC_API_URL}/subscription/swap-plan/${subscriptionId}`,
            data: {
                newPlanId: newPlanId,
                newPlanVariantId: newPlanVariantId
            }
        });
        return res;
    } catch (error) {
        return error.response;
    }
};