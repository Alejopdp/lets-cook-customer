// Utils & config
import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery, useTheme } from "@material-ui/core";
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
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
    const classes = useStyles();

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
                min: 600,
            },
            items: 2,
            partialVisibilityGutter: 30,
        },
        mobile: {
            breakpoint: {
                max: 600,
                min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
        },
    };

    return (
        // <div style={{ paddingLeft: theme.spacing(2) }}>
        <Carousel
            style={{ justifyContent: 'center' }}
            additionalTransfrom={0}
            arrows={isSmDown ? false : true}
            autoPlaySpeed={3000}
            centerMode={false}
            className={classes.reactListCarousel}
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
                <AdditionalPlanCard key={index} additionalPlan={plan} />
            ))}
        </Carousel>
        // </div>
    );
};

AdditionalPlansGrid.propTypes = {};

export default AdditionalPlansGrid;
