// Utils & Config
import React from "react";
import { getPostBySlug, getPosts } from "../../../helpers/serverRequests/blog";
import { useRouter } from "next/router";

// Internal componentss
import BlogPostCardDetail from "../../../components/organisms/blogPostCardDetail/blogPostCardDetail";
import InnerSectionLayout from "../../../components/layout/innerSectionLayout";
import BackButtonTitle from "../../../components/atoms/backButtonTitle/backButtonTitle";
import { Layout } from "../../../components/layout/index";
import { localeRoutes, Routes } from "lang/routes/routes";

const BlogPostPage = ({ post, error }) => {
    const router = useRouter();
    return (
        <Layout seoTitle="Blog - Let's cook: Productos frescos y recetas" page="blog post page">
            <InnerSectionLayout containerMaxWidth="md">
                <BackButtonTitle url={`${localeRoutes[router.locale][Routes.blogs]}/recetas`} title="Volver al Blog" />
                <BlogPostCardDetail post={post} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default BlogPostPage;

export const getServerSideProps = async (context) => {
    const slug = context.params.slug;
    const res = await getPostBySlug(slug, context.locale);

    return {
        props: {
            post: res.data || null,
            error: res.status !== 200 ? "ERROR" : "",
        },
    };
};
