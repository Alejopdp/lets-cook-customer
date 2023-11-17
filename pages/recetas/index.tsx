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

const RecipesBlog = (props) => {
    const [lang] = useLang("recipesBlog");

    return (
        <Layout
            page="blog page"
            seoTitle={`Recetas - LetsCook`}
            seoDescriptionContent="Recetas"
            canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/recetas`}
        >
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <BlogsGrid pathName="/recetas" posts={props.posts || []} hideFilter categories={[]} />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    console.log("Searchig");
    const res = await getPosts(context.locale, { type: BlogType.Recipes });

    return {
        props: {
            posts: res?.status === 200 ? res?.data : [],
        },
    };
}
export default RecipesBlog;
