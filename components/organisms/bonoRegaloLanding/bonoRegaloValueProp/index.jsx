import { makeStyles, Typography, useTheme, Grid, Container } from '@material-ui/core';
import { RoundedButton } from '@atoms';
import { CircularBotton } from '@atoms';
import ArrowIcon from '@material-ui/icons/ExpandMore';
import { useValuePropositionStyle as useStyles } from './styles';
import { useRouter } from "next/router";


export const BonoRegaloValueProp = () => {
    const classes = useStyles();
    const router = useRouter();

    return (
        <div className={classes.root}>
            <div className={classes.overlay}>
                <Container maxWidth='md' className={classes.container}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h1">Regala por única vez un plan a la persona que quieras</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1">Lorem ipsum dolor sit amet, consetetur sadipscing elitr orem ipsum dolor sit amet, consetetur sadipscing elitrorem ipsum dolor sit amet, consetetur</Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default BonoRegaloValueProp;