// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
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
        [theme.breakpoints.down("md")]: {
            marginLeft: "0",
            marginTop: theme.spacing(1),
        },
    },
}));

const tags = [
    {
        name: "Tag 1",
    },
    {
        name: "Tag 2",
    },
    {
        name: "Tag 3",
    },
    {
        name: "Tag 4",
    },
    {
        name: "Tag 5",
    },
];

const BlogPostCard = (props) => {
    const classes = useStyles();

    const { root, card } = classes;

    return (
        <div className={root}>
            <Grid container>
                <Grid item xs={12} md={4}>
                    <Image src="/unnamed.jpg" width={300} height={270} layout="responsive" className={classes.image} />
                </Grid>

                <Grid item xs={12} md={7} style={{ margin: "0 24px 0 24px" }}>
                    <Typography variant="subtitle1" className={classes.marg4}>
                        Eixample, Pedralbes, Espluges y más allá: el reparto a domicilio de meal kits en Barcelona
                    </Typography>

                    <Typography variant="body1" className={classes.marg1}>
                        Let's Cook aspira a dar el servicio de reparto a domicilio de meal kits en Barcelona perfecto, con criterios de
                        calidad y un rango geográfico amplio.
                    </Typography>

                    <Grid container direction="row" className={classes.marg2}>
                        {tags.map((tag, index) => (
                            <BlogTag tagName={tag.name} key={index} />
                        ))}

                        <Typography variant="body1" className={classes.marg1}>
                            y 3 más...
                        </Typography>
                    </Grid>

                    {/* <Publisher /> */}

                    <Grid container direction="row" alignItems="center" className={classes.publisher}>
                        <Avatar style={{ marginRight: "8px" }}>LC</Avatar>
                        <Typography variant="body2" style={{}}>
                            Equipo Let's Cook
                        </Typography>

                        <Typography variant="body2" className={classes.date}>
                            Publicado el 20 de marzo del 2021
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default BlogPostCard;
