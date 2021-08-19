import Typography from "@material-ui/core/Typography";
import { useTheme, Container, Grid } from "@material-ui/core";
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";

import { useHowItWorksStyles as useStyles } from "./styles";
import { HowItWorksSectionProps, HowItWorks } from "./interfaces";
import { memo } from "react";

const HowItWorksSection = memo((props: HowItWorksSectionProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Title title="¿Cómo funciona?" />
                {(props.cards || []).map((card, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3} style={{ textAlign: "center" }}>
                        <img className={classes.img} src={card.image} />
                        <Typography className={classes.paddingCardTitle} variant="subtitle1" color="initial">
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
                    <RoundedButton label="Descubre más" onClick={() => router.push("/planes")} />
                    <Typography className={classes.smallText} variant="caption">
                        Podrás pausar, cambiar o cancelar el plan cuando quieras
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
});

export default HowItWorksSection;
