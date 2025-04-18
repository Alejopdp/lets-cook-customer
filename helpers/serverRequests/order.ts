import axios from "axios";
import { SkippableOrder } from "components/organisms/planDetails/interfaces";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export const chooseRecipes = async (orderId: string, recipeSelection: { recipeId: string; quantity: number }[], isInCheckout: boolean) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/update-recipes/${orderId}`,
            data: {
                recipeSelection,
                isInCheckout
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const skipOrders = async (orders: SkippableOrder[]) => {
    const ordersToSkip: string[] = [];
    const ordersToReactivate: string[] = [];

    for (let order of orders) {
        if (order.isSkipped) ordersToSkip.push(order.id);
        if (!order.isSkipped) ordersToReactivate.push(order.id);
    }

    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/skip`,
            data: {
                ordersToSkip,
                ordersToReactivate,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const skippOrdersFromCancellationModal = async (orders: SkippableOrder[]) => {
    try {
        const res = await axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${apiUrl}/skip`,
            data: {
                ordersToSkip: orders.map((order) => order.id),
                ordersToReactivate: [],
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
