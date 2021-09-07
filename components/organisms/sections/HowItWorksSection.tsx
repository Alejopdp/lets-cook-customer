import Typography from "@material-ui/core/Typography";
import { useTheme, Container, Grid } from "@material-ui/core";
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";

import { useHowItWorksStyles as useStyles } from "./styles";
import { HowItWorksSectionProps, HowItWorks } from "./interfaces";
import { memo } from "react";
import * as ga from '../../../helpers/ga'

const HowItWorksSection = memo((props: HowItWorksSectionProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();

    const goToPlans = () => {
        ga.event({
            action: "clic en empieza a cocinar",
            params: {
                event_category: 'homepage',
                event_label: 'como funciona',
            }
        })
        router.push("/planes")
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Title title="¿Cómo funciona?" />
                {(props.cards || []).map((card, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3} style={{ textAlign: "center" }} className={classes.gridCard}>
                        <img className={classes.img} src={card.image} />
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
                    <RoundedButton label="Empieza a cocinar" onClick={goToPlans} />
                    <Typography className={classes.smallText} variant="caption">
                        Nuevas recetas cada semana
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
});

export default HowItWorksSection;
