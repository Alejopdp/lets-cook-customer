// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";
const langs = require("../../../lang").faqsSection;

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import SimpleAccordion from "../../atoms/accordion/accordion";
import EmptyState from "../../molecules/emptyState/emptyState";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "100vw",
        backgroundColor: theme.palette.background.default,
    },
    padd1: {
        marginBottom: theme.spacing(1),
    },
    padd2: {
        marginBottom: theme.spacing(2),
    },
    padd4: {
        marginBottom: theme.spacing(4),
    },
    padd8: {
        marginBottom: theme.spacing(8),
    },
    align: {
        textAlign: "center",
    },
    margin0: {
        maxWidth: "93vw",
        margin: "0 auto",
        marginBottom: theme.spacing(2),
    },
    faqsContainer: {
        height: "fit-content",
        marginBottom: theme.spacing(2),
    }
}));

const FaqsSection = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const lang = langs[router.locale];

    const filteredSections = props.searchValue
        ? lang.sections
            .filter((section) =>
                section.accordions
                    .filter((accordion) => accordion.question.toUpperCase().indexOf(props.searchValue.toUpperCase()) > -1)
                    .some((accordion) => accordion.question.toUpperCase().indexOf(props.searchValue.toUpperCase()) > -1)
            )
            .map((section) => {
                return {
                    ...section,
                    accordions: section.accordions.filter(
                        (accordion) => accordion.question.toUpperCase().indexOf(props.searchValue.toUpperCase()) > -1
                    ),
                };
            })
        : lang.sections;


    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={3}
                justify="center"
                alignItems="start"
                // className={classes.margin0}
                style={{ marginBottom: theme.spacing(10) }}
            >
                {filteredSections.length === 0 ? (
                    <EmptyState title={lang.emptyState.title} text={lang.emptyState.text} />
                ) : (
                        <>
                            {filteredSections.map((section, index) => (
                                <Grid item xs={12} sm={6} key={index} className={classes.faqsContainer}>
                                    <Typography variant="h6">
                                        {section.title}
                                    </Typography>
                                    {section.accordions.map((accordion, index) => (
                                        <SimpleAccordion question={accordion.question} answer={accordion.answer} key={index} />
                                    ))}
                                </Grid>
                            ))}
                        </>
                    )}
            </Grid>

            <Grid container direction="column" align="center">
                <Typography variant="h5" paragraph>
                    {lang.doubt}
                </Typography>

                <Typography variant="body1" color="textSecondary">
                    {lang.doubtAnswer}
                </Typography>
            </Grid>
        </div>
    );
};

export default FaqsSection;
