import { AxiosResponse } from "axios";
import { ServerRequestRespose } from "../serverRequestInterfaces/response";

export type ReviewResponse = ServerRequestRespose<Review[]>;
export interface Review {
    id: any,
    name: string,
    avatar: {
        src: string,
        alt: string
    },
    stars: number,
    date: string,
    text: string
}