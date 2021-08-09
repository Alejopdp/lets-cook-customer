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

export const swapPlan = async (subscriptionId: string, newPlanId: string, newPlanVariantId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/swap-plan/${subscriptionId}`,
            data: {
                newPlanId,
                newPlanVariantId,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const updateRestriction = async (subscriptionId: string, restrictionId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/update-restriction/${subscriptionId}`,
            data: {
                restrictionId,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const createManySubscriptions = async (
    customerId: string,
    variants: { planId: string; frequency: string; variant: { id: string } }[]
) => {
    console.log("A VER LAS VARIANTS: ", variants);
    try {
        const res = await axios({
            method: "POST",
            url: `${apiUrl}/many`,
            data: {
                customerId,
                plans: variants,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const handle3dSecureFailure = async (subscriptionId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/handle-3dsecure-failure/${subscriptionId}`,
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};

export const handle3dSecureFailureForManySubscriptions = async (subscriptionsIds: string[]) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/handle-3dsecure-failure-for-many-subscriptions`,
            data: {
                subscriptionsIds,
            },
        });

        return res;
    } catch (error) {
        console.log(error);
        return error.response;
    }
};
