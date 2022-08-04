import React from "react";
import { Box } from "@material-ui/core";
import BlogCard from "components/molecules/blogCard";
import { useRouter } from "next/router";
import CocinaBlogImage from "public/assets/blog-cocina.JPG";
import NewsBlogImage from "public/assets/blog-noticias.jpg";
import Link from "next/link";

const blogs = [
    // {
    //     title: { en: "Conoce Let's Cook", es: "Conoce Let's Cook", ca: "Conoce Let's Cook" },
    //     subtitle: {
    //         en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
    //         es: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
    //         ca: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
    //     },
    //     path: "/blogs/recetas",
    // },
    {
        title: { en: "Cocina con nosotros", es: "Cocina con nosotros", ca: "Cocina con nosotros" },
        subtitle: {
            en: "Aquí puedes encontrar tips de cocina, recetas recomendadas y todo lo relacionado con lo que más nos gusta: cocinar y comer saludable y variado, ahorrando tiempo para que puedas lucirte en la cocina.",
            es: "Aquí puedes encontrar tips de cocina, recetas recomendadas y todo lo relacionado con lo que más nos gusta: cocinar y comer saludable y variado, ahorrando tiempo para que puedas lucirte en la cocina.",
            ca: "Aquí puedes encontrar tips de cocina, recetas recomendadas y todo lo relacionado con lo que más nos gusta: cocinar y comer saludable y variado, ahorrando tiempo para que puedas lucirte en la cocina.",
        },
        path: "/blogs/cocina",
        image: CocinaBlogImage,
    },
    {
        title: { en: "Novedades", es: "Novedades", ca: "Novedades" },
        subtitle: {
            en: "Entérate de las últimas novedades en la comunidad de Let’s Cook: hablamos de nuevas tendencias, pasos que va dando la empresa, de nosotros y muchas novedades más. ¡Te invitamos a aportar lo que te interese!  ",
            es: "Entérate de las últimas novedades en la comunidad de Let’s Cook: hablamos de nuevas tendencias, pasos que va dando la empresa, de nosotros y muchas novedades más. ¡Te invitamos a aportar lo que te interese!  ",
            ca: "Entérate de las últimas novedades en la comunidad de Let’s Cook: hablamos de nuevas tendencias, pasos que va dando la empresa, de nosotros y muchas novedades más. ¡Te invitamos a aportar lo que te interese!  ",
        },
        path: "/blogs/noticias",
        image: NewsBlogImage,
    },
];

const BlogList = () => {
    const { locale, push } = useRouter();

    return (
        <Box width={"100%"}>
            {blogs.map((blog, index) => (
                <BlogCard key={index} title={blog.title[locale]} subtitle={blog.subtitle[locale]} path={blog.path} imagePath={blog.image} />
            ))}
            <Box width={"100%"} display="flex" justifyContent="center" alignContent="center">
                <Link href="/blogs/recetas">
                    <a style={{ color: "#f5f5f5" }}>Recetas</a>
                </Link>
            </Box>
        </Box>
    );
};

export default BlogList;
