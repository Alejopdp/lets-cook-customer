import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Container, Grid } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { memo } from 'react';
import { useRouter } from "next/router";

import { useCallToActionStyle as useStyles } from "./styles";
import { CallToActionSectionProps } from "./interfaces";
import { useLang } from '@hooks';


export const CallToActionSection = memo((props: CallToActionSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const [lang] = useLang('homeSession')
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
                            {lang.startExperiences}
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.subtitle}
                            variant="body1"
                            align='center'
                        >
                            {lang.cookingNewRecipes}
                    </Typography>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(4) }}>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                        <RoundedButton label="Ver planes" onClick={() => router.push("/planes")} />
                        <Typography className={classes.smallText} align='center' variant="caption">
                            {lang.couldPauseOrCancelPlan}
                    </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
})

