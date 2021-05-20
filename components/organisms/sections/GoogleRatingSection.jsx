import { makeStyles, Typography, Container, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: 72,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2)
    },
    item: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    img: {
        height: 40
    },
    googleRatingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down("sm")]: {
            justifyContent: 'center',
        },
    },
    textRatingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down("sm")]: {
            justifyContent: 'center',
        },
    }

}))
const GoogleRatingSection = () => {
    const classes = useStyles();
    return (
        // {/* <div className={classes.root}> */}
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className={classes.googleRatingRow}>
                        <img className={clsx(classes.item, classes.img)} src="/assets/img-google-logo.png" />
                        <Typography className={classes.item} variant="subtitle1">Rating</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} style={{alignSelf: 'center'}}>
                    <div className={classes.textRatingRow}>
                        <Typography className={classes.item} variant="h6"><b>5.0</b></Typography>
                        <Rating className={classes.item} name="read-only" value={5} readOnly />
                        <Typography className={classes.item} variant="caption">108 opiniones</Typography>
                    </div>
                </Grid>
            </Grid>
        </Container>
        // {/* </div> */}
    );
}
GoogleRatingSection.propTypes = {

};

export default GoogleRatingSection;
