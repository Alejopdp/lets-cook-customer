import { Typography, Grid, Container, useMediaQuery } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import classes from "./styles.module.scss";
import { useRouter } from "next/router";
import { localeRoutes, Routes } from "lang/routes/routes";
import Image from "next/image";
import useAnalytics from "hooks/useAnalytics";

export const ValuePropositionSection = (props) => {
    const { trackHomepageBannerViewPlansclick } = useAnalytics();
    const lang = props.lang;
    const router = useRouter();
    const isMdUp = useMediaQuery("(min-width:900px)");

    const goToPlans = () => {
        trackHomepageBannerViewPlansclick();
        router.push({ pathname: localeRoutes[router.locale][Routes.planes] }, localeRoutes[router.locale][Routes.planes], {
            locale: router.locale,
        });
    };

    return (
        <div className={classes.root}>
            <Image
                priority
                className={classes.image}
                src={isMdUp ? "/assets/home/home-principal-desktop.webp" : "/assets/home/home-principal-mobile.webp"}
                alt=""
                layout="fill"
                objectFit="cover"
                objectPosition="center"
            />
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
