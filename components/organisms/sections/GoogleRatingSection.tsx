import { Typography, Container, Grid } from '@material-ui/core';
import clsx from 'clsx';
import { Rating } from '@material-ui/lab';

import { useGoogleRatingStyles as useStyles } from "./styles";
import { GoogleRatingSectionProps } from "./interfaces";
import { memo } from 'react';
import { useLang } from '@hooks';

export const GoogleRatingSection = memo((props: GoogleRatingSectionProps) => {
    const classes = useStyles();
    const [lang] = useLang('homeSession');
    return (
        // {/* <div className={classes.root}> */}
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <div className={classes.googleRatingRow}>
                        <img className={clsx(classes.item, classes.img)} src="/assets/img-google-logo.png" />
                        <Typography className={classes.item} variant="subtitle1">{lang.rating}</Typography>
                    </div>
                </Grid>
                <Grid item xs={12} md={6} style={{ alignSelf: 'center' }}>
                    <div className={classes.textRatingRow}>
                        <Typography className={classes.item} variant="h6"><b>5.0</b></Typography>
                        <Rating className={classes.item} name="read-only" value={5} readOnly />
                        <Typography className={classes.item} variant="caption">108{" " + lang.opinions}</Typography>
                    </div>
                </Grid>
            </Grid>
        </Container>
        // {/* </div> */}
    );
})

export default GoogleRatingSection;
