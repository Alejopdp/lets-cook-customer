// Utils & Config
import React from "react";

// External Components
import { Typography, Grid, Box, Avatar } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { useStyles } from "./styles";
import { GoogleReviewBoxProps } from "./interfaces";

export const GoogleReviewBox = (props: GoogleReviewBoxProps) => {
    const classes = useStyles();
    return (
        <Box className={classes.reviewBox}>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.flexCenter}>
                    {/* <Avatar alt={props.review.name} src={props.review.avatar} className={classes.avatarLarge} /> */}
                    <div>
                    {/* <div className={classes.marginLeft2}> */}
                        <Typography variant="subtitle1" color="textPrimary" >
                            {props.review.name}
                        </Typography>
                        <div className={classes.flexCenterRating}>
                            <Rating className={classes.item} name="read-only" value={props.review.stars} readOnly />
                            <Typography variant="body2" color="textSecondary" style={{ fontSize: "13px" }}>
                                {props.review.date}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{props.review.text}</Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default GoogleReviewBox;
