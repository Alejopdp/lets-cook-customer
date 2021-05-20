// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    imgTag: {
        width: "max-content",
        backgroundColor: theme.palette.primary.main,
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: '600',
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
        borderRadius: "60px",
        marginRight: theme.spacing(1),
    },
    textWhite: {
        color: theme.palette.primary.contrastText,
    },

}));

const RecipeImgTags = (props) => {
    const classes = useStyles();
    const { imgTag, textWhite } = classes;

    return (
        <Box style={{ display: 'flex' }}>
            {props.imgTags.map((tag, index) => (
                <Typography key={index} variant="subtitle2" style={{ marginRight: '4px' }} className={clsx(imgTag, textWhite)}>
                    {tag}
                </Typography>
            ))}
        </Box>
    );
};

RecipeImgTags.propTypes = {

};

export default RecipeImgTags;
