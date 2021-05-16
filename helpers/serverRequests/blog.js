import Axios from "axios";

export const getPosts = async (locale) => {
    try {
        const res = Axios({
            method: "GET",
            url: `${process.env.BLOG_API_URL}/articles`,
        });

        return res;
    } catch (error) {
        return error.response;
    }
};
