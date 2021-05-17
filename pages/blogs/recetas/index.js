// Utils & Config
import React from "react";

// Internal Components
import Layout from "../../../components/layout/publicLayout";
import TitleOtherPages from "../../../components/molecules/titleOtherPages/titleOtherPages";
import BlogsGrid from "../../../components/organisms/blogGrid/blogGrid";
import { getPosts } from "../../../helpers/serverRequests/blog";

const BlogRecetas = (props) => {
    return (
        <Layout>
            <TitleOtherPages title="Blog" subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr" />
            <BlogsGrid posts={props.posts} />
        </Layout>
    );
};

export async function getStaticProps(context) {
    const res = await getPosts(context.locale);

    return {
        props: {
            posts: res.status === 200 ? res.data : [],
        },
    };
}

export default BlogRecetas;
