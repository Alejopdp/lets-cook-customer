// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// External components
import { Box, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    ico: {
        marginRight: theme.spacing(2),
        color: theme.palette.primary.main,
        filter: "sepia(100%) saturate(3457%) hue-rotate(118deg) brightness(99%) contrast(102%)",
    },
    subttl: {
        marginTop: theme.spacing(1),
        textAlign: 'center'
    },
}));

interface TitleBuyFlow {
    title: string;
    subtitle: string;
}

export const TitleBuyFlow = ({ title, subtitle }: TitleBuyFlow) => {
    const { ico, subttl } = useStyles();

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" color="primary" style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
                    <img src="/icons/checkout/gracias.svg" height={40} width={40} className={ico} />
                    {title}
                </Typography>
            </div>
            <Typography variant="h6" className={subttl}>
                {subtitle}
            </Typography>
        </>
    )
}

export default TitleBuyFlow;