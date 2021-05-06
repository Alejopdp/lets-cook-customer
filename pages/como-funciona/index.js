// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";

// External components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';
import Image from 'next/image'

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
  padd6: {
    paddingBottom: theme.spacing(6),
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
  }
}));

const comoFunciona = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" className={clsx(classes.padd4, classes.align)}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h4" color="primary" className={classes.padd2}>
            Cómo funciona
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant="body1" color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="center"
        className={clsx(classes.padd2, classes.margin0)}
      >
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1" className={classes.padd2}>
            Lorem ipsum dolor
          </Typography>

          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam modi maxime aliquid cupiditate
            sunt, numquam quae. Facilis consectetur dolorem suscipit totam magnam quos asperiores vel ducimus
            iste, ullam ut minima!
          </Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Image src="/unnamed.jpg" layout="responsive"
          width={222} height={151}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default comoFunciona;