import React, { useState } from 'react'
import { Typography, useTheme, Grid, Container } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import GeneralBox from '../../../../components/atoms/generalBox/generalBox'
import { CircularBotton } from '@atoms';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './styles';
import { useRouter } from "next/router";
import PlanSize from '../../../../components/molecules/planSize/planSize';
import RecipesCalculation from '../../../../components/molecules/recipesCalculation/recipesCalculation';

export const BonoRegaloSelector = () => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const [bonoRegaloBuyFlow, setBonoRegaloBuyFlow] = useState({
        form: {
            variant: {
                numberOfPersons: 2,
                numberOfRecipes: 2,
                price: 5,
                priceWithOffer: 3
            }
        }
    })

    const planSize = {
        2: [2, 3]
    }

    const handleOnSelectPeopleQty = (qty) => {

    };

    const handleOnSelectRecipeQty = (qty) => {

    };


    const divider = {
        height: 1,
        width: '100%',
        margin: 'auto',
        backgroundImage: "url(\"data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='transparent' stroke='%23c7c7c7' stroke-width='1' stroke-dasharray='10' stroke-dashoffset='96' stroke-linecap='butt'/%3e%3c/svg%3e\")"
    }
    return (
        <Container maxWidth='lg'>
            <Grid container>
                <div className={classes.divContainer}>
                    <Grid item xs={12} sm={8} md={6} style={{ margin: 'auto' }}>
                        <GeneralBox variant='large'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Elige el tamaño de tu plan</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <PlanSize
                                        name="peopleQty"
                                        subtitle={"Cantidad de personas"}
                                        fromArray={Object.keys(planSize)}
                                        valueSelected={`${bonoRegaloBuyFlow.form.variant ?.numberOfPersons}`}
                                        handleOnChange={handleOnSelectPeopleQty}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <PlanSize
                                        name="recipeQty"
                                        subtitle="Cantidad de recetas por semana"
                                        fromArray={planSize[bonoRegaloBuyFlow.form.variant ?.numberOfPersons]}
                                        valueSelected={`${bonoRegaloBuyFlow.form.variant ?.numberOfRecipes}`}
                                        handleOnChange={handleOnSelectRecipeQty}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <div style={divider} />
                                </Grid>
                                <Grid item xs={12} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                    <RecipesCalculation
                                        recipesQty={bonoRegaloBuyFlow.form.variant ?.numberOfRecipes}
                                        peopleQty={bonoRegaloBuyFlow.form.variant ?.numberOfPersons}
                                        totalPrice={bonoRegaloBuyFlow.form.variant ?.priceWithOffer || buyFlow.form.variant ?.price}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "center", marginTop: theme.spacing(4) }}>
                                    <RoundedButton
                                        label="Seleccionar plan"
                                        // onClick={() => buyFlow.forward()}
                                        style={{ padding: `${theme.spacing(2.5)}px ${theme.spacing(8)}px`, width: '100%'  }}
                                    />
                                    <Typography variant="body2" color="textSecondary" style={{ marginTop: theme.spacing(2) }}>
                                        La entrega dentro del área metropolitana de Barcelona es gratuita. El bono tiene una validez de 6 meses a partir de la fecha de compra.
                        </Typography>
                                </Grid>
                            </Grid>
                        </GeneralBox>
                    </Grid>
                </div>
            </Grid>
        </Container>
    );
}

export default BonoRegaloSelector;