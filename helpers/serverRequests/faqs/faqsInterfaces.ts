import { ServerRequestRespose } from "../serverRequestInterfaces/response";

export type FAQSResponse = ServerRequestRespose<FAQS[]>;
export interface FAQS {
    question: string;
    answer: string;
}