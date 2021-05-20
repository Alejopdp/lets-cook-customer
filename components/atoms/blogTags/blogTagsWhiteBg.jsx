// Utils & Config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    tagClass: {
        backgroundColor: '#FFFFFF',
        padding: "0px 16px 0px 16px",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const BlogTagsWhiteBg = (props) => {
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



// BlogTagsWhiteBg.propTypes = {
//     tagName: propTypes.string.isRequired,
// };

export default BlogTagsWhiteBg;
