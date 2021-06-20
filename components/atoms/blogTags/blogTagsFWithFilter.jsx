// Utils & Config
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import propTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    tagClass: {
        backgroundColor: theme.palette.background.default,
        padding: "0px 16px 0px 16px",
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
}));

const BlogTagsWithFilter = (props) => {
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



// BlogTagsWithFilter.propTypes = {
//     tagName: propTypes.string.isRequired,
// };

export default BlogTagsWithFilter;
