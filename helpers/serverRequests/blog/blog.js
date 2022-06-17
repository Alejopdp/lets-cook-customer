import Axios from "axios";

export const getPosts = async (locale, queryParams) => {
    try {
        console.log("Searching with locale : ", locale);
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BLOG_API_URL}/articles`,
            // params: { _sort: "createdAt:desc", ...queryParams, _locale: locale },
            params: { _sort: "createdAt:desc", ...queryParams, _locale: "en" },
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
                // _locale: locale,
                _locale: "en",
            },
        });

        return res;
    } catch (error) {
        return error.response;
    }
};

export const getCategories = async (locale, queryParams) => {
    try {
        console.log("process.env.NEXT_PUBLIC_BLOG_API_URL}: ", process.env.NEXT_PUBLIC_BLOG_API_URL);
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BLOG_API_URL}/categories`,
            params: {
                // _locale: locale,
                _locale: "en",
                ...queryParams,
            },
        });

        return res;
    } catch (error) {
        console.log("Error: ", error);
        return error.response;
    }
};
