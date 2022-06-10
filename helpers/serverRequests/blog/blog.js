import Axios from "axios";

export const getPosts = async (locale, queryParams) => {
    try {
        const res = await Axios({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BLOG_API_URL}/articles`,
            // url: `https://lets-cook-blog.herokuapp.com/articles`,
            params: { _sort: "createdAt:desc", ...queryParams },
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
            // url: `https://lets-cook-blog.herokuapp.com/articles/${slug}`,
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

export const getCategories = async (locale, queryParams) => {
    try {
        const res = await Axios({
            method: "GET",
            // url: `https://lets-cook-blog.herokuapp.com/categories`,
            url: `${process.env.NEXT_PUBLIC_BLOG_API_URL}/categories`,
            params: {
                // locale,
                ...queryParams,
            },
        });

        return res;
    } catch (error) {
        console.log("Error: ", error);
        return error.response;
    }
};
