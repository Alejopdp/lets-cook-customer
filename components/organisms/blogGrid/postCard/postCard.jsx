// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";

// External components
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// Internal components

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: "1000px",
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

    return (
        <div className={root} key={index}>
            <Link href={`recetas/${post.url}`} className={root} key={index}>
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

                        <Grid container alignItems="center" className={publisher}>
                            <Avatar style={{ marginRight: "8px" }}>{post.avatar}</Avatar>

                            <Typography variant="body2" style={{ marginRight: "130px" }}>
                                {post.author}
                            </Typography>

                            <Typography variant="body2" className={date}>
                                {post.date}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Link>
        </div>
    );
};

PostCard.propTypes = {};

export default PostCard;
