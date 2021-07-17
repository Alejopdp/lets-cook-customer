import axios from "axios";
const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/order`;

export const chooseRecipes = async (orderId: string, recipeSelection: { recipeId: string; quantity: number }[], subscriptionId: string) => {
    try {
        const res = await axios({
            method: "PUT",
            url: `${apiUrl}/update-recipes/${orderId}`,
            data: {
                recipeSelection,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
