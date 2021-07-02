import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Container, Grid } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { memo } from 'react';

import { useCallToActionStyle as useStyles } from "./styles";
import { CallToActionSectionProps } from "./interfaces";


export const CallToActionSection = memo((props: CallToActionSectionProps) => {

    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.title}
                            color="secondary"
                            variant="h5"
                            align='center'
                        >
                            Comienza la experiencia Let’s Cook ahora
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.subtitle}
                            variant="body1"
                            align='center'
                        >
                            Cociná nuevas recetas todas las semanas con ingredientes frescos y naturales
                    </Typography>
                    </Grid>
                    {/* <RoundedButton label="Ver planes" />
                    <Typography
                        className={classes.smallText}
                        variant="caption">
                        Podrás pausar, cambiar o cancelar el plan cuando quieras
                </Typography> */}
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(4) }}>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                        <RoundedButton label="Ver planes" />
                        <Typography className={classes.smallText} align='center' variant="caption">
                            Podrás pausar, cambiar o cancelar el plan cuando quieras
                    </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
})

