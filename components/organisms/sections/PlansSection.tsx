import { Typography, Container, Grid, useTheme, useMediaQuery } from "@material-ui/core/";
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Plan } from "@helpers";
import { usePlansStyles as useStyles } from "./styles";
import { PlansSectionProps } from "./interfaces";
import { memo } from "react";
import PlanCard from "../../molecules/planCard";

export const PlansSection = memo((props: PlansSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isLgDown = useMediaQuery(theme.breakpoints.down("md"));
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

    const responsive = {
        superLargeDesktop: {
            breakpoint: {
                max: 3000,
                min: 1800,
            },
            items: 5,
            partialVisibilityGutter: 40,
        },
        desktop: {
            breakpoint: {
                max: 1800,
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
            partialVisibilityGutter: 100,
        },
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Title
                        title="Encuentra el plan indicado para tí"
                        subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                    />
                </Grid>
                {props.cards.length <= 6 && isLgUp && (
                    <Grid item xs={12}>
                        <Grid container spacing={2} style={{ justifyContent: "center" }}>
                            {(props.cards || []).map((card, index) => (
                                <Grid item xs={12} lg={2}>
                                    <PlanCard index={index} card={card} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
            </Grid>
            {(props.cards.length > 6 || isLgDown) && (
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
                        {(props.cards || []).map((card, index) => (
                            <PlanCard index={index} card={card} style={{ paddingRight: theme.spacing(2) }} />
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    );
});

export default PlansSection;
