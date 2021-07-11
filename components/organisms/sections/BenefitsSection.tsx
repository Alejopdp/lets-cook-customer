import { makeStyles, Box, useTheme, Typography, Container, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";

import BenefitsCard from "../../molecules/benefits/benefits";
import { useBenefitsStyle as useStyles } from "./styles";
import { Benefit, BenefitsSectionProps } from "./interfaces";

const _cards: Benefit[] = [
    {
        title: "Productos frescos y de proximidad",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
    {
        title: "Platos saludable y equilibrados",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
    {
        title: "Nuevas recetas, todas las semanas",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
    {
        title: "Cuidamos el medioambiente",
        content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
        image: "/assets/icon-test.svg",
    },
];

export const BenefitsSection = ({ cards = _cards, backgroundColor, removeCallToAction }: BenefitsSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box style={{ backgroundColor: backgroundColor ? backgroundColor : "white", padding: `${theme.spacing(8)}px 0px` }}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} style={{ alignSelf: "center" }}>
                        <div className={classes.imgContainer}>
                            <img className={classes.img} src="/assets/img-beneficios-letscook.jpeg" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {cards.map((card, index) => (
                            <div key={index} className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src={card.image} className={classes.icon}></img>
                                </div>
                                <div>
                                    <Typography variant="h5" color="textSecondary" style={{ marginBottom: theme.spacing(1) }} >
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {card.content}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </Grid>
                </Grid>
                {!removeCallToAction && (
                    <Grid container style={{ marginTop: theme.spacing(4) }}>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                            <RoundedButton label="Ver planes" onClick={() => router.push("/planes")} />
                            <Typography className={classes.smallText} variant="caption">
                                Podrás pausar, cambiar o cancelar el plan cuando quieras
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default BenefitsSection;
