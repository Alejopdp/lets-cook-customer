// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// External components
import { Box, Grid, Typography } from "@material-ui/core";

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

interface TitleBuyFlow {
    title: string;
    subtitle: string;
}

export const TitleBuyFlow = ({ title, subtitle }: TitleBuyFlow) => {
    const { ttl, ico, subttl } = useStyles();

    return (
        <Grid item container direction="column" align="center" justify="center">
            <Typography variant="h6" color="primary" className={ttl}>
                <Box>
                    <img src="/icons/checkout/gracias.svg" height={40} width={40} className={ico} />
                </Box>

                {title}
            </Typography>

            <Typography variant="h6" className={subttl}>
                {subtitle}
            </Typography>
        </Grid>
    )
}

export default TitleBuyFlow;