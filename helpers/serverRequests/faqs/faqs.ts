import Axios from "axios";
import { API_URL } from '../serverRequestInterfaces/response';
import { FAQS, FAQSResponse } from "./faqsInterfaces";

export async function getFAQS(locale: string): Promise<FAQSResponse> {

    /**
    * TODO: IMPORTANT!!! FOR NOW THE RESPONSE IS HARDCODE.
    */

    // try {

    // const res = await Axios.request<FAQSResponse>({
    //     method: "GET",
    //     url: `${API_URL}/faqs`,
    //     params: {
    //         locale,
    //     },
    // });
    // return res.data;

    // } catch (error) {
    //     return  {
    //         status: 500,
    //         error: error.response as string
    //     };
    // }

    // TODO: IMPORTANT!!! REMOVE AFTER IMPLEMENTATION.
    return await getDemoFAQS(locale);
};

export const getDemoFAQS = async (locale: string): Promise<FAQSResponse> => ({
    status: 200,
    data
});

const data: FAQS[] = Array(7)
    .fill({
        question: "Ipsum lorem dolor sit amet sadipscing elitr?",
        answer: "Ipsum lorem dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.",
    })
    .map((faqs, index) => ({
        ...faqs,
        question: `(${index}) ${faqs.question}`,
    }));