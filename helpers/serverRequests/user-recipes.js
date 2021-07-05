import Axios from "axios";


export const getRecipesByCustomer = async (id, locale) => {
    try {
        const res = await Axios({
            method: "GET",
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

export const updateRecipeRating = async (recipeId, rating) => {
    try {
        const res = await Axios({
            method: "PUT",
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating/rate/${recipeId}`,
            data: {
                rating
            }
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
            url: `${process.env.NEXT_PUBLIC_API_URL}/recipe-rating/${recipeId}`
        });
        return res;
    } catch (error) {
        return error.response;
    }
};


