import Axios from "axios";

export const getPosts = async (locale, categories) => {
    try {
        const res = await Axios({
            method: "GET",
            url: !!categories
                ? `${process.env.NEXT_PUBLIC_BLOG_API_URL}/articles?${categories}`
                : `${process.env.NEXT_PUBLIC_BLOG_API_URL}/articles`,
        });
        return res;
    } catch (error) {
        return error.response;
    }
};

export const getPostBySlug = async (slug, locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BLOG_API_URL}/articles/${slug}`,
            params: {
                locale,
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getCategories = async (locale) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BLOG_API_URL}/categories`,
            // params: {
            //     locale,
            // },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
