// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";

// External components
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// Internal components

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        // maxWidth: "1000px",
        margin: "0 auto",
        borderRadius: "8px",
        marginBottom: theme.spacing(2),
        cursor: "pointer",
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

const PostCard = (props) => {
    const classes = useStyles();
    const { root, image, marg1, marg2, marg4, publisher, date } = classes;
    const router = useRouter();

    const handlePostClick = () => {
        router.push({ pathname: `/blogs/recetas/${props.post.slug}` });
    };

    return (
        // <div className={root}>
        <Grid container classes={{ root }} onClick={handlePostClick}>
            <Grid item xs={12} md={4}>
                <Image
                    src={`${process.env.NEXT_PUBLIC_BLOG_API_URL}${props.post.image.url}`}
                    alt={props.post.image.name}
                    width={300}
                    height={270}
                    layout="responsive"
                    className={image}
                />
            </Grid>

            <Grid item xs={12} md={7} style={{ margin: "0 24px 0 24px" }}>
                <Typography variant="subtitle1" className={marg4}>
                    {props.post.title}
                </Typography>

                <Typography variant="body1" className={marg1}>
                    {props.post.description}
                </Typography>

                <Grid container direction="row" className={marg2}>
                    {/* {props.post.tags.map((tag, index) => (
                                    <BlogTag tagName={tag} key={index} />
                                ))} */}

                    <Typography variant="body1" className={marg1}>
                        y 3 más...
                    </Typography>
                </Grid>

                {/* <Publisher /> */}

                <Grid container direction="row" alignItems="center" className={publisher}>
                    <Avatar style={{ marginRight: "8px" }}>{props.post.author.picture.formats.large.url}</Avatar>

                    <Typography variant="body2">{props.post.author.name}</Typography>

                    <Typography variant="body2" className={date}>
                        {props.post.publishedAt}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
        // </div>
    );
};

PostCard.propTypes = {};

export default PostCard;
