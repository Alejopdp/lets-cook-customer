import Axios from "axios";
import { API_URL } from "../serverRequestInterfaces/response";
import { Review, ReviewResponse } from "./reviewInterfaces";

export async function getReviews(locale: string): Promise<ReviewResponse> {
    try {
        const res = await Axios.request<Review[]>({
            method: "GET",
            url: `${API_URL}/reviews`,
            params: {
                locale,
            },
        });
        return {
            status: res.status,
            data: res.data,
        };
    } catch (error) {
        console.log("***-> Review Oops!: ", error);
        return {
            status: 500,
            error: error.response as string,
        };
    }
}

export const getDemoReviews = async (locale: string): Promise<ReviewResponse> => ({
    status: 200,
    data,
});

const data = Array<Review>(10)
    .fill({
        id: 1,
        name: "Ricardo Sánchez",
        avatar: { src: "/static/images/avatar/1.jpg", alt: "Ricardo Sánchez" },
        stars: 5,
        date: "",
        text: "Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!",
    })
    .map((review, index) => ({
        ...review,
        id: index,
        name: review.name + " " + index,
        date: `Hace ${index} días`,
    }));
