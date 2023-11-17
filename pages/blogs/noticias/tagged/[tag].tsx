// Utils & Config
import React from "react";
import { getPosts, getCategories } from "../../../../helpers/serverRequests/blog";
import { useLang } from "@hooks";

// Internal Components
import InnerSectionLayout from "../../../../components/layout/innerSectionLayout";
import TitleOtherPages from "../../../../components/molecules/titleOtherPages/titleOtherPages";
import BlogsGrid from "../../../../components/organisms/blogGrid/blogGrid";
import { Layout } from "../../../../components/layout";
import { useRouter } from "next/router";
import { BlogType } from "types/blog";

const TaggedBlogPage = (props) => {
    const [lang] = useLang("recipesBlog");
    const router = useRouter();

    return (
        <Layout seoTitle={props.seoTitle} canonicalUrl={`${process.env.NEXT_PUBLIC_DOMAIN}/blogs/noticias/tagged/${router.query.tag}`}>
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} hideSubtitle />
                <BlogsGrid
                    pathName="/blogs/noticias"
                    posts={props.posts}
                    categories={props.categories}
                    hideFilter={false}
                    shallowRedirection={false}
                />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const categoriesRes = await getCategories(context.locale, { Type: BlogType.News });
    const categoryNameIdMap: { [categoryName: string]: string } = {};

    if (categoriesRes && categoriesRes.status === 200) {
        for (let category of categoriesRes.data) {
            categoryNameIdMap[category.slug] = category.id;
        }
    }
    const res = await getPosts(context.locale, { categories_in: [categoryNameIdMap[context.query.tag]] });

    return {
        props: {
            posts: res?.status === 200 ? res?.data : [],
            categories: categoriesRes.status && categoriesRes.status === 200 && Array.isArray(categoriesRes.data) ? categoriesRes.data : [],
            seoTitle: `Blog ${context.query.tag} - LetsCook`,
        },
    };
}

export default TaggedBlogPage;
