// Utils & Config
import React, { useState } from "react";
// External components
import Link from "next/link";
import {Typography} from "@material-ui/core";
import { useStyles } from "./styles";
import { BlogTagsProps } from "./interfaces";

export const BlogTagsWithFilter = (props: BlogTagsProps) => {
    const classes = useStyles();
    const { tagClass } = classes;
    const [tags, setTags] = useState(props.tags);

    return (
        <>
            {tags.map((tag, index) => (
                <Link href={`/blogs/recetas/tagged/${tag.slug}`} passHref key={index}>
                    <a style={{ textDecoration: "none", color: "inherit" }}>
                        <Typography variant="body1" className={tagClass}>
                            {tag.name}
                        </Typography>
                    </a>
                </Link>
            ))}
        </>
    );
};

export default BlogTagsWithFilter;
