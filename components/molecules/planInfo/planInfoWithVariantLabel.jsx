// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// External components
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
    },
    textContainer: {
        marginLeft: theme.spacing(2),
    },
    text: {
        fontSize: "18px",
        fontWeight: 600,
        marginBottom: theme.spacing(0.5)
    },
}));

const PlanInfoWithVariantLabel = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.container} style={props.style}>
            <Image unoptimized src={props.planIcon} width={32} height={32} />
            <div className={classes.textContainer}>
                <Typography variant="body1" className={classes.text}>
                    {props.planName}
                </Typography>
                <Typography variant="body2">
                    {props.planVariantLabel}
                </Typography>
            </div>
        </Box>
    );
};

PlanInfoWithVariantLabel.propTypes = {
    // btnText: PropTypes.string.isRequired,
};

export default PlanInfoWithVariantLabel;
