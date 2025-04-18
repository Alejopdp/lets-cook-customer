// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

// Internal Components
import GeneralBox from "../../atoms/generalBox/generalBox";
import Typography from "@material-ui/core/Typography";

const BoxWithTitle = (props) => {
    const theme = useTheme();

    return (
        <GeneralBox variant="medium">
            <div style={{ width: "100%" }}>
                <Typography variant="h6" color="textPrimary" style={{ fontSize: "20px", marginBottom: theme.spacing(2) }}>
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
