// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// Internal Components
import GeneralBox from "../../atoms/generalBox/generalBox";
import TextButton from "../../atoms/textButton/textButton";

type BoxWithTextButtonProps = {
    hideButton: boolean;
    status?: "SUBSCRIPTION_DELIVERED" | "SUBSCRIPTION_CANCELLED" | "SUBSCRIPTION_ACTIVE";
    btnText?: string;
    children: React.ReactNode;
    handleClick?: () => void;
    style?: React.CSSProperties;
};

const BoxWithTextButton = (props: BoxWithTextButtonProps) => {
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

export default BoxWithTextButton;
