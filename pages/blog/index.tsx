import React from "react";
import { Layout } from "@layouts";
import InnerSectionLayout from "components/layout/innerSectionLayout";
import TitleOtherPages from "components/molecules/titleOtherPages/titleOtherPages";
import BlogList from "components/organisms/blogList";

const BlogsPage = (props) => {
    return (
        <Layout
            seoTitle={`Conoce LetsCook`}
            page="blog post page"
            seoDescriptionContent="Conoce LetsCook"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/blog`}
        >
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={"Conoce LetsCook"} hideSubtitle />
                <BlogList />
            </InnerSectionLayout>
        </Layout>
    );
};

export default BlogsPage;
