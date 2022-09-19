import Typography from "@material-ui/core/Typography";
import { useTheme, Container, Grid } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";
import classes from "./callToActionStyles.module.scss";
import { CallToActionSectionProps } from "./interfaces";
import { localeRoutes, Routes } from "lang/routes/routes";
import useAnalytics from "hooks/useAnalytics";
const langs = require("../../../lang").callToActionSection;

export const CallToActionSection = (props: CallToActionSectionProps) => {
    const { trackCallToActionClickAtHomepage } = useAnalytics();
    const theme = useTheme();
    const router = useRouter();
    const lang = langs[router.locale];

    const goToPlans = () => {
        trackCallToActionClickAtHomepage(props.page);
        router.push(localeRoutes[router.locale][Routes.planes]);
    };

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography className={classes.title} color="primary" variant="h3" align="center">
                            {lang.title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography className={classes.subtitle} variant="body1" align="center">
                            {lang.subtitle}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(4) }}>
                    <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                        <RoundedButton label={lang.btnText} onClick={goToPlans} />
                        <Typography className={classes.smallText} align="center" variant="caption">
                            {lang.btnCaption}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};
