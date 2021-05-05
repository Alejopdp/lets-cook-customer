// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// External components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.default,
  },
  padd1: {
    paddingBottom: theme.spacing(1)
  },
  padd2: {
    paddingBottom: theme.spacing(2)
  },
  padd4: {
    paddingBottom: theme.spacing(4)
  },
  padd6: {
    paddingBottom: theme.spacing(6)
  },
  padd8: {
    paddingBottom: theme.spacing(8)
  }
}));

const comoFunciona = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" className={classes.padd6}>
        <Typography variant="h4" className={classes.padd2}>
          Cómo funciona
        </Typography>

        <Typography variant="body1" color="textSecondary" className={classes.padd4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </Grid>

      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.padd2}
        // style={{ maxWidth: "100vw" }}
      >
        <Grid item xs={12} sm={3}>
          <Typography variant="subtitle1">
            Lorem ipsum dolor
          </Typography>

          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam modi maxime aliquid cupiditate
            sunt, numquam quae. Facilis consectetur dolorem suscipit totam magnam quos asperiores vel ducimus
            iste, ullam ut minima!
          </Typography>
        </Grid>

        <Grid item xs={12} sm={3}>
          <Box border={2} width={400} height={250}></Box>
        </Grid>
      </Grid>
    </div>
  );
}

export default comoFunciona;