// Utils & Config
import React from "react";
import { getPosts, getCategories } from "../../../helpers/serverRequests/blog";
import { useLang } from "@hooks";

// Internal Components
import InnerSectionLayout from "../../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../../components/molecules/titleOtherPages/titleOtherPages";
import BlogsGrid from "../../../components/organisms/blogGrid/blogGrid";
import { Layout } from "../../../components/layout";
import { BlogType } from "types/blog";

const BlogRecetas = (props) => {
    const [lang] = useLang("recipesBlog");

    return (
        <Layout
            seoTitle={`Blog cocina - LetsCook`}
            page="blog post page"
            seoDescriptionContent="Blog cocina"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/blogs/cocina`}
        >
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} hideSubtitle />
                <BlogsGrid
                    pathName="/blogs/cocina"
                    posts={props.posts}
                    categories={props.categories}
                    shallowRedirection={false}
                    hideFilter={false}
                />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const [res, categoriesRes] = await Promise.all([
        getPosts(context.locale, { type: BlogType.Cocina }),
        getCategories(context.locale, { Type: BlogType.Cocina }),
    ]);

    return {
        props: {
            posts: res?.status === 200 ? res?.data : [],
            categories:
                categoriesRes?.status && categoriesRes?.status === 200 && Array.isArray(categoriesRes.data) ? categoriesRes.data : [],
        },
    };
}

export default BlogRecetas;
