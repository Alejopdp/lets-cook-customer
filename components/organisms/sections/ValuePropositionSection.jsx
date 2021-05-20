import { makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import RoundedButton from '../../atoms/roundedButton/roundedButton.jsx';
import CircularBotton from '../../atoms/circularBotton/CircularBotton.jsx';
import ArrowIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundImage: "url(/assets/img-background-proposition-section.jpeg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        minWidth: "100vw",
        minHeight: "100vh",
        paddingTop: 64,
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
    },
    textContent: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        justifyContent: "center",
        maxWidth: 670,
    },
    paddingX2: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}))
const ValuePropositionSection = () => {
    const classes = useStyles();
    return (<>
        <div className={classes.root}>
            <div className={classes.overlay}>
                <div className={classes.textContent}>
                    <Typography variant="h4">
                        Llegó la hora de redescubrir tu cocina
                    </Typography>
                    <Typography className={classes.paddingX2} variant="body1">
                        Pensamos por ti <b>recetas sanas y equilibradas</b> con la mejor selección de <b>ingredientes frescos y naturales</b> y te las enviamos <b>semanalmente</b> a la puerta de tu casa
                    </Typography>
                    <RoundedButton label="Ver planes" />
                    <Typography className={classes.paddingX2} variant="caption">Sin compromiso de permanencia</Typography>
                </div>
                <div className={classes.paddingX2}>
                    <CircularBotton>
                        <ArrowIcon color="primary" fontSize="large" />
                    </CircularBotton>
                </div>

            </div>
        </div>

    </>);
}
ValuePropositionSection.propTypes = {

};

export default ValuePropositionSection;
