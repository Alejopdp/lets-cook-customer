import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme, Container, Grid } from '@material-ui/core';
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
    smallText: {
        paddingTop: theme.spacing(1),
    }
}));

const CallToActionSection = () => {

    const classes = useStyles();
    const theme = useTheme();
    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.title}
                            color="secondary"
                            variant="h5"
                            align='center'
                        >
                            Comienza la experiencia Let’s Cook ahora
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            className={classes.subtitle}
                            variant="body1"
                            align='center'
                        >
                            Cociná nuevas recetas todas las semanas con ingredientes frescos y naturales
                    </Typography>
                    </Grid>
                    {/* <RoundedButton label="Ver planes" />
                    <Typography
                        className={classes.smallText}
                        variant="caption">
                        Podrás pausar, cambiar o cancelar el plan cuando quieras
                </Typography> */}
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(4) }}>
                    <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column' }}>
                        <RoundedButton label="Ver planes" />
                        <Typography className={classes.smallText} align='center' variant="caption">
                            Podrás pausar, cambiar o cancelar el plan cuando quieras
                    </Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

CallToActionSection.propTypes = {

};

export default CallToActionSection;

