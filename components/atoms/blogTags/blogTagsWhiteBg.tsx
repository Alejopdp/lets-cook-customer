// Utils & Config
import React from "react";
import { Typography } from "@material-ui/core";
import { BlogTagsProps } from "./interfaces";
import { useStyles } from "./styles";

export const BlogTagsWhiteBg = (props: BlogTagsProps) => {
    const classes = useStyles();
    const { tagClass } = classes;
    return (
        <>
            {props.tags.map((tag, index) => (
                <Typography variant="body1" className={tagClass}>
                    {tag}
                </Typography>
            ))}
        </>
    );
};
