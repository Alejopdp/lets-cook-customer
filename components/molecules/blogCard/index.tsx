import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

interface BlogCardProps {
    title: string;
    subtitle: string;
    path: string;
    imagePath: string;
}

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
    marg4: {
        marginTop: theme.spacing(4),
        cursor: "pointer",
    },
}));

const BlogCard = ({ title, subtitle, path, imagePath }: BlogCardProps) => {
    const { root, image, marg1, marg4 } = useStyles();
    const router = useRouter();

    const handleCardClick = () => router.push(path);
    return (
        <Grid container classes={{ root }}>
            <Grid item xs={12} md={4} onClick={handleCardClick}>
                <Image src={imagePath ?? `/logo.png`} alt={"Blog image"} width={1920} height={1280} layout="responsive" className={image} />
            </Grid>

            <Grid item xs={12} md={7} style={{ margin: "0 24px 0 24px" }}>
                <Link href={path}>
                    <a style={{ textDecoration: "none", color: "inherit" }}>
                        <Typography variant="h2" style={{ fontSize: "22px" }} className={marg4} onClick={handleCardClick}>
                            {title}
                        </Typography>
                    </a>
                </Link>
                <Typography variant="body1" className={marg1}>
                    {subtitle}
                </Typography>
            </Grid>
        </Grid>
    );
};

BlogCard.propTypes = {};

export default BlogCard;
