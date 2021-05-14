// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";
const langs = require("../../lang").preguntasFrecuentes;

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import SimpleAccordion from "../../components/atoms/accordion/accordion";
import SearchBar from "../../components/atoms/searchBar/searchBar";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100vw",
        backgroundColor: theme.palette.background.default,
    },
    padd1: {
        paddingBottom: theme.spacing(1),
    },
    padd2: {
        paddingBottom: theme.spacing(2),
    },
    padd4: {
        paddingBottom: theme.spacing(4),
    },
    padd8: {
        paddingBottom: theme.spacing(8),
    },
    align: {
        textAlign: "center",
    },
    margin0: {
        maxWidth: "100vw",
        margin: "0 auto",
    },
}));

const preguntasFrecuentes = () => {
    const classes = useStyles();
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <div className={classes.root}>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />

            <SearchBar />

            <Grid
                container
                spacing={4}
                justify="center"
                alignItems="center"
                className={clsx(classes.padd2, classes.margin0)}
            >
                <Grid item xs={12} sm={5}>
                    <Typography variant="h6">Tema 1</Typography>
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Typography variant="h6">Tema 2</Typography>
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                justify="center"
                alignItems="center"
                className={clsx(classes.padd8, classes.margin0)}
            >
                <Grid item xs={12} sm={5}>
                    <Typography variant="h6">Tema 3</Typography>
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Typography variant="h6">Tema 4</Typography>
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                    <SimpleAccordion
                        question={lang.question}
                        answer={lang.answer}
                    />
                </Grid>
            </Grid>

            <Grid
                container
                spacing={4}
                direction="column"
                alignItems="center"
                className={clsx(classes.align, classes.margin0)}
            >
                <Grid item xs={12} sm={12}>
                    <Typography variant="h5" className={classes.padd1}>
                        {lang.doubt}
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={8}>
                    <Typography
                        variant="body1"
                        color="textSecondary"
                        className={classes.padd4}
                    >
                        {lang.doubtAnswer}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default preguntasFrecuentes;
