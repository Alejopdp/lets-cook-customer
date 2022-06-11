import React from "react";
import { Box } from "@material-ui/core";
import BlogCard from "components/molecules/blogCard";
import { useRouter } from "next/router";

const blogs = [
    {
        title: { en: "Recipes", es: "Recetas", ca: "Recetas" },
        subtitle: {
            en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
            es: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
            ca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
        },
        path: "/blogs/recetas",
    },
    {
        title: { en: "Cook", es: "Cocina", ca: "Cocina" },
        subtitle: {
            en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
            es: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
            ca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
        },
        path: "/blogs/cocina",
    },
    {
        title: { en: "News", es: "Noticias", ca: "Noticias" },
        subtitle: {
            en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
            es: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
            ca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
        },
        path: "/blogs/noticias",
    },
];

const BlogList = () => {
    const { locale } = useRouter();

    return (
        <Box width={"100%"}>
            {blogs.map((blog, index) => (
                <BlogCard key={index} title={blog.title[locale]} subtitle={blog.subtitle[locale]} path={blog.path} imagePath={undefined} />
            ))}
        </Box>
    );
};

export default BlogList;
