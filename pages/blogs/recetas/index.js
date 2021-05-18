// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../../lang").Blogs;

// Internal Components
import TitleOtherPages from "../../../components/molecules/titleOtherPages/titleOtherPages";
import BlogPostCard from "../../../components/organisms/blogPostCard/blogPostCard";

const BlogRecetas = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />

            <BlogPostCard />
        </>
    );
};

export default BlogRecetas;
