import React, { useState } from 'react'
import { Typography, useTheme, Grid, Container } from '@material-ui/core';
import { TextInput, RoundedButton } from "@atoms";

import GeneralBox from '../../../../components/atoms/generalBox/generalBox'
import { CircularBotton } from '@atoms';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import { useStyles } from './styles';
import { useRouter } from "next/router";
import PlanSize from '../../../../components/molecules/planSize/planSize';
import RecipesCalculation from '../../../../components/molecules/recipesCalculation/recipesCalculation';

export const ExchangeBonoRegaloCodeInput = () => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();


    return (
        <Container maxWidth='lg'>
            <Grid container justifyContent='center'>
                <div className={classes.divContainer}>
                    <Grid item xs={12} sm={8} md={6} style={{ margin: 'auto' }}>
                        <GeneralBox variant='large'>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">Ingresa el código del bono regalo</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextInput
                                        name="addressDetails"
                                        label="Piso / puerta / aclaraciones"
                                        disabled={false}
                                        value='value'
                                        onChange={e => alert(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} style={{ textAlign: "center", marginTop: theme.spacing(2) }}>
                                    <RoundedButton
                                        label="Canjear Bono Regalo"
                                        // onClick={() => buyFlow.forward()}
                                        style={{ padding: `${theme.spacing(2.5)}px ${theme.spacing(8)}px`, width: '100%' }}
                                    />
                                </Grid>
                            </Grid>
                        </GeneralBox>
                    </Grid>
                </div>
            </Grid>
        </Container>
    );
}

export default ExchangeBonoRegaloCodeInput;