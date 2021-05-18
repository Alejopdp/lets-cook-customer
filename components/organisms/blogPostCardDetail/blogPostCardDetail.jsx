// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Parser from 'html-react-parser';
import { dateFromISO8601 } from '../../../helpers/utils/date';
import { useRouter } from "next/router";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
// import BlogTag from "../../atoms/blogTag/blogTag";

// Icons & Images
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Image from "next/image";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
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
    gridContent: {
        whiteSpace: 'break-spaces',
        overflowWrap: 'break-word',
        '& iframe': {
            width: '100%'
        }
    }
}));

const BlogPostCardDetail = ({ post }) => {
    const classes = useStyles();
    const router = useRouter();
    const { root, image, marg1, marg2, publisher, date, tags, gridContent } = classes;
    console.log('post', post)

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <div>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_BLOG_API_URL}${post.image.url}`}
                            alt={post.image.name}
                            width={700}
                            height={350}
                            layout="responsive"
                            className={image}
                        />
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" className={marg2}>
                        {post.title}
                    </Typography>
                    <Typography variant="body1" className={marg1}>
                        {post.description}
                    </Typography>
                    <Grid container alignItems="center" className={publisher}>
                        <Avatar style={{ marginRight: "8px" }}>{post.author.picture.formats.large.url}</Avatar>
                        <Typography variant="body2" style={{ marginRight: "130px" }}>
                            {post.author.name}
                        </Typography>
                        <Typography variant="body2" className={date}>
                            {dateFromISO8601(post.publishedAt, router.locale)}
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12} className={gridContent}>
                    {Parser(post.content)}
                </Grid>
            </Grid>
        </>
    );
};

export default BlogPostCardDetail;
