// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    tag: {
        backgroundColor: theme.palette.background.default,
        // backgroundColor: "#f9f9f9",
        padding: "0px 16px 0px 16px",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const BlogTag = (props) => {
    const classes = useStyles();

    const { tag } = classes;

    return (
        <Typography variant="body1" className={tag}>
            {props.tagName}
        </Typography>
    );
};

// BlogTag.propTypes = {
//     tagName: propTypes.string.isRequired,
// };

export default BlogTag;
