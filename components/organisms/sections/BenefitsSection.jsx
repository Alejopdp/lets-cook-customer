import { makeStyles, Typography } from '@material-ui/core';
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
        alignItems: "center",
        padding: theme.spacing(3),
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
        <div className={classes.root}>
            <div className={classes.row}>
                <div className={classes.imgContainer}>
                    <img
                        className={classes.img}
                        src="/assets/img-beneficios-letscook.jpeg" />
                </div>
                <div>
                    {cards.map((card,index) => (
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
                </div>
            </div>
            <RoundedButton label="Ver planes" />
            <Typography
                className={classes.smallText}
                variant="caption">
                Podrás pausar, cambiar o cancelar el plan cuando quieras
        </Typography>
        </div>
    );
}
BenefitsSection.propTypes = {

};

export default BenefitsSection;
