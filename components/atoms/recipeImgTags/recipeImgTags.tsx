import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { useStyles } from './styles';
import { RecipeImgTagsProps } from "./interfaces";

export const RecipeImgTags = (props: RecipeImgTagsProps) => {
    const classes = useStyles();
    const { imgTag, textWhite } = classes;

    return (
        <Box style={{ display: 'flex' }}>
            {props.imgTags.map((tag, index) => (
                <Typography key={index} variant="subtitle2" style={{ marginRight: '4px', fontSize:'12px' }} className={clsx(imgTag, textWhite)}>
                    {tag}
                </Typography>
            ))}
        </Box>
    );
};

export default RecipeImgTags;
