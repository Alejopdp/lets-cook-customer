// Utils & Config
import React from "react";
import { GetStaticProps } from "next";

// Internal componentss
import BlogPostCardDetail from "../../../components/organisms/blogPostCardDetail/blogPostCardDetail";

const post = {
    image: "/unnamed.jpg",
    title: "Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona",
    description:
        "Let's Cook aspira a dar el servicio de reparto a domicilio de meal kits en Barcelona perfecto, con criterios de calidad y un rango geográfico amplio.",
    tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
    avatar: "LC",
    author: "Equipo Let's Cook",
    date: "Publicado el 20 de abril de 2021",
    paragraphs: [
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis exercitationem quis, cum, sunt consectetur facere ut laboriosam mollitia rerum reiciendis sapiente sit vero odit hic laudantium nihil eligendi autem delectus. Necessitatibus enim nesciunt harum officia, minima repellat incidunt beatae sit hic commodi iure minus deleniti cupiditate possimus cumque nobis, dolor at similique maiores modi. Numquam maiores vel odit fugit quia. Sequi optio blanditiis nam tempora aut inventore numquam asperiores deleniti earum accusamus hic magni, dicta tempore esse ut quis incidunt, debitis fugit quaerat. Velit deserunt soluta ad optio repudiandae pariatur",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis exercitationem quis, cum, sunt consectetur facere ut laboriosam mollitia rerum reiciendis sapiente sit vero odit hic laudantium nihil eligendi autem delectus. Necessitatibus enim nesciunt harum officia, minima repellat incidunt beatae sit hic commodi iure minus deleniti cupiditate possimus cumque nobis, dolor at similique maiores modi. Numquam maiores vel odit fugit quia. Sequi optio blanditiis nam tempora aut inventore numquam asperiores deleniti earum accusamus hic magni, dicta tempore esse ut quis incidunt, debitis fugit quaerat. Velit deserunt soluta ad optio repudiandae pariatur",
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis exercitationem quis, cum, sunt consectetur facere ut laboriosam mollitia rerum reiciendis sapiente sit vero odit hic laudantium nihil eligendi autem delectus. Necessitatibus enim nesciunt harum officia, minima repellat incidunt beatae sit hic commodi iure minus deleniti cupiditate possimus cumque nobis, dolor at similique maiores modi. Numquam maiores vel odit fugit quia. Sequi optio blanditiis nam tempora aut inventore numquam asperiores deleniti earum accusamus hic magni, dicta tempore esse ut quis incidunt, debitis fugit quaerat. Velit deserunt soluta ad optio repudiandae pariatur?",
    ],
};

const BlogPostPage = () => {
    return (
        <>
            <BlogPostCardDetail post={post} />
        </>
    );
};

export default BlogPostPage;
