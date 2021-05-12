// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";

// External components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Image from 'next/image'

// Icons & Images
import LocalCafeIcon from '@material-ui/icons/LocalCafe';

const useStyles = makeStyles((theme) => ({
  paddLeft: {
    // margin: theme.spacing(2),
    // marginBottom: "40px"
  }
}));

const Benefits = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      <Grid container direction="column" alignItems="center" justify="center">

        <Typography variant="subtitle1" color="textSecondary">
        <LocalCafeIcon className={classes.paddLeft}/>
          Productos frescos y de proximidad
        </Typography>

        <Grid item>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam modi maxime aliquid cupiditate sunt,
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default Benefits;