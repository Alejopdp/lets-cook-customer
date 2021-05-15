// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import Publisher from "../../atoms/publisher/publisher";
import BlogTag from "../../atoms/blogTag/blogTag";

// Icons & Images
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: "1000px",
        margin: "0 auto",
        borderRadius: "8px",
        // border: "1px solid red",
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            margin: theme.spacing(2),
        },
    },
    image: {
        borderRadius: "8px 0 0 8px",
        [theme.breakpoints.down("md")]: {
            borderRadius: "8px 8px 0 0",
        },
    },
    marg1: {
        marginTop: theme.spacing(1),
    },
    marg2: {
        marginTop: theme.spacing(2),
    },
    marg4: {
        marginTop: theme.spacing(4),
    },
    publisher: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
    },
    date: {
        marginLeft: "48px",
        [theme.breakpoints.down("xs")]: {
            marginLeft: "0",
            marginTop: theme.spacing(1),
        },
    },
}));

const posts = [
    {
        image: "/unnamed.jpg",
        title: "Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona",
        description:
            "Let's Cook aspira a dar el servicio de reparto a domicilio de meal kits en Barcelona perfecto, con criterios de calidad y un rango geográfico amplio.",
        tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
        avatar: "LC",
        author: "Equipo Let's Cook",
        date: "Publicado el 20 de abril de 2021",
    },
    {
        image: "/unnamed.jpg",
        title: "Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona",
        description:
            "Let's Cook aspira a dar el servicio de reparto a domicilio de meal kits en Barcelona perfecto, con criterios de calidad y un rango geográfico amplio.",
        tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
        avatar: "LC",
        author: "Equipo Let's Cook",
        date: "Publicado el 20 de abril de 2021",
    },
    {
        image: "/unnamed.jpg",
        title: "Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona",
        description:
            "Let's Cook aspira a dar el servicio de reparto a domicilio de meal kits en Barcelona perfecto, con criterios de calidad y un rango geográfico amplio.",
        tags: ["Tag 1", "Tag 2", "Tag 3", "Tag 4"],
        avatar: "LC",
        author: "Equipo Let's Cook",
        date: "Publicado el 20 de abril de 2021",
    },
];

const BlogPostCard = (props) => {
    const classes = useStyles();

    const { root, image, marg1, marg2, marg4, publisher, date } = classes;

    return (
        <>
            {posts.map((post, index) => (
                <div className={root} key={index}>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                            <Image src={post.image} width={300} height={270} layout="responsive" className={image} />
                        </Grid>

                        <Grid item xs={12} md={7} style={{ margin: "0 24px 0 24px" }}>
                            <Typography variant="subtitle1" className={marg4}>
                                {post.title}
                            </Typography>

                            <Typography variant="body1" className={marg1}>
                                {post.description}
                            </Typography>

                            <Grid container direction="row" className={marg2}>
                                {post.tags.map((tag, index) => (
                                    <BlogTag tagName={tag} key={index} />
                                ))}

                                <Typography variant="body1" className={marg1}>
                                    y 3 más...
                                </Typography>
                            </Grid>

                            {/* <Publisher /> */}

                            <Grid container direction="row" alignItems="center" className={publisher}>
                                <Avatar style={{ marginRight: "8px" }}>{post.avatar}</Avatar>

                                <Typography variant="body2">{post.author}</Typography>

                                <Typography variant="body2" className={date}>
                                    {post.date}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            ))}
        </>
    );
};

export default BlogPostCard;
