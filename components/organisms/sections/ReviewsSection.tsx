// Utils & Config
import React from "react";
// External Components
import { Rating } from "@material-ui/lab";
import { Typography, Container, Grid, useTheme, useMediaQuery, Box } from "@material-ui/core";

// External Components
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Internal Components
import GoogleReviewBox from "../../molecules/googleReviewBox/googleReviewBox";
import { ReviewsSectionProps } from "./interfaces";
import classes from "./reviewsStyles.module.scss";
import Image from "next/image";
import { useLang } from "@hooks";

export const ReviewsSection = ({ reviews = [] }: ReviewsSectionProps) => {
    const [lang] = useLang("home");
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

    const responsive = {
        superLargeDesktop: {
            breakpoint: {
                max: 6000,
                min: 1280,
            },
            items: 4,
            partialVisibilityGutter: 40,
        },
        desktop: {
            breakpoint: {
                max: 3000,
                min: 1024,
            },
            items: 3,
            partialVisibilityGutter: 40,
        },
        mobile: {
            breakpoint: {
                max: 464,
                min: 0,
            },
            items: 1,
            partialVisibilityGutter: 40,
        },
        tablet: {
            breakpoint: {
                max: 1024,
                min: 700,
            },
            items: 2,
            partialVisibilityGutter: 40,
        },
    };

    return (
        <>
            <Container maxWidth="lg" style={{ marginBottom: theme.spacing(3) }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <div className={classes.googleRatingRow}>
                            <Box className={classes.item}>
                                <Image unoptimized src="/assets/img-google-logo.png" height={40} width={118.8} alt="google-logo" />
                            </Box>
                            <Typography className={classes.item} variant="subtitle1">
                                {lang.reviewsSection.rating}
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
                                428 {lang.reviewsSection.reviews}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
            <div style={{ paddingLeft: theme.spacing(2) }}>
                <Carousel
                    additionalTransfrom={0}
                    arrows={isSmDown ? false : true}
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
                    {(reviews ?? []).map((review, index) => (
                        <GoogleReviewBox key={index} review={review} />
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default ReviewsSection;
