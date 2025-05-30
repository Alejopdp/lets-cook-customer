// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@material-ui/core/styles";

// External components
import Typography from "@material-ui/core/Typography";

// Internal Components
import GeneralBox from "../../atoms/generalBox/generalBox";
import TextButton from "../../atoms/textButton/textButton";
import Network from "../../atoms/icons/Network";
import RecipeBook from "../../atoms/icons/RecipeBook";
import Test from "../../atoms/icons/Test";
import Rating from "../../atoms/icons/Rating";

const BoxWithIconAndTextButton = (props) => {
    const theme = useTheme();
    let Icon;

    switch (props.icon) {
        case "test":
            Icon = <Test width={50} heigth={50} />;
            break;
        case "recipe-book":
            Icon = <RecipeBook width={50} heigth={50} />;
            break;
        case "rating":
            Icon = <Rating width={50} heigth={50} />;
            break;
        case "network":
            Icon = <Network width={50} heigth={50} />;
            break;
        default:
            Icon = <div />;
    }

    return (
        <GeneralBox variant="small">
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div
                    style={{
                        marginRight: theme.spacing(3),
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {Icon}
                </div>
                <div style={{ flex: 3 }}>
                    <div>{props.children}</div>
                    <TextButton
                        btnText={props.btnText}
                        handleClick={props.handleClick}
                        style={{ marginTop: theme.spacing(3), color: props.noColor ? null : theme.palette.secondary.main }}
                        startIcon={props.startIcon}
                    />
                    {!!props.textBelowTextButton && (
                        <Typography variant="body2" style={{ fontSize: "12px", fontStyle: "italic" }}>
                            {props.textBelowTextButton}
                        </Typography>
                    )}
                </div>
            </div>
        </GeneralBox>
    );
};

BoxWithIconAndTextButton.propTypes = {
    title: PropTypes.string.isRequired,
    btnText: PropTypes.string.isRequired,
    handleClick: PropTypes.func,
    textBelowTextButton: PropTypes.string,
};

export default BoxWithIconAndTextButton;
