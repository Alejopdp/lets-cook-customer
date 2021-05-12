// Utils & Config
import React from 'react';

// External components
import Grid from '@material-ui/core/Grid';

// Internal Components
import TitleOtherPages from '../../components/molecules/titleOtherPages/titleOtherPages';
import ReceiptCard from '../../components/molecules/receiptCard/receiptCard'

const Recetas = () => {
  return (
    <div>
      <TitleOtherPages
        title="Menú semanal"
        subtitle="Cada semana cambiamos el menú con nuevas recetas"
      />

      <Grid
        container
        direction="row"
        justify="center"
        alignItems="flex-start"
        spacing={1}
      >
        <Grid item>
          <ReceiptCard
            mainTag={"Más vendido"}
            timeTag={"15 min"}
            difficultyTag={"Fácil"}
            recipeName={"Salmón con quinoa"}
          />
        </Grid>

        <Grid item>
          <ReceiptCard
            mainTag={"Más vendido"}
            timeTag={"15 min"}
            difficultyTag={"Fácil"}
            recipeName={"Salmón con quinoa"}
          />
        </Grid>

        <Grid item>
          <ReceiptCard
            mainTag={"Más vendido"}
            timeTag={"15 min"}
            difficultyTag={"Fácil"}
            recipeName={"Salmón con quinoa"}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default Recetas;
