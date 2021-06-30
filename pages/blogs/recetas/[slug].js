// Utils & Config
import React from "react";
import { getPostBySlug, getPosts } from "../../../helpers/serverRequests/blog";

// Internal componentss
import BlogPostCardDetail from "../../../components/organisms/blogPostCardDetail/blogPostCardDetail";
import InnerSectionLayout from "../../../components/layout/publicLayout";
import BackButtonTitle from "../../../components/atoms/backButtonTitle/backButtonTitle";
import Layout from '../../../components/layout/index';

export const getStaticPaths = async (context) => {
    const response = await getPosts(context.locale);
    const paths = response.data.map((post, index) => ({
        params: {
            slug: post.slug,
        },
    }));

    return {
        // incremental static generation
        // Statically generate all paths
        paths: paths,
        // Everything else falls for 404
        fallback: false,
    };
};

export const getStaticProps = async (context) => {
    const slug = context.params.slug;
    const res = await getPostBySlug(slug, context.locale);

    return {
        props: {
            post: res.data || null,
            error: res.status !== 200 ? "ERROR" : "",
        },
    };
};

const BlogPostPage = ({ post, error }) => {
    return (
        <Layout>
            <InnerSectionLayout containerMaxWidth="md">
                <BackButtonTitle url="/blogs/recetas" title="Volver al Blog" />
                <BlogPostCardDetail post={post} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default BlogPostPage;
