// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External components
import Typography from "@material-ui/core/Typography";

// Internal Components
import GeneralBox from "../../atoms/generalBox/generalBox";
import TextButton from "../../atoms/textButton/textButton";

const BoxWithTitleAndTextButton = (props) => {
    const theme = useTheme();

    return (
        <GeneralBox variant="medium">
            <div style={{ width: "100%" }}>
                <Typography variant="h6" color="textSecondary" style={{ fontSize: "20px", marginBottom: theme.spacing(2) }}>
                    {props.title}
                </Typography>
                {props.children}
            </div>
            {!props.hideButton && (
                <TextButton btnText={props.btnText} style={{ marginTop: theme.spacing(3) }} handleClick={props.handleClick} />
            )}
        </GeneralBox>
    );
};

BoxWithTitleAndTextButton.propTypes = {
    title: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    hideButton: PropTypes.bool,
};

export default BoxWithTitleAndTextButton;
