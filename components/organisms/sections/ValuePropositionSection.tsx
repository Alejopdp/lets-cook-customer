import { makeStyles, Typography, useTheme } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { CircularBotton } from '@atoms';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import { useValuePropositionStyle as useStyles } from './styles';

export const ValuePropositionSection = () => {
    const classes = useStyles();
    return (<>
        <div className={classes.root}>
            <div className={classes.overlay}>
                <div className={classes.textContent}>
                    <Typography variant="h4" className={classes.marginBottom1}>
                        Llegó la hora de redescubrir tu cocina
                    </Typography>
                    <Typography variant="body1" className={classes.marginBottom3}>
                        Pensamos por ti <b>recetas sanas y equilibradas</b> con la mejor selección de <b>ingredientes frescos y naturales</b> y te las enviamos <b>semanalmente</b> a la puerta de tu casa
                    </Typography>
                    <RoundedButton label="Ver planes" />
                    <Typography className={classes.marginToMiddle1} variant="caption">Sin compromiso de permanencia</Typography>
                </div>
                <div className={classes.marginBottom3}>
                    <CircularBotton>
                        <ArrowIcon color="primary" fontSize="large" />
                    </CircularBotton>
                </div>

            </div>
        </div>

    </>);
}

export default ValuePropositionSection;
