// Utils & Config
import React from "react";
import { getPosts, getCategories } from "../../../helpers/serverRequests/blog";
import { useLang } from "@hooks";

// Internal Components
import InnerSectionLayout from "../../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../../components/molecules/titleOtherPages/titleOtherPages";
import BlogsGrid from "../../../components/organisms/blogGrid/blogGrid";
import { Layout } from "../../../components/layout";

const BlogRecetas = (props) => {
    const [lang] = useLang("recipesBlog");

    return (
        <Layout
            seoTitle={`Blog recetas - Let's cook`}
            page="blog post page"
            seoDescriptionContent="Blog recetas"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/blogs/recetas`}
        >
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <BlogsGrid posts={props.posts} categories={props.categories} shallowRedirection={false} hideFilter={false} />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const [res, categoriesRes] = await Promise.all([getPosts(context.locale, {}), getCategories(context.locale)]);

    return {
        props: {
            posts: res?.status === 200 ? res?.data : [],
            categories:
                categoriesRes?.status && categoriesRes?.status === 200 && Array.isArray(categoriesRes.data) ? categoriesRes.data : [],
        },
    };
}

export default BlogRecetas;
