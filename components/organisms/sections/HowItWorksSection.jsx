import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import RoundedButton from '../../atoms/roundedButton/roundedButton.jsx';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(3)
    },
    card: {
        width: 260,
        boxSizing: "border-box",
        paddingInline: theme.spacing(1),
        // margin: theme.spacing(1),
        textAlign: "center"
    },
    img: {
        borderRadius: 8,
        height: 170,
        width: "100%",
    },
    paddingCardTitle: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    smallText: {
        paddingTop: theme.spacing(1),
        textAlign: "center"
    }
}));
const HowItWorksSection = () => {

    const cards = [
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

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Title title="¿Cómo funciona?" subtitle="" />
            <div className={classes.row}>
                {cards.map((card,index) => (
                    <div key={index} className={classes.card}>
                        <img
                            className={classes.img}
                            src={card.image} />
                        <Typography
                            className={classes.paddingCardTitle}
                            variant="subtitle1"
                            color="initial">{card.title}</Typography>
                        <Typography
                            variant="body2"
                            color="initial">{card.content}</Typography>
                    </div>
                ))}
            </div>
            <RoundedButton label="Ver planes" />
            <Typography
                className={classes.smallText}
                variant="caption">
                Podrás pausar, cambiar o cancelar el plan cuando quieras
        </Typography>
        </div>
    )
}
HowItWorksSection.propTypes = {

};

export default HowItWorksSection;
