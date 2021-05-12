// Utils & Config
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Internal components
import TitleOtherPages from '../../components/molecules/titleOtherPages/titleOtherPages';
import Benefits from '../../components/molecules/benefits/benefits';
import HowItWorksExtended from '../../components/molecules/howItWorksExtended/howItWorksExtended';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.default,
  },
}));

const ComoFunciona = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TitleOtherPages
        title="Cómo funciona"
        subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
      />

      {/*
        No creo que esto sea la solución más elegante
        Pero es lo unico que se me ocurrió sin saber cómo van a venir los datos!
        Cualquier cosa me chiflan y vemos como lo acomodamos! -Lionel
      */}
      <HowItWorksExtended
        title={"Lorem ipsum dolor"}
        subtitle={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam modi maxime aliquid cupiditate sunt, numquam quae. Facilis consectetur dolorem suscipit totam magnam quos asperiores vel ducimus iste, ullam ut minima!"}
        direction="row-reverse" />

      <HowItWorksExtended
        title={"Lorem ipsum dolor"}
        subtitle={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam modi maxime aliquid cupiditate sunt, numquam quae. Facilis consectetur dolorem suscipit totam magnam quos asperiores vel ducimus iste, ullam ut minima!"}
        direction="row"
      />

      <Benefits />
    </div>
  );
}

export default ComoFunciona;