// Utils & Config
import React from "react";

// Internal componentss
import BlogPostCardDetail from "../../../components/organisms/blogPostCardDetail/blogPostCardDetail";

const Posts = [
    {
        image: "/unnamed.jpg",
        title: "[1] Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona",
        url: "1-Eixample-Pedralbes-Espluges-y-mas-alla",
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
    },
    {
        image: "/unnamed.jpg",
        title: "[2] Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona",
        url: "2-Eixample-Pedralbes-Espluges-y-mas-alla",
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
    },
    {
        image: "/unnamed.jpg",
        title: "[3] Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona",
        url: "3-Eixample-Pedralbes-Espluges-y-mas-alla",
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
    },
];

export const getStaticPaths = () => {
    const response = Posts;

    const paths = response.map((post, index) => ({
        params: {
            id: post.url,
        },
    }));

    return {
        // incremental static generation
        // Statically generate all paths
        paths: paths,
        // Everything else falls for 404
        fallback: false,
    };
};

export const getStaticProps = ({ params }) => {
    const id = params?.id;

    const response = Posts.find((post) => post.url === id);

    const post = response;

    return {
        props: {
            post,
        },
    };
};

const BlogPostPage = ({ post }) => {
    return (
        <>
            <BlogPostCardDetail post={post} />
        </>
    );
};

export default BlogPostPage;
