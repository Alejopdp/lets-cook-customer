import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/coupon`;

export const getCouponValidation = async (
    couponCode: string,
    customerId: string,
    shippingCost: number,
    planId: string,
    planVariantId: string
) => {
    try {
        const res = await axios({
            method: "GET",
            url: `${apiUrl}/validation/${couponCode}`,
            params: { customerId, shippingCost, planId, planVariantId },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
