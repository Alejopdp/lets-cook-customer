import Axios from "axios";
import { API_URL } from "../serverRequestInterfaces/response";
import { Recipe, RecipeResponse } from "./recipesInterfaces";

export async function getRecipes(locale: string = "es"): Promise<RecipeResponse> {
    try {
        const res = await Axios.request<Recipe[]>({
            method: "GET",
            // headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/recipe`,
            params: {
                locale,
            },
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return {
            status: 500,
            error: error.response as string,
        };
    }
}

export async function getActualWeekRecipes(locale: string = "es"): Promise<RecipeResponse> {
    try {
        const res = await Axios.request<Recipe[]>({
            method: "GET",
            // headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/recipe/actual-week`,
            params: {
                locale,
            },
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return {
            status: 500,
            error: error.response as string,
        };
    }
}

export async function getNextWeekRecipes(locale: string = "es"): Promise<RecipeResponse> {
    try {
        const res = await Axios.request<Recipe[]>({
            method: "GET",
            // headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/recipe/next-week`,
            params: {
                locale,
            },
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        return {
            status: 500,
            error: error.response as string,
        };
    }
}

export const getRecipesForOrder = async (orderId: string, locale: string = "es") => {
    try {
        const res = await Axios.request<Recipe[]>({
            method: "GET",
            // headers: { authorization: JSON.parse(window.localStorage.getItem("token")) },
            url: `${API_URL}/recipe/for-order/${orderId}`,
            params: {
                locale,
            },
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const getDemoRecipes = async (locale: string): Promise<RecipeResponse> => ({
    status: 200,
    data,
});

const data = Array(3)
    .fill({
        variantOptions: ["Opción sin gluten", "Opción sin lactosa"],
        recipeVariants: [
            { name: "Opción principal", ingredients: ["Pan", "Tomate", "Lechuga", "Queso", "Carne"] },
            { name: "Opción sin glúten", ingredients: ["Tomate", "Lechuga"] },
            { name: "Opción sin lactosa", ingredients: ["Pan", "Lechuga", "Carne"] },
        ],
        tools: "Bol, Tenedor, Cuchillo",
        nutritionalInformation: [
            { key: "Valor energético", value: "114,8 kcal" },
            { key: "Grasas", value: "2,2 g" },
            { key: "- de las cuales saturadas", value: "1,1 g" },
            { key: "Hidratos de carbono", value: "18 g" },
            { key: "- de los cuales azúcares", value: "1,8 g" },
            { key: "Proteínas", value: "4,4 g" },
            { key: "Sal", value: "0,8 g" },
        ],
    })
    .map((recipe, index) => ({
        ...recipe,
        id: index,
        name: recipe.name + " " + index,
    }));
