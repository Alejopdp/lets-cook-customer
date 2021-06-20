// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import { Box, Grid, Typography } from "@material-ui/core";
import Image from "next/image";

const useStyles = makeStyles((theme) => ({
    ttl: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    ico: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
        filter: "sepia(100%) saturate(3457%) hue-rotate(118deg) brightness(99%) contrast(102%)",
    },
    subttl: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
}));

const TitleBuyFlow = ({ title, subtitle }) => {
    const { ttl, ico, subttl } = useStyles();

    return (
        <Grid item container direction="column" align="center" justify="center">
            <Typography variant="h6" color="primary" className={ttl}>
                <Box>
                    <img src="/icons/checkout/gracias.svg" height={40} width={40} fill="red" className={ico} />
                </Box>

                {title}
            </Typography>

            <Typography variant="h6" className={subttl}>
                {subtitle}
            </Typography>
        </Grid>
    )
}

TitleBuyFlow.propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
};

export default TitleBuyFlow;