import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import RoundedButton from '../../atoms/roundedButton/roundedButton.jsx';

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/assets/img-call-to-action-background.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        backgroundColor: theme.palette.background.paper
    },
    title: {

    },
    subtitle: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    smallText: {
        paddingTop: theme.spacing(1),
    }
}));

const CallToActionSection = () => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {/* <Title
                title="Comienza la experiencia Let’s Cook ahora"
                subtitle="Cociná nuevas recetas todas las semanas con ingredientes frescos y naturales"
                color="secondary"
            /> */}
             <Typography
                    className={classes.title}
                    color="secondary"
                    variant="h5">
                    Comienza la experiencia Let’s Cook ahora
                </Typography>
                <Typography
                    className={classes.subtitle}
                    variant="body1">
                    Cociná nuevas recetas todas las semanas con ingredientes frescos y naturales
                </Typography>
            <RoundedButton label="Ver planes" />
            <Typography
                    className={classes.smallText}
                    variant="caption">
                    Podrás pausar, cambiar o cancelar el plan cuando quieras
                </Typography>
        </div>
    )
}

CallToActionSection.propTypes = {

};

export default CallToActionSection;

