import { Typography, Container, Grid, useTheme, useMediaQuery } from '@material-ui/core/';
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from '@atoms';
import { useRouter } from 'next/router';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Plan } from '@helpers';
import { usePlansStyles as useStyles } from "./styles";
import { PlansSectionProps } from "./interfaces";
import { memo } from 'react';
import PlanCard from '../../molecules/planCard';

const _cards: Plan[] = [
    {
        name: "Plan familiar",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-familiar"
    },
    {
        name: "Plan gourmet",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-gourmet"
    },
    {
        name: "Plan vegetariano",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-vegetariano"
    },
    {
        name: "Plan vegano",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-vegetariano"
    },
    {
        name: "Plan ahorro",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-ahorro"
    },
    {
        name: "Plan ahorro",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-ahorro"
    },
    {
        name: "Plan ahorro",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-ahorro"
    },
    {
        name: "Plan ahorro",
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-ahorro"
    },
];

export const PlansSection = memo(({ cards = _cards }: PlansSectionProps) => {
    const { push: navigateTo } = useRouter();
    const theme = useTheme();
    const classes = useStyles();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isLgDown = useMediaQuery(theme.breakpoints.down("md"));
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

    const responsive = {
        superLargeDesktop: {
            breakpoint: {
                max: 3000,
                min: 1280
            },
            items: 5,
            partialVisibilityGutter: 40
        },
        desktop: {
            breakpoint: {
                max: 1280,
                min: 960
            },
            items: 3,
            partialVisibilityGutter: 40
        },
        tablet: {
            breakpoint: {
                max: 960,
                min: 600
            },
            items: 2,
            partialVisibilityGutter: 30
        },
        mobile: {
            breakpoint: {
                max: 600,
                min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
        },
    };

    return (
        // <Container maxWidth='lg'>
        //     <Grid container spacing={2}>
        //         <Title
        //             title="Encuentra el plan indicado para tí"
        //             subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
        //         />
        //         {cards.map((card, index) => (
        //             <Grid item xs={12} md={3}>
        //                 <div key={index} className={classes.card} style={{
        //                     backgroundImage: `url(${classes.img})`
        //                 }}>
        //                     <div className={classes.overlay} >
        //                         <div className={classes.cardContent}>
        //                             <Typography
        //                                 className={classes.paddingCardTitle}
        //                                 variant="subtitle1"
        //                                 color="initial">{card.name}</Typography>
        //                             <Typography
        //                                 variant="body2"
        //                                 color="initial">{card.description}</Typography>
        //                         </div>
        //                         <div className={classes.cardAction}>
        //                             <RoundedButton label="¡QUIERO ESTE PLAN!" onClick={() => navigateTo({
        //                                 pathname: "/planes/[slug]",
        //                                 query: {
        //                                     slug: card.slug,
        //                                     personas: 2,
        //                                     recetas: 2
        //                                 }
        //                             })} />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </Grid>
        //         ))}
        //     </Grid>
        // </Container>
        <>
            <Container maxWidth='xl'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Title
                            title="Encuentra el plan indicado para tí"
                            subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                        />
                    </Grid>
                    {(cards.length <= 6 && isLgUp) && (
                        <Grid item xs={12}>
                            <Grid container spacing={2} style={{ justifyContent: 'center' }}>
                                {cards.map((card, index) =>
                                    <Grid item xs={12} lg={2}>
                                        <PlanCard
                                            index={index}
                                            name={card.name}
                                            description={card.description}
                                            slug={card.slug}
                                        />
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container>
            {(cards.length > 6 || isLgDown) && (
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
                        {cards.map((card, index) => (
                            <PlanCard
                                index={index}
                                name={card.name}
                                description={card.description}
                                slug={card.slug}
                                style={{ marginRight: theme.spacing(2) }}
                            />
                        ))}
                    </Carousel>
                </div>
            )}

        </>


        //  <>
        //         <Container maxWidth='lg' style={{ marginBottom: theme.spacing(3) }}>
        //             <Grid container spacing={2}>
        //                 <Title
        //                     title="Encuentra el plan indicado para tí"
        //                     subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
        //                 />
        //             </Grid>
        //         </Container>
        //         <div style={{ paddingLeft: theme.spacing(2) }}>
        // <Carousel
        //     additionalTransfrom={0}
        //     arrows
        //     autoPlaySpeed={3000}
        //     centerMode={false}
        //     className=""
        //     containerClass="container"
        //     dotListClass=""
        //     draggable
        //     focusOnSelect={false}
        //     // infinite
        //     itemClass=""
        //     keyBoardControl
        //     responsive={responsive}
        //     minimumTouchDrag={80}
        //     partialVisible
        //     renderButtonGroupOutside={false}
        //     renderDotsOutside={false}
        //     showDots={false}
        //     sliderClass=""
        //     slidesToSlide={1}
        //     swipeable
        // >

        //     {cards.map((card, index) => (
        //         <div key={index} className={classes.card} style={{
        //             backgroundImage: `url(${classes.img})`,
        //             marginRight: theme.spacing(2)
        //         }}>
        //             <div className={classes.overlay} >
        //                 <div className={classes.cardContent}>
        //                     <Typography
        //                         className={classes.paddingCardTitle}
        //                         variant="subtitle1"
        //                         color="initial">{card.name}</Typography>
        //                     <Typography
        //                         variant="body2"
        //                         color="initial">{card.description}</Typography>
        //                 </div>
        //                 <div className={classes.cardAction}>
        //                     <RoundedButton label="¡QUIERO ESTE PLAN!" onClick={() => navigateTo({
        //                         pathname: "/planes/[slug]",
        //                         query: {
        //                             slug: card.slug,
        //                             personas: 2,
        //                             recetas: 2
        //                         }
        //                     })} />
        //                 </div>
        //             </div>
        //         </div>
        //     ))}
        // </Carousel>
        //         </div>
        //     </>
    )
})

export default PlansSection;


