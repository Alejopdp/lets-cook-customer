// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        overflowWrap: "anywhere",
    },
    variantSmall: {
        padding: theme.spacing(2),
    },
    variantMedium: {
        padding: theme.spacing(3),
        [theme.breakpoints.down("md")]: {
            padding: theme.spacing(2),
        },
    },
}));

const GeneralBox = (props) => {
    const classes = useStyles();

    let variant;
    switch (props.variant) {
        case "small":
            variant = classes.variantSmall;
            break;
        case "medium":
            variant = classes.variantMedium;
            break;
        default:
            variant = classes.variantMedium;
            break;
    }

    return <Box className={clsx(classes.box, variant)}>{props.children}</Box>;
};

GeneralBox.propTypes = {};

export default GeneralBox;
