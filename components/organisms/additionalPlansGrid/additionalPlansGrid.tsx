// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme, Grid } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import AdditionalPlanCard from "components/molecules/additionalPlanCard/additionalPlanCard";
import { AdditionalPlansGridProps } from "./interface";
import { useStyles } from "./styles";
import { GoogleReviewBox } from "@molecules";

// External components

// Internal components

const AdditionalPlansGrid = (props: AdditionalPlansGridProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isLgDown = useMediaQuery(theme.breakpoints.down("md"));

    const responsive = {
        superLargeDesktop: {
            breakpoint: {
                max: 3000,
                min: 1280,
            },
            items: 4,
            partialVisibilityGutter: 40,
        },
        desktop: {
            breakpoint: {
                max: 1280,
                min: 960,
            },
            items: 3,
            partialVisibilityGutter: 40,
        },
        tablet: {
            breakpoint: {
                max: 960,
                min: 720,
            },
            items: 2,
            partialVisibilityGutter: 40,
        },
        mobile: {
            breakpoint: {
                max: 720,
                min: 0,
            },
            items: 1,
            partialVisibilityGutter: 40,
        },
    };

    return (
        <>
            {props.additionalPlans.length <= 3 && isLgUp && (
                <Grid item xs={12}>
                    <Grid container spacing={2} style={{ justifyContent: "center" }}>
                        {props.additionalPlans.map((plan, index) => (
                            <Grid item xs={12} lg={4} key={index}>
                                <AdditionalPlanCard
                                    selectedVariants={props.selectedVariants}
                                    setselectedVariants={props.setselectedVariants}
                                    variantsToPay={props.variantsToPay}
                                    setvariantsToPay={props.setvariantsToPay}
                                    additionalPlan={plan}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            )}
            {(props.additionalPlans.length > 3 || isLgDown) && (
                <Carousel
                    additionalTransfrom={0}
                    arrows={isSmDown ? false : true}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    // infinite
                    itemClass={classes.listItem}
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
                    {props.additionalPlans.map((plan, index) => (
                        <AdditionalPlanCard
                            selectedVariants={props.selectedVariants}
                            setselectedVariants={props.setselectedVariants}
                            variantsToPay={props.variantsToPay}
                            setvariantsToPay={props.setvariantsToPay}
                            key={index}
                            additionalPlan={plan}
                        />
                    ))}
                </Carousel>
            )}
        </>
    );
};

AdditionalPlansGrid.propTypes = {};

export default AdditionalPlansGrid;
