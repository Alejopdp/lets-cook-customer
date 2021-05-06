// Agregar dependencias de Home
// Agregar media queries

// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from "clsx";

// External components
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

// Internal components
import SimpleAccordion from '../../components/accordion/accordion';

// Icons & Images
import SearchIcon from '@material-ui/icons/Search';

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

const preguntasFrecuentes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" className={clsx(classes.padd6, classes.align)}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h4" color="primary" className={classes.padd2}>
            Preguntas frecuentes
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
          <Typography variant="body1" color="textSecondary" className={classes.padd4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
        </Grid>

        <Grid item xs={12} sm={12}>
        <FormControl variant="outlined">
          <OutlinedInput
            style={{ borderRadius: "15px", backgroundColor: "white", width: "50vw" }}
            placeholder="Buscar preguntas..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className="searchIcon" color="error" />
              </InputAdornment>
            }
          />
        </FormControl>
        </Grid>
      </Grid>

      <Grid container spacing={4} justify="center" alignItems="center" className={clsx(classes.padd2, classes.margin0)}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">
            Tema 1
          </Typography>
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6">
            Tema 2
          </Typography>
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} justify="center" alignItems="center" className={clsx(classes.padd8, classes.margin0)}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">
            Tema 3
          </Typography>
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Typography variant="h6">
            Tema 4
          </Typography>
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
          <SimpleAccordion
            question="Lorem ipsum dolor sit amet sadipscing elitr?"
            answer="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
          />
        </Grid>
      </Grid>

      <Grid container spacing={4} direction="column" alignItems="center" className={clsx(classes.align, classes.margin0)}>
        <Grid item xs={12} sm={12}>
          <Typography variant="h5" className={classes.padd1}>
            ¿Tienes alguna otra duda?
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8}>
          <Typography variant="body1" color="textSecondary" className={classes.padd4}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde molestiae deserunt exercitationem illo ducimus iste commodi voluptas ipsum fuga, odio possimus
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default preguntasFrecuentes;