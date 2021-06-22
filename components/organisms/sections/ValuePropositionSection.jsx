import { makeStyles, Typography, useTheme } from '@material-ui/core';
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
}))
const ValuePropositionSection = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (<>
        <div className={classes.root}>
            <div className={classes.overlay}>
                <div className={classes.textContent}>
                    <Typography variant="h4" style={{ marginBottom: theme.spacing(1) }}>
                        Llegó la hora de redescubrir tu cocina
                    </Typography>
                    <Typography variant="body1" style={{ marginBottom: theme.spacing(3) }}>
                        Pensamos por ti <b>recetas sanas y equilibradas</b> con la mejor selección de <b>ingredientes frescos y naturales</b> y te las enviamos <b>semanalmente</b> a la puerta de tu casa
                    </Typography>
                    <RoundedButton label="Ver planes" />
                    <Typography style={{ marginTop: theme.spacing(0.5) }} variant="caption">Sin compromiso de permanencia</Typography>
                </div>
                <div style={{ marginBottom: theme.spacing(3) }}>
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
