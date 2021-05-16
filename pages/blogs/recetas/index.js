// Utils & Config
import React from "react";

// Internal Components
import TitleOtherPages from "../../../components/molecules/titleOtherPages/titleOtherPages";
import BlogPostCard from "../../../components/organisms/blogPostCard/blogPostCard";
import { getPosts } from "../../../helpers/serverRequests/blog";

const BlogRecetas = (props) => {
    return (
        <>
            <TitleOtherPages title="Blog" subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr" />

            <BlogPostCard posts={props.posts} />
        </>
    );
};

export async function getStaticProps(context) {
    const res = await getPosts(context.locale);

    console.log("A ver : ", res.data);

    return {
        props: {
            posts: res.status === 200 ? res.data : [],
        },
    };
}

export default BlogRecetas;
