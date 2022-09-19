// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

// External components
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    subttl: {
        marginTop: theme.spacing(1),
        textAlign: "center",
    },
}));

interface TitleBuyFlow {
    title: string;
    subtitle: string;
}

export const TitleBuyFlow = ({ title, subtitle }: TitleBuyFlow) => {
    const { subttl } = useStyles();

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" color="primary" style={{ textAlign: "center", display: "flex", alignItems: "center" }}>
                    {title}
                </Typography>
            </div>
            <Typography variant="h6" className={subttl}>
                {subtitle}
            </Typography>
        </>
    );
};

export default TitleBuyFlow;
