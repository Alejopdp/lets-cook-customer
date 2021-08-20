// Utils & Config
import React from "react";

// Internal Components
import InnerSectionLayout from "../../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../../components/molecules/titleOtherPages/titleOtherPages";
import BlogsGrid from "../../../components/organisms/blogGrid/blogGrid";
import { getPosts } from "../../../helpers/serverRequests/blog";
import { Layout } from "../../../components/layout/index";

const BlogRecetas = (props) => {
    const [lang] = useLang('recipesBlog');
    return (
        <Layout page='blog page'>
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <BlogsGrid posts={props.posts} />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const res = await getPosts(context.locale);

    return {
        props: {
            posts: res?.status === 200 ? res?.data : [],
        },
    };
}

// export async function getStaticProps(context) {
//     const res = await getPosts(context.locale);

//     return {
//         props: {
//             posts: res.status === 200 ? res.data : [],
//         },
//     };
// }

export default BlogRecetas;
