import Typography from "@material-ui/core/Typography";
import { useTheme, Container, Grid } from "@material-ui/core";
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";

import classes from "./howItWorksStyles.module.scss";
import { HowItWorksSectionProps } from "./interfaces";
import { memo } from "react";
import * as ga from "../../../helpers/ga";
import { localeRoutes, Routes } from "lang/routes/routes";
import Image from "next/image";

const HowItWorksSection = memo((props: HowItWorksSectionProps) => {
    const lang = props.lang;
    const theme = useTheme();
    const router = useRouter();

    const goToPlans = () => {
        ga.event({
            action: "clic en empieza a cocinar",
            params: {
                event_category: "homepage",
                event_label: "como funciona",
            },
        });
        router.push(localeRoutes[router.locale][Routes.planes]);
    };

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Title title={lang.title} />
                {(lang.cards || []).map((card, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3} style={{ textAlign: "center" }} className={classes.gridCard}>
                        <Image
                        unoptimized
                            src={card.image}
                            layout="responsive"
                            width={296}
                            height={172.66}
                            className={classes.img}
                            alt={`how-it-works-${index}`}
                        />
                        <Typography className={classes.paddingCardTitle} variant="h5" color="initial">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="initial">
                            {card.content}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid container style={{ marginTop: theme.spacing(4) }}>
                <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                    <RoundedButton label={lang.btnText} onClick={goToPlans} />
                    <Typography className={classes.smallText} variant="caption">
                        {lang.btnCaption}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
});

export default HowItWorksSection;
