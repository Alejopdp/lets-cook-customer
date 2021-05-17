// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "next/link";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import BlogTag from "../../atoms/blogTag/blogTag";

// Icons & Images
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "700px",
        margin: "0 auto",
        borderRadius: "8px",
        marginTop: theme.spacing(2),
        [theme.breakpoints.down("xs")]: {
            margin: theme.spacing(2),
        },
    },
    image: {
        borderRadius: "8px",
    },
    marg1: {
        marginTop: theme.spacing(1),
    },
    marg2: {
        marginTop: theme.spacing(2),
    },
    publisher: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    date: {
        marginLeft: theme.spacing(6),
        [theme.breakpoints.down("xs")]: {
            marginLeft: "0",
            marginTop: theme.spacing(1),
        },
    },
    tags: {
        marginBottom: theme.spacing(6),
    },
}));

const BlogPostCardDetail = ({ post }) => {
    const classes = useStyles();

    const { root, image, marg1, marg2, publisher, date, tags } = classes;

    return (
        <div className={root}>
            <Link href="/blogs/recetas">
                <Grid container alignItems="center" style={{ marginBottom: "24px", cursor: "pointer" }}>
                    <ArrowBackIcon style={{ marginRight: "8px", color: "#2b2b2b" }} />
                    <Typography variant="h6" style={{ color: "#2b2b2b" }}>
                        Volver al Blog
                    </Typography>
                </Grid>
            </Link>

            <Grid container>
                <Grid item>
                    <Image src={post.image} width={700} height={350} className={image} />
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1" className={marg2}>
                        {post.title}
                    </Typography>

                    <Typography variant="body1" className={marg1}>
                        {post.description}
                    </Typography>

                    <Grid container alignItems="center" className={publisher}>
                        <Avatar style={{ marginRight: "8px" }}>{post.avatar}</Avatar>

                        <Typography variant="body2" style={{ marginRight: "130px" }}>
                            {post.author}
                        </Typography>

                        <Typography variant="body2" className={date}>
                            {post.date}
                        </Typography>
                    </Grid>

                    <Grid container className={marg2}>
                        {post.paragraphs.map((paragraph, index) => (
                            <Typography variant="body2" paragraph className={marg1} key={index}>
                                {paragraph}
                            </Typography>
                        ))}
                    </Grid>

                    <Grid container className={tags}>
                        {post.tags.map((tag, index) => (
                            <BlogTag tagName={tag} key={index} />
                        ))}

                        <Typography variant="body1" className={marg1}>
                            y 3 más...
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default BlogPostCardDetail;
