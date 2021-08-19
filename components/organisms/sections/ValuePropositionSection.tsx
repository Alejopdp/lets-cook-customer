import { makeStyles, Typography, useTheme, Grid, Container } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { CircularBotton } from '@atoms';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import { useValuePropositionStyle as useStyles } from './styles';
import { useRouter } from "next/router";
import * as ga from '../../../helpers/ga'

export const ValuePropositionSection = () => {
    const classes = useStyles();
    const router = useRouter();


    const goToPlans = () => {
        ga.event({
            action: "clic en ver planes",
            params: {
                event_category: 'homepage',
                event_label: 'banner principal',
            }
        })
        router.push("/planes")
    }

    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                <Container maxWidth='md' className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1">Cocina bueno y rico cada semana</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">¿Qué hay para cenar? Enviamos ingredientes frescos en cantidades exactas con la receta para cocinar en casa.</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.buttonWithCaptionGrid}>
                            <RoundedButton label="Ver planes" onClick={goToPlans} />
                            <Typography variant="caption" className={classes.marginTop2}>Sin compromiso de permanencia</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default ValuePropositionSection;
