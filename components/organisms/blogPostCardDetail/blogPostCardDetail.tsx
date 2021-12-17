// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Parser from "html-react-parser";
import { dateFromISO8601 } from "../../../helpers/utils/date";
import { useRouter } from "next/router";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import { BlogTagsWhiteBg } from "@atoms";

// Icons & Images
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";
import { Post } from "types/post";

const useStyles = makeStyles((theme) => ({
    image: {
        borderRadius: "8px",
    },
    date: {
        marginLeft: theme.spacing(4),
        [theme.breakpoints.down("xs")]: {
            marginLeft: theme.spacing(2),
        },
    },
    gridContent: {
        marginTop: theme.spacing(6),
        whiteSpace: "break-spaces",
        overflowWrap: "break-word",
        "& iframe": {
            width: "100%",
        },
    },
}));

interface BlogPostCardDetailProps {
    post: Post;
}

const BlogPostCardDetail = ({ post }) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const { image, date, gridContent } = classes;

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h4">{post.title}</Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(1) }}>
                    <Typography variant="body1">{post.description}</Typography>
                </Grid>

                <Grid item xs={12} style={{ marginTop: theme.spacing(3) }}>
                    <Image
                        src={!!!post.image?.url ? `/logo.png` : post.image?.url}
                        alt={post.image?.name || "Blog image"}
                        width={700}
                        height={350}
                        layout="responsive"
                        className={image}
                    />
                </Grid>
                <Grid item xs={12} style={{ marginTop: theme.spacing(3), display: "flex" }} alignItems="center">
                    <Avatar style={{ marginRight: theme.spacing(1) }}>{post.author.picture?.formats?.large?.url}</Avatar>
                    <Typography variant="body2" style={{ marginRight: "0px" }}>
                        {post.author.name}
                    </Typography>
                    <Typography variant="body2" className={date}>
                        {dateFromISO8601(post.published_at, router.locale)}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} className={gridContent}>
                    {Parser(post.content)}
                </Grid>
            </Grid>
            <Grid container direction="row" style={{ marginTop: theme.spacing(3) }}>
                <BlogTagsWhiteBg tags={post.categories.map((c) => c.name)} />
            </Grid>
        </>
    );
};

export default BlogPostCardDetail;
