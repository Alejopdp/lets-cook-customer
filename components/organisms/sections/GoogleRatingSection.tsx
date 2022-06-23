import { Typography, Container, Grid, Box } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import classes from "./googleRating.module.scss";
import { GoogleRatingSectionProps } from "./interfaces";
import { memo } from "react";
import Image from "next/image";

export const GoogleRatingSection = memo((props: GoogleRatingSectionProps) => {
    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className={classes.googleRatingRow}>
                        <Box className={classes.item}>
                            <Image src="/assets/img-google-logo.png" height={40} width={118.8} alt="google-logo" />
                        </Box>
                        <Typography className={classes.item} variant="subtitle1">
                            Rating
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} style={{ alignSelf: "center" }}>
                    <div className={classes.textRatingRow}>
                        <Typography className={classes.item} variant="h6">
                            <b>5.0</b>
                        </Typography>
                        <Rating className={classes.item} name="read-only" value={5} readOnly />
                        <Typography className={classes.item} variant="caption">
                            150 opiniones
                        </Typography>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
});

export default GoogleRatingSection;
