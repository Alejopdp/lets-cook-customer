// Agregar dependencias de Home

// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import LegalTextSection from "../../components/atoms/LegalTextSection/LegalTextSection";
import Footer from "../../components/molecules/footer/footer";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100vw",
        backgroundColor: theme.palette.background.default,
    },
}));

const AvisoLegal = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <TitleOtherPages title="Aviso legal" subtitle="Condiciones generales del uso del sitio web." />

            <LegalTextSection />

            <Footer />
        </div>
    );
};

export default AvisoLegal;
