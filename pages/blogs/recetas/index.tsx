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
        <Layout>
            <InnerSectionLayout containerMaxWidth="md">
                <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />
                <BlogsGrid posts={props.posts} categories={props.categories} />
            </InnerSectionLayout>
        </Layout>
    );
};

export async function getServerSideProps(context) {
    const categoriesRes = await getCategories(context.locale);
    const categoryNameIdMap: { [categoryName: string]: string } = {};
    const categoryOrCategories: string | string[] | undefined = !!!context.query.category ? undefined : context.query.category;

    if (categoriesRes && categoriesRes.status === 200) {
        for (let category of categoriesRes.data) {
            categoryNameIdMap[category.name] = category.id;
        }
    }

    var categoriesQueryParam;

    if (Array.isArray(categoryOrCategories)) {
        categoriesQueryParam = categoryOrCategories.reduce(
            (acc, categoryName) =>
                !!!categoryNameIdMap[categoryName]
                    ? acc
                    : acc === ""
                    ? `${acc}categories_in=${categoryNameIdMap[categoryName]}`
                    : `${acc}&categories_in=${categoryNameIdMap[categoryName]}`,
            ""
        );
    }

    if (typeof categoryOrCategories === "string") {
        categoriesQueryParam = `categories_in=${categoryNameIdMap[categoryOrCategories]}`;
    }

    const res = await getPosts(context.locale, categoriesQueryParam);

    return {
        props: {
            posts: res?.status === 200 ? res?.data : [],
            categories:
                categoriesRes.status && categoriesRes.status === 200 && Array.isArray(categoriesRes.data)
                    ? categoriesRes.data.map((category) => category.name)
                    : [],
        },
    };
}

export default BlogRecetas;
