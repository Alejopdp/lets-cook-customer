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
import markdownToHtml from "helpers/utils/markdown";

const BlogPostPage = ({ post, error }) => {
    const router = useRouter();
    return (
        <Layout
            seoTitle={`${post.title} - Let's cook`}
            page="blog post page"
            seoDescriptionContent={post.description}
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/blogs/recetas/${router.query.slug}`}
        >
            <InnerSectionLayout containerMaxWidth="md">
                <BackButtonTitle url={`${localeRoutes[router.locale][Routes.blogs]}/recetas`} title="Volver al Blog" />
                <BlogPostCardDetail post={post} />
            </InnerSectionLayout>
        </Layout>
    );
};

export default BlogPostPage;

export async function getServerSideProps(context) {
    const slug = context.params.slug;
    const res = await getPostBySlug(slug, context.locale);

    return {
        props: {
            post: !!res && res.status === 200 ? { ...res.data, content: await markdownToHtml(res.data.content) } : null,
            error: res.status !== 200 ? "ERROR" : "",
        },
    };
}
