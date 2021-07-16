// Utils & Config
import React from "react";
import PropTypes from "prop-types";
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
    text: {
        fontSize: "18px",
        fontWeight: 600,
        marginLeft: theme.spacing(1.5),
    },
}));

const PlanInfo = (props) => {
    const classes = useStyles();

    return (
        <Box className={classes.container} style={props.style}>
            <Image src={props.planIcon} width={32} height={32} />
            <Typography variant="body1" className={classes.text}>
                {props.planName}
            </Typography>
        </Box>
    );
};

PlanInfo.propTypes = {
    // btnText: PropTypes.string.isRequired,
};

export default PlanInfo;
