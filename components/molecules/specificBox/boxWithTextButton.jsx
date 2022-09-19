// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Internal Components
import GeneralBox from "../../atoms/generalBox/generalBox";
import TextButton from "../../atoms/textButton/textButton";

const BoxWithTextButton = (props) => {
    const theme = useTheme();

    return (
        <GeneralBox variant="medium">
            <div style={{ width: "100%" }}>{props.children}</div>
            {!props.hideButton && (
                <TextButton
                    handleClick={props.handleClick}
                    btnText={props.btnText}
                    style={{
                        marginTop: theme.spacing(3),
                        color:
                            props.status === "SUBSCRIPTION_DELIVERED" || props.status === "SUBSCRIPTION_CANCELLED"
                                ? theme.palette.primary.main
                                : null,
                    }}
                />
            )}
        </GeneralBox>
    );
};

BoxWithTextButton.propTypes = {
    btnText: PropTypes.string.isRequired,
};

export default BoxWithTextButton;
