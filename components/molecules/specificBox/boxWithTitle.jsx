// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";

// External components

// Internal Components
import GeneralBox from "../../atoms/generalBox/generalBox";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles((theme) => ({

}));

const BoxWithTitle = (props) => {
    const classes = useStyles();

    return (
        <GeneralBox variant='medium'>
            <div>
                <Typography variant='subtitle1' color='textSecondary' style={{ fontSize: '20px' }}>
                    {props.title}
                </Typography>
                {props.children}
            </div>
        </GeneralBox>
    );
};

BoxWithTitle.propTypes = {
    title: PropTypes.string.isRequired,
};

export default BoxWithTitle;