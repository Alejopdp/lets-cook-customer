import PropTypes from "prop-types";
import { Typography, Container, Grid } from "@material-ui/core/";
import { makeStyles, useTheme } from "@material-ui/core";
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import RoundedButton from "../../atoms/roundedButton/roundedButton.jsx";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    row: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(3),
    },
    card: {
        display: "flex",
        // width: 260,
        height: 400,
        boxSizing: "border-box",
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        textAlign: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: 8,
    },
    overlay: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
        borderRadius: 8,
        padding: theme.spacing(1),
    },
    cardContent: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4),
        textAlign: "left",
    },
    cardAction: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

const PlansSection = () => {
    const theme = useTheme();

    const cards = [
        {
            title: "Plan familiar",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
        {
            title: "Plan gourmet",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
        {
            title: "Plan vegetariano/vegano",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
        {
            title: "Plan ahorro",
            content: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
            image: "unnamed.jpg",
        },
    ];

    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Title
                    title="Encuentra el plan indicado para tí"
                    subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                />
                {cards.map((card, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        <div
                            key={index}
                            className={classes.card}
                            style={{
                                backgroundImage: `url(${classes.img})`,
                            }}
                        >
                            <div className={classes.overlay}>
                                <div className={classes.cardContent}>
                                    <Typography className={classes.paddingCardTitle} variant="subtitle1" color="initial">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body2" color="initial">
                                        {card.content}
                                    </Typography>
                                </div>
                                <div className={classes.cardAction}>
                                    <RoundedButton label="¡QUIERO ESTE PLAN!" />
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};
PlansSection.propTypes = {};

export default PlansSection;
