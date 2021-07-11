import { makeStyles, Typography, useTheme, Grid, Container } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { CircularBotton } from '@atoms';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import { useValuePropositionStyle as useStyles } from './styles';
import { useRouter } from "next/router";


export const ValuePropositionSection = () => {
    const classes = useStyles();
    const router = useRouter();


    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                <Container maxWidth='md' className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1">Llegó la hora de redescubrir tu cocina</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Pensamos por ti <b>recetas sanas y equilibradas</b> con la mejor selección de <b>ingredientes frescos y naturales</b> y te las enviamos <b>semanalmente</b> a la puerta de tu casa</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.buttonWithCaptionGrid}>
                            <RoundedButton label="Ver planes" onClick={() => router.push("/planes")} />
                            <Typography variant="caption" className={classes.marginTop2}>Sin compromiso de permanencia</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default ValuePropositionSection;
