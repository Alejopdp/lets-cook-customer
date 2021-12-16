import Axios from "axios";

export const getRecipesByCustomer = async (id, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating`,
            params: {
                customer: id,
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const updateRecipeRating = async (recipeRaitingId, rating, comment) => {
    try {
        const res = await Axios({
            method: "PUT",
            headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating/${recipeRaitingId}`,
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

export const deleteRecipeRating = async (recipeId) => {
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
