import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Container, Grid } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { memo } from 'react';
import { useRouter } from "next/router";

import { useCallToActionStyle as useStyles } from "./styles";
import { CallToActionSectionProps } from "./interfaces";
import * as ga from '../../../helpers/ga'


export const CallToActionSection = memo((props: CallToActionSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    const goToPlans = () => {
        ga.event({
            action: "clic en nuestros planes",
            params: {
                event_category: props.page ? props.page : 'undefined page',
                event_label: 'call to action',
            }
        })
        router.push("/planes")
    }

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.title}
                            color="secondary"
                            variant="h3"
                            align='center'
                        >
                            Descubre tu chef interior
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.subtitle}
                            variant="body1"
                            align='center'
                        >
                            Empieza a cocinar ingredientes frescos y de proximidad con Let's cook.
                    </Typography>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(4) }}>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                        <RoundedButton label="Nuestros planes" onClick={goToPlans} />
                        <Typography className={classes.smallText} align='center' variant="caption">
                            Podrás pausar, cambiar o cancelar el plan cuando quieras
                    </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
})

