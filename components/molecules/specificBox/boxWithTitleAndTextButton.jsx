// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// import clsx from "clsx";

// External components
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

// Internal Components
import GeneralBox from "../../atoms/generalBox/generalBox";
import TextButton from "../../atoms/textButton/textButton";

// Icons & Images



const useStyles = makeStyles((theme) => ({

}));

const BoxWithTitleAndTextButton = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <GeneralBox variant='medium'>
            <div style={{width:'100%'}}>
                <Typography variant='subtitle1' color='textSecondary' style={{ fontSize: '20px', marginBottom: theme.spacing(2) }}>
                    {props.title}
                </Typography>
                {props.children}
            </div>
            <TextButton btnText={props.btnText} style={{ marginTop: theme.spacing(3) }} handleClick = {props.handleClick}/>
        </GeneralBox>
    );
};

BoxWithTitleAndTextButton.propTypes = {
    title: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
};

export default BoxWithTitleAndTextButton;