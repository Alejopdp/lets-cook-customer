import React from "react";
import { Layout } from "@layouts";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import TitleOtherPages from "components/molecules/titleOtherPages/titleOtherPages";
import BlogList from "components/organisms/blogList";

const BlogsPage = (props) => {
    return (
        <Layout
            seoTitle={`Blog recetas - Let's cook`}
            page="blog post page"
            seoDescriptionContent="Blog recetas"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/blog`}
        >
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={"Blogs"} subtitle={"Blogcitos bl"} hideSubtitle />
                <BlogList />
            </InnerSectionLayout>
        </Layout>
    );
};

export default BlogsPage;
