import { makeStyles, Box, useTheme, Typography, Container, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import RoundedButton from '../../atoms/roundedButton/roundedButton';

import BenefitsCard from '../../molecules/benefits/benefits'

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto"
    },
    row: {
        display: "flex",
        paddingBottom: theme.spacing(3)
    },
    imgContainer: {
        justifyContent: "center",
        boxSizing: "border-box",
        display: "flex"
    },
    img: {
        display: "flex",
        flex: 1,
        borderRadius: 8,
        width: "100%",
        maxWidth: 480,
    },
    smallText: {
        paddingTop: theme.spacing(1),
        textAlign: "center"
    },
    card: {
        flexDirection: "row",
        display: "flex",
        alignItems: "flex-start",
        maxWidth: 500,
        padding: theme.spacing(2),
    },
    cardIcon: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    icon: {
        width: 24,
        height: 24
    }

}));

const BenefitsSection = () => {
    const classes = useStyles();
    const theme = useTheme();

    const cards = [
        {
            title: "Productos frescos y de proximidad",
            content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
            image: "/assets/icon-test.svg"
        },
        {
            title: "Platos saludable y equilibrados",
            content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
            image: "/assets/icon-test.svg"
        },
        {
            title: "Nuevas recetas, todas las semanas",
            content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
            image: "/assets/icon-test.svg"
        },
        {
            title: "Cuidamos el medioambiente",
            content: "Lorem ipsum dolor sit amet, cetetur sadipscing elitr sed diam nonumy dolor sit amet, cetetur",
            image: "/assets/icon-test.svg"
        },
    ];

    return (
        <Box style={{ backgroundColor: 'white', padding: `${theme.spacing(8)}px 0px` }}>
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} alignSelf='center'>
                        <div className={classes.imgContainer}>
                            <img
                                className={classes.img}
                                src="/assets/img-beneficios-letscook.jpeg" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {cards.map((card, index) => (
                            <div key={index} className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src={card.image} className={classes.icon}></img>
                                </div>
                                <div>
                                    <Typography variant="subtitle1" color="initial">{card.title}</Typography>
                                    <Typography variant="body1" color="initial">{card.content}</Typography>
                                </div>
                            </div>
                        ))}
                    </Grid>
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
        </Box>
    );
}
BenefitsSection.propTypes = {

};

export default BenefitsSection;
