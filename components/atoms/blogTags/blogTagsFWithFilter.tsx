// Utils & Config
import React, { useState } from "react";
// External components
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./styles";
import { BlogTagsProps } from "./interfaces";

export const BlogTagsWithFilter = (props: BlogTagsProps) => {
    const classes = useStyles();
    const { tagClass } = classes;
    const [tags, setTags] = useState(props.tags)

    // const filteredTags = tags.splice(4);

    // const handleSeeMoreTags = () => {
    //     setTags(...tags, filteredTags)
    // }

    return (
        <>
            {tags.map((tag, index) => (
                <Typography variant="body1" className={tagClass}>
                    {tag}
                </Typography>
            ))}
        </>

    );
};

export default BlogTagsWithFilter;