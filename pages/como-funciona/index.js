// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
const langs = require("../../lang").comoFunciona;

// Internal components
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import Benefits from "../../components/molecules/benefits/benefits";
import HowItWorksExtended from "../../components/molecules/howItWorksExtended/howItWorksExtended";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100vw",
        backgroundColor: theme.palette.background.default,
    },
}));

const ComoFunciona = () => {
    const classes = useStyles();
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <div className={classes.root}>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />

            {/*
                No creo que esto sea la solución más elegante
                Pero es lo unico que se me ocurrió sin saber cómo van a venir los datos!
                Cualquier cosa me chiflan y vemos como lo acomodamos! -Lionel
            */}
            <HowItWorksExtended
                title={lang.howTitle}
                subtitle={lang.howSubtitle}
                direction="row-reverse"
            />

            <HowItWorksExtended
                title={lang.howTitle}
                subtitle={lang.howSubtitle}
                direction="row"
            />

            {/* <Benefits /> */}
        </div>
    );
};

export default ComoFunciona;
