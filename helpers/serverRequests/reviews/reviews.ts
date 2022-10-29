import Axios from "axios";
import { API_URL } from "../serverRequestInterfaces/response";
import { Review, ReviewResponse } from "./reviewInterfaces";

export async function getReviews(locale: string): Promise<ReviewResponse> {
    try {
        const res = await Axios.request<Review[]>({
            method: "GET",
            url: `${API_URL}/business/reviews`,
            params: {
                locale
            }
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
