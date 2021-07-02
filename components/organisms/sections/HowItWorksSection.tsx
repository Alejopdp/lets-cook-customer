import Typography from '@material-ui/core/Typography';
import { useTheme, Container, Grid } from '@material-ui/core';
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from '@atoms';

import { useHowItWorksStyles as useStyles } from "./styles";
import { HowItWorksSectionProps, HowItWorks } from "./interfaces";
import { memo } from 'react';

const _cards: HowItWorks[] = [
    {
        title: "Lorem Ipsum dolor",
        content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        image: "unnamed.jpg"
    },
    {
        title: "Lorem Ipsum dolor",
        content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        image: "unnamed.jpg"
    },
    {
        title: "Lorem Ipsum dolor",
        content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        image: "unnamed.jpg"
    },
    {
        title: "Lorem Ipsum dolor",
        content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        image: "unnamed.jpg"
    },
];

const HowItWorksSection = memo(({cards = _cards}: HowItWorksSectionProps) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Title title="¿Cómo funciona?" subtitle="" />
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={3} style={{ textAlign: 'center' }} >
                        <img
                            className={classes.img}
                            src={card.image} />
                        <Typography
                            className={classes.paddingCardTitle}
                            variant="subtitle1"
                            color="initial">{card.title}</Typography>
                        <Typography
                            variant="body2"
                            color="initial">{card.content}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid container style={{ marginTop: theme.spacing(4) }}>
                <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                    <RoundedButton label="Ver planes" />
                    <Typography className={classes.smallText} variant="caption">
                        Podrás pausar, cambiar o cancelar el plan cuando quieras
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
});

export default HowItWorksSection;
