// Utils & Config
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';

// External Components
import { Rating } from '@material-ui/lab';
import { Typography, Container, Grid, Box } from '@material-ui/core';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Internal Components
import GoogleReviewBox from '../../molecules/googleReviewBox/googleReviewBox';
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import RoundedButton from '../../atoms/roundedButton/roundedButton.jsx';


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

const HowItWorksSection = () => {
    const theme = useTheme();

    const reviews = [
        {
            id: 1,
            name: 'Ricardo Sánchez',
            avatar: { src: '/static/images/avatar/1.jpg', alt: 'Ricardo Sánchez' },
            stars: 5,
            date: 'Hace 5 días',
            text: 'Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!'
        },
        {
            id: 1,
            name: 'Ricardo Sánchez',
            avatar: { src: '/static/images/avatar/1.jpg', alt: 'Ricardo Sánchez' },
            stars: 5,
            date: 'Hace 5 días',
            text: 'Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!'
        },
        {
            id: 1,
            name: 'Ricardo Sánchez',
            avatar: { src: '/static/images/avatar/1.jpg', alt: 'Ricardo Sánchez' },
            stars: 5,
            date: 'Hace 5 días',
            text: 'Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!'
        },
        {
            id: 1,
            name: 'Ricardo Sánchez',
            avatar: { src: '/static/images/avatar/1.jpg', alt: 'Ricardo Sánchez' },
            stars: 5,
            date: 'Hace 5 días',
            text: 'Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!'
        },
        {
            id: 1,
            name: 'Ricardo Sánchez',
            avatar: { src: '/static/images/avatar/1.jpg', alt: 'Ricardo Sánchez' },
            stars: 5,
            date: 'Hace 5 días',
            text: 'Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!'
        },
        {
            id: 1,
            name: 'Ricardo Sánchez',
            avatar: { src: '/static/images/avatar/1.jpg', alt: 'Ricardo Sánchez' },
            stars: 5,
            date: 'Hace 5 días',
            text: 'Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!'
        },
        {
            id: 1,
            name: 'Ricardo Sánchez',
            avatar: { src: '/static/images/avatar/1.jpg', alt: 'Ricardo Sánchez' },
            stars: 5,
            date: 'Hace 5 días',
            text: 'Super recomendado!!!!! Realmente muy simple hacer platos deliciosos!! Todo organizado, explicado y de primera calidad!!! Me encanta todas las semanas tener sus platos a preparar en casa. Es divertido y muy simple! Encima ecofriendly Gracias!!!!!'
        },
    ];

    const responsive = {
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
        }
    };

    const classes = useStyles();

    return (
        <>
            <Container maxWidth='lg' style={{ marginBottom: theme.spacing(3) }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.googleRatingRow}>
                            <img className={clsx(classes.item, classes.img)} src="/assets/img-google-logo.png" />
                            <Typography className={classes.item} variant="subtitle1">Rating</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6} style={{ alignSelf: 'center' }}>
                        <div className={classes.textRatingRow}>
                            <Typography className={classes.item} variant="h6"><b>5.0</b></Typography>
                            <Rating className={classes.item} name="read-only" value={5} readOnly />
                            <Typography className={classes.item} variant="caption">108 opiniones</Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div style={{ paddingLeft: theme.spacing(2) }}>
                <Carousel
                    additionalTransfrom={0}
                    arrows
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    // infinite
                    itemClass=""
                    keyBoardControl
                    responsive={responsive}
                    minimumTouchDrag={80}
                    partialVisible
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    showDots={false}
                    sliderClass=""
                    slidesToSlide={1}
                    swipeable
                >
                    {reviews.map((review, index) => (
                        <GoogleReviewBox key={index} review={review} />
                    ))}
                </Carousel>
            </div>
        </>
    )
}
HowItWorksSection.propTypes = {

};

export default HowItWorksSection;
