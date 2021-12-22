// Utils & Config
import React, { useState } from "react";
// External components
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { BlogTagsProps } from "./interfaces";
import { useRouter } from "next/router";

export const BlogTagsWithFilter = (props: BlogTagsProps) => {
    const router = useRouter();
    const classes = useStyles();
    const { tagClass } = classes;
    const [tags, setTags] = useState(props.tags);

    return (
        <>
            {tags.map((tag, index) => (
                <Typography
                    key={index}
                    variant="body1"
                    className={tagClass}
                    onClick={() => router.push({ pathname: `/blogs/recetas/tagged/${tag.slug}` }, undefined, { shallow: true })}
                >
                    {tag.name}
                </Typography>
            ))}
        </>
    );
};

export default BlogTagsWithFilter;
