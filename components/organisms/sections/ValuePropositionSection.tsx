import { makeStyles, Typography, useTheme, Grid, Container } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import { CircularBotton } from "@atoms";
import ArrowIcon from "@material-ui/icons/ExpandMore";
import { useValuePropositionStyle as useStyles } from "./styles";
import { useRouter } from "next/router";
import * as ga from "../../../helpers/ga";
import { localeRoutes, Routes } from "lang/routes/routes";

export const ValuePropositionSection = (props) => {
    const lang = props.lang;
    const classes = useStyles();
    const router = useRouter();

    const goToPlans = () => {
        ga.event({
            action: "clic en ver planes",
            params: {
                event_category: "homepage",
                event_label: "banner principal",
            },
        });
        router.push({ pathname: localeRoutes[router.locale][Routes.planes] }, localeRoutes[router.locale][Routes.planes], {
            locale: router.locale,
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1">{lang.title}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">{lang.subtitle}</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.buttonWithCaptionGrid}>
                            <RoundedButton label={lang.btnText} onClick={goToPlans} />
                            <Typography variant="caption" className={classes.marginTop2}>
                                {lang.btnCaption}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

export default ValuePropositionSection;
