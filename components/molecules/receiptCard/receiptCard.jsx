// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

// Icons & Images
import TimerIcon from '@material-ui/icons/Timer';
import SpeedIcon from '@material-ui/icons/Speed';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
    height: 250,
    background: "rgb(0,0,0)",
    background: "linear-gradient(0deg, rgba(0,0,0,0.9444152661064426) 0%, rgba(0,0,0,0) 100%)",
    zIndex: "99"
  },
  gradient: {
    maxWidth: 350,
    height: 250,
    backgroundImage: "url(/unnamed.jpg)",
    backgroundSize: "cover",
  },
  button: {
    width: "max-content",
    backgroundColor: theme.palette.primary.main,
    textTransform: "uppercase",
    textAlign: "center",
    padding: "8px 16px 8px 16px",
    borderRadius: "30px",
  },
  tag: {
    width: "max-content",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.palette.text.primary,
    color: theme.palette.primary.contrastText,
    textAlign: "center",
    padding: "5px 8px 5px 8px",
    borderRadius: "5px",
    marginRight: theme.spacing(1)
  },
  marg: {
    marginRight: theme.spacing(1)
  },
  textWhite: {
    color: theme.palette.primary.contrastText,
  }
}));


const ReceiptCard = (props) => {
  const classes = useStyles();

  const { root, button, tag, marg, textWhite, gradient } = classes;

  return (
    <div className={gradient}>
      <Card className={root}>
        <CardContent style={{ height: "60%" }}>
          <Typography variant="subtitle2" className={clsx(button, textWhite)}>
            {props.mainTag}
          </Typography>
        </CardContent>

        <CardContent style={{ height: "40%" }}>
          <Grid container>
            <Grid item className={tag}>
              <TimerIcon color="primary" className={marg} />

              <Typography variant="subtitle2">
                {props.timeTag}
              </Typography>
            </Grid>

            <Grid item className={tag}>
              <SpeedIcon color="primary" className={marg} />

              <Typography variant="subtitle2">
                {props.difficultyTag}
              </Typography>
            </Grid>
          </Grid>

          <Typography variant="subtitle1" className={textWhite}>
            {props.recipeName}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

ReceiptCard.propTypes = {
  mainTag: PropTypes.string,
  timeTag: PropTypes.string.isRequired,
  difficultyTag: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
}

export default ReceiptCard;