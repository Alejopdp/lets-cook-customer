// Utils & config
import React from "react";
import PropTypes from "prop-types";

// External components
import Box from "@material-ui/core/Box";
import { IconButton, makeStyles, Typography, useTheme } from "@material-ui/core";
import Image from "next/image";

// Internal components

// Icons & images
import EditIcon from "@material-ui/icons/Edit";
import { PlanSelectorProps } from "./interface";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        alignItems: "center",
    },
    text: {
        fontSize: "18px",
        fontWeight: 600,
    },
    chip: {
        textTransform: "uppercase",
        fontWeight: 500,
        color: "white",
    },
    chipStatusActive: {
        backgroundColor: theme.palette.primary.main,
    },
    chipStatusCancelled: {
        backgroundColor: "#FC1919",
    },
    chipStatusExpired: {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const PlanSelector = (props: PlanSelectorProps) => {
    const classes = useStyles();
    const theme = useTheme();
    return (
        <Box display="flex" paddingY={4} borderBottom="2px dashed #E5E5E5">
            <Box marginRight={3}>
                <Image src={props.planIcon} alt={props.planName} width={32} height={32} />
            </Box>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Typography variant="body1" className={classes.text}>
                        {props.planName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                        {props.planVariantLabel}
                    </Typography>
                </Box>
                <IconButton style={{ marginRight: -12, marginTop: -12 }}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
};

PlanSelector.propTypes = {};

export default PlanSelector;
