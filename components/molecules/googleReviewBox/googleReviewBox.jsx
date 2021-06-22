// Utils & Config
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core';

// External Components
import { Typography, Grid, Box, Avatar } from '@material-ui/core';
import { Rating } from '@material-ui/lab';


const useStyles = makeStyles(theme => ({
    reviewBox: {
        borderRadius: "15px",
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        marginRight: '16px'
    },
    avatarLarge: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    item: {
        marginRight: theme.spacing(1),
    },
}))

const GoogleReviewBox = (props) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Box className={classes.reviewBox}>
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar alt={props.review.avatar.alt} src={props.review.avatar.src} className={classes.avatarLarge} />
                    <div style={{ marginLeft: theme.spacing(2) }}>
                        <Typography variant='subtitle1' color='textPrimary'>
                            {props.review.name}
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <Rating className={classes.item} name="read-only" value={props.review.stars} readOnly />
                            <Typography variant='body2' color='textSecondary'>
                                {props.review.date}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {props.review.text}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}
GoogleReviewBox.propTypes = {

};

export default GoogleReviewBox;
