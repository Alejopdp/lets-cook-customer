// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";
const langs = require("../../../lang").faqsSection;

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Internal components
import SimpleAccordion from "../../atoms/accordion/accordion";

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
    maxWidth: "100vw",
    margin: "0 auto",
    marginBottom: theme.spacing(2)
  },
}));

const FaqsSection = () => {
  const classes = useStyles();
  const router = useRouter();
  const lang = langs[router.locale];

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" alignItems="center" className={classes.margin0}>
        {lang.sections.map((section, index) => (
          <Grid item xs={12} sm={5} key={index}>
            <Typography variant="h6">{section.title}</Typography>

            {section.accordions.map((accordion, index) => (
              <SimpleAccordion
                question={accordion.question}
                answer={accordion.answer}
                key={index}
              />
            ))}
          </Grid>
        ))}
      </Grid>

      <Grid container direction="column" align="center">
        <Typography variant="h5" paragraph>
          {lang.doubt}
          </Typography>

        <Typography variant="body1" color="textSecondary" >
              {lang.doubtAnswer}
        </Typography>
      </Grid>
    </div>
  );
};

export default FaqsSection;
