// Arreglar problema de scroll
// Acomodar colores
// Agregar dependencias de Home

// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

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

const preguntasFrecuentes = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center" className={classes.padd6}>
        <Typography variant="h4" className={classes.padd2}>
          Preguntas frecuentes
        </Typography>

        <Typography variant="body1" color="textSecondary" className={classes.padd4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>

        <FormControl variant="outlined" style={{ width: "60%" }}>
          <OutlinedInput
            style={{ borderRadius: "15px", backgroundColor: "white" }}
            placeholder="Buscar preguntas..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon color="secondary" />
              </InputAdornment>
            }
          />
        </FormControl>
      </Grid>

      <Grid container spacing={4} justify="center" alignItems="center" className={classes.padd2} style={{maxWidth: "100vw"}}>
        <Grid item xs={12} sm={5}>
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

        <Grid item xs={12} sm={5}>
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

      <Grid container spacing={4} justify="center" alignItems="center" className={classes.padd8} style={{maxWidth: "100vw"}}>
        <Grid item xs={12} sm={5}>
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

        <Grid item xs={12} sm={5}>
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

      <Grid
        container
        spacing={4}
        direction="column"
        justify="center"
        alignItems="center"
        style={{maxWidth: "100vw"}}
      >
        <Typography variant="h5" className={classes.padd1}>
          ¿Tienes alguna otra duda?
        </Typography>

        <Grid item xs={12} sm={8}>
          <Typography variant="body1" color="textSecondary" className={classes.padd4} style={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde molestiae deserunt exercitationem illo ducimus iste commodi voluptas ipsum fuga, odio possimus
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default preguntasFrecuentes;