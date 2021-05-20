import { makeStyles, Typography } from '@material-ui/core';
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
    },
    item: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    img: {
        height: 40
    }

}))
const GoogleRatingSection = () => {
    const classes = useStyles();
    return (<>
        <div className={classes.root}>
            <img className={clsx(classes.item, classes.img)} src="/assets/img-google-logo.png" />
            <Typography className={classes.item} variant="subtitle1">Rating</Typography>
            <Typography className={classes.item} variant="h6"><b>5.0</b></Typography>
            <Rating className={classes.item} name="read-only" value={5} readOnly />
            <Typography className={classes.item} variant="caption">108 opiniones</Typography>
        </div>
    </>);
}
GoogleRatingSection.propTypes = {

};

export default GoogleRatingSection;
