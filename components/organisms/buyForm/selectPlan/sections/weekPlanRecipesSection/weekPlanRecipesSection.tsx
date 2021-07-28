import { GridList, makeStyles, Typography, Container, Grid, useMediaQuery, useTheme } from "@material-ui/core";
import PropTypes from "prop-types";
import RoundedButton from "../../../../../atoms/roundedButton/roundedButton";
import RecipeCard from "../../../../../molecules/recipeCard/recipeCard";
import TitleOtherPages from "../../../../../molecules/titleOtherPages/titleOtherPages";
import SectionTitleBuyFlow from "../../../../../molecules/sectionTitleBuyFlow/sectionTitleBuyFlow";

import { Recipe } from "@helpers";
import { useRecipesStyles as useStyles } from "./styles";
import { RecipesSectionProps } from "./interfaces";
import { memo } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useBuyFlow } from "@stores";

export const WeekPlanRecipesSection = memo((props: RecipesSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));
    const isLgDown = useMediaQuery(theme.breakpoints.down("md"));
    const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
    const { form } = useBuyFlow((state) => ({ form: state.form }));

    const handleClickOpenModal = (recipe: Recipe) => {
        console.log("***-> Recipe: ", recipe.name);
    };

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
        <>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <SectionTitleBuyFlow
                            title={`Recetas del ${form.planName} del ${form.weekLabel}`}
                            subtitle="Déjate sorprender por nuestras deliciosas recetas preparadas por chefs y aprende cocinando"
                        />
                    </Grid>
                    {props.recipes.length <= 4 && isLgUp && (
                        <Grid item xs={12}>
                            <Grid container spacing={2} style={{ justifyContent: "center" }}>
                                {props.recipes.map((recipe, key) => (
                                    <Grid key={key} item xs={12} sm={6} md={3}>
                                        <RecipeCard
                                            img={recipe.imageUrl}
                                            imgTags={recipe.imageTags}
                                            timeTag={recipe.cookDuration}
                                            difficultyTag={recipe.difficultyLevel}
                                            recipeName={recipe.name}
                                            handleClickOpenModal={() => {
                                                handleClickOpenModal(recipe);
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Container>
            {(props.recipes.length > 6 || isLgDown) && (
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
                        {props.recipes.map((recipe, key) => (
                            <RecipeCard
                                img={recipe.imageUrl}
                                imgTags={recipe.imageTags}
                                timeTag={recipe.cookDuration}
                                difficultyTag={recipe.difficultyLevel}
                                recipeName={recipe.name}
                                handleClickOpenModal={() => {
                                    handleClickOpenModal(recipe);
                                }}
                                style={{ marginRight: theme.spacing(2) }}
                            />
                        ))}
                    </Carousel>
                </div>
            )}
        </>
    );
});

export default WeekPlanRecipesSection;
