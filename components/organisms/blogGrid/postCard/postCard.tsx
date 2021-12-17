// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import { dateFromISO8601 } from "../../../../helpers/utils/date";

// External components
import Grid from "@material-ui/core/Grid";
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

// Internal components
import BlogTagsWithFilter from "../../../atoms/blogTags/blogTagsFWithFilter";
import { Post } from "types/post";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        margin: "0 auto",
        borderRadius: "8px",
        marginBottom: theme.spacing(3),
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
    },
    image: {
        borderRadius: "8px 0 0 8px",
        [theme.breakpoints.down("sm")]: {
            borderRadius: "8px 8px 0 0",
        },
        cursor: "pointer",
    },
    marg1: {
        marginTop: theme.spacing(1),
    },
    marg2: {
        marginTop: theme.spacing(2),
    },
    marg4: {
        marginTop: theme.spacing(4),
        cursor: "pointer",
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

interface PostCardProps {
    post: Post;
}

const PostCard = (props: PostCardProps) => {
    const classes = useStyles();
    const { root, image, marg1, marg2, marg4, publisher, date } = classes;
    const router = useRouter();

    const handlePostClick = () => {
        router.push({ pathname: `/blogs/recetas/${props.post.slug?.split(" ").join("-")}` });
    };

    return (
        <Grid container classes={{ root }}>
            <Grid item xs={12} md={4} onClick={handlePostClick}>
                <Image
                    src={!!!props.post.image?.url ? `/logo.png` : props.post.image?.url}
                    alt={props.post.image?.name || "Blog image"}
                    width={300}
                    height={270}
                    layout="responsive"
                    className={image}
                />
            </Grid>

            <Grid item xs={12} md={7} style={{ margin: "0 24px 0 24px" }}>
                <Typography variant="subtitle1" className={marg4} onClick={handlePostClick}>
                    {props.post.title}
                </Typography>
                <Typography variant="body1" className={marg1}>
                    {props.post.description}
                </Typography>
                <Grid container direction="row" className={marg2}>
                    <BlogTagsWithFilter tags={props.post.categories.map((c) => c.name)} />
                </Grid>

                <Grid container direction="row" alignItems="center" className={publisher}>
                    <Avatar style={{ marginRight: "8px" }} src={props.post.author.picture.url || ""}></Avatar>
                    <Typography variant="body2">{props.post.author.name}</Typography>
                    <Typography variant="body2" className={date}>
                        {dateFromISO8601(props.post.published_at, router.locale)}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

PostCard.propTypes = {};

export default PostCard;
