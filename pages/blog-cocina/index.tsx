// Utils & Config
import React from "react";

// Internal Components
import InnerSectionLayout from "../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import BlogsGrid from "../../components/organisms/blogGrid/blogGrid";
import { getPosts } from "../../helpers/serverRequests/blog";
import { Layout } from "../../components/layout/index";
import { useLang } from "@hooks";
import { BlogType } from "types/blog";

const CocinaBlog = (props) => {
    const [lang] = useLang("recipesBlog");

    return (
        <Layout
            seoTitle="Blog cocina - Let's cook"
            page="blog post page"
            seoDescriptionContent="Blog cocina"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/blog-cocina`}
        >
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} hideSubtitle />
                <BlogsGrid pathName="/blog-cocina" posts={props.posts || []} hideFilter categories={[]} />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const res = await getPosts(context.locale, { type: BlogType.Cocina });

    return {
        props: {
            posts: res?.status === 200 ? res?.data : [],
        },
    };
}
export default CocinaBlog;
