import { Box, useTheme, Typography, Container, Grid, Hidden } from "@material-ui/core";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";
import classes from "./benefitsSyles.module.scss";
import { BenefitsSectionProps } from "./interfaces";
import TitleOtherPages from "components/molecules/titleOtherPages/titleOtherPages";
import * as ga from "../../../helpers/ga";
import { localeRoutes, Routes } from "lang/routes/routes";
import Image from "next/image";

export const BenefitsSection = (props: BenefitsSectionProps) => {
    const lang = props.lang;
    const theme = useTheme();
    const router = useRouter();

    const goToPlans = () => {
        ga.event({
            action: "clic en descubre mas",
            params: {
                event_category: "homepage",
                event_label: "beneficios lets cook",
            },
        });
        router.push(localeRoutes[router.locale][Routes.planes]);
    };

    return (
        <Box style={{ backgroundColor: props.backgroundColor ? props.backgroundColor : "white", padding: `${theme.spacing(8)}px 0px` }}>
            <Container maxWidth="lg">
                {props.enableTitleSection && <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} style={{ alignSelf: "center" }}>
                        <Image
                            className={classes.img}
                            src="/assets/home/home-atributos.webp"
                            alt="atributos"
                            layout="responsive"
                            width={504}
                            height={341.25}
                        />
                    </Grid>
                    <Grid item xs={12} md={7} style={{ alignSelf: "center" }}>
                        {lang.cards.map((card, index) => (
                            <div key={index} className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <Image
                                        src={card.image}
                                        alt={card.title}
                                        className={classes.icon}
                                        width={32}
                                        height={32}
                                        layout="fixed"
                                    />
                                </div>
                                <div>
                                    <Typography variant="h5" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                                        {card.title}
                                    </Typography>
                                    <Hidden smDown>
                                        <Typography variant="body1" color="textSecondary">
                                            {card.content}
                                        </Typography>
                                    </Hidden>
                                </div>
                            </div>
                        ))}
                    </Grid>
                </Grid>
                {!props.removeCallToAction && (
                    <Grid container style={{ marginTop: theme.spacing(4) }}>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                            <RoundedButton label={lang.btnText} onClick={goToPlans} />
                            <Typography className={classes.smallText} variant="caption">
                                {lang.btnCaption}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default BenefitsSection;
