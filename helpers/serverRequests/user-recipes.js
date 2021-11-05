import Axios from "axios";

export const getRecipesByCustomer = async (id, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating/by-customer/${id}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateRecipeRating = async (recipeId, rating, comment) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating/rate/${recipeId}`,
            data: {
                rating,
                comment,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const deleteRecipe = async (recipeId) => {
    try {
        const res = await Axios({
            method: "DELETE",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating/${recipeId}`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};
