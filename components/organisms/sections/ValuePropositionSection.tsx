import { makeStyles, Typography, useTheme, Grid, Container } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { CircularBotton } from '@atoms';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import { useValuePropositionStyle as useStyles } from './styles';
import { useRouter } from "next/router";
import { useLang } from '@hooks';

export const ValuePropositionSection = () => {
    const classes = useStyles();
    const router = useRouter();
    const [lang] = useLang('homeSession');

    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                <Container maxWidth='md' className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1">{lang.researchYourCook}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{lang.message_thinkByYou}<b>{lang.message_recipesHealthy}</b>{lang.message_withBetterSelection}<b>{lang.message_ingredients}</b>{lang.message_send}<b>{lang.message_weekly}</b>{lang.message_doorYourHome}</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.buttonWithCaptionGrid}>
                            <RoundedButton label={lang.seePlans} onClick={() => router.push("/planes")} />
                            <Typography variant="caption" className={classes.marginTop2}>{lang.withoutObligation}</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default ValuePropositionSection;
