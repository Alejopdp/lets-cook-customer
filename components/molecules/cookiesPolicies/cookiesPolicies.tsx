import React from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@material-ui/core';
import { policyList } from '@utils/cookiesPolicies';
import TitleWithBackButton from '@atoms/TitleWithBackButton';

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    width: '100%',
    [theme.breakpoints.down('md')]: {
      paddingRight: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(8),
      paddingLeft: theme.spacing(8),
      paddingTop: theme.spacing(4),
    },
    marginTop: '40px',
    marginBottom: '40px',
  },
}));

export default function CookiesPolicies() {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter();

  const backButtonAction = () => {
    router.back();
  };

  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={classes.grid}
      >
        <Grid item xs={12} style={{ marginBottom: '30px' }}>
          <TitleWithBackButton title="Políticas de cookies" backButtonAction={backButtonAction} />
        </Grid>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          {policyList.map((policy) => {
            return (
              <Grid item xs={12} key={policy.title} style={{ marginBottom: '20px' }}>
                <Typography variant="h5" style={{ marginBottom: '10px' }}>
                  {policy.title}
                </Typography>
                <Typography variant="body1">{policy.text}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
}
