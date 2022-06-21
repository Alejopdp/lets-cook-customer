// Utils & Config
import React from "react";
import { useTheme, useMediaQuery } from "@material-ui/core";
import clsx from "clsx";

// External Components
import { Rating } from "@material-ui/lab";
import { Typography, Container, Grid } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

// Internal Components
import GoogleReviewBox from "../../molecules/googleReviewBox/googleReviewBox";
import { ReviewsSectionProps } from "./interfaces";
import classes from "./reviewsStyles.module.scss";

const data = [
    {
        id: 5,
        name: "Nuria Varas",
        avatar: {
            src: "https://lh3.googleusercontent.com/a-/AOh14Gi0qdq2qGecuq5RrrfAmCYSFbGt5u2zx5T3yhVRag=w72-h72-p-rp-mo-br100",
            alt: "Nuria Varas",
        },
        stars: 5,
        date: "",
        text: "Lets Cook es mi mejor descubrimiento de 2020! No solo es un concepto muy bueno que te ahorra compras, tiempo y elimina desperdicio de comida, sino que está súper bien ejecutado. Son flexibles con los horarios de reparto, te avisan por whatsapp para asegurarte una semana si te has olvidado de pedir o de cancelar y están disponibles para cualquier duda o problema. Como plus; aceptan ticket Restaurant :) yo se lo recomiendo a todo el mundo, realmente una vez lo pruebas no hay vuelta atrás! Y si unas semanas quieres descansar, ningún tipo de problema!!",
    },
    {
        id: 7,
        name: "Llibert Carbonell",
        avatar: {
            src: "https://lh3.googleusercontent.com/a-/AOh14GhCBYsnmoLkknBZOMaPHji5iBD0XMndXT9ONBhPHg=w72-h72-p-rp-mo-ba2-br100",
            alt: "Llibert Carbonell",
        },
        stars: 5,
        date: "",
        text: "Estamos encantados con let's cook. Los productos son de muy buena calidad, sobre todo carnes y pescados. Las verduras super frescas y con sabor. El empaquetado es excelente. Y sobre todo incluyen absolutamente todos los ingredientes y en cantidades hogadas. Para que no te falte de nada. Recomendable totalmente. Las recetas muy bien explicadas, con fotos. Ademas de comer sano, aprendes a cocinar y aprendes recetas nuevas. Y el precio mas que razonable.",
    },
    {
        id: 6,
        name: "Laura Lorenzo",
        avatar: {
            src: "https://lh3.googleusercontent.com/a-/AOh14GjR7WV-R0boJR9OnrgJE_IDCPLgvsNnMJeENeT51qs=w72-h72-p-rp-mo-ba3-br100",
            alt: "Laura Lorenzo",
        },
        stars: 5,
        date: "",
        text: "Me encantan las recetas de Let's Cook. Me ayudan a comer sano, sin tener que pensar en los ingredientes o en cómo combinarlos. Let's Cook te da todo en bandeja (reciclable) y con ingredientes de buena calidad. He descubierto sabores que nunca había cocinado antes y a mi marido y a mi nos encanta! También como vegana tengo que recomendarlo porque incluso las recetas vegetarianas (que contienen lácteos) me las adaptan sin problema alguno 🙌🏼💚",
    },
    {
        id: 1,
        name: "Toni Herrera",
        avatar: {
            src: "https://lh3.googleusercontent.com/a-/AOh14GiOSnjmpPUTZXso-ANHeWmjrBMDfvBp8lgsRiWd=w72-h72-p-rp-mo-br100",
            alt: "Toni Herrera",
        },
        stars: 5,
        date: "",
        text: "La  comida es muy fresca! Las recetas estan muy bien explicadas y son faciles de seguir. Además disponen de recetas tanto en texto como en vídeo. Otra cosa que me gusta es que estan muy comprometidos con el planeta y el medioambiente. Y por último pero no menos importante, el trato del personal es perfecto tanto a la hora de repartir como de gestionar tus dudas/problemas. Altamente recomendado!!!!",
    },
    {
        id: 2,
        name: "Patricia López",
        avatar: {
            src: "https://lh3.googleusercontent.com/a-/AOh14Ghpxki93l0BCspCXz882SVqITTBfV6e5n98ZrMLfQ=w72-h72-p-rp-mo-br100",
            alt: "Patricia López",
        },
        stars: 5,
        date: "",
        text: "Let's cook es genial, todos los productos son de muy buena calidad y en la cantidad exacta, para hacer recetas rápidas y sencillas, pero sorprendentes. Una oportunidad para descubrir especias nuevas, que me encantan, sin tener que tener de todo en casa. Ideal ahora con el teletrabajo. Recomendado 100%.",
    },
    {
        id: 4,
        name: "Melania Ellena",
        avatar: {
            src: "https://lh3.googleusercontent.com/a-/AOh14GixUq-39CvG2bgt4GfqFb6YlNJWuwKVO9-wRYGKfIs=w72-h72-p-rp-mo-ba2-br100",
            alt: "Melania Ellena",
        },
        stars: 5,
        date: "",
        text: "Pedir en Let’s Cook te brinda la posibilidad de aprender a cocinar, a mezclar sabores inimaginables y a variar tus cenas y almuerzos manteniendo una alimentación saludable. No es la típica casa de “viandas”. Ellos te envían los ingredientes exactos y la receta pasó a paso y tu los cocinas. Me encanta!",
    },
    {
        id: 3,
        name: "Amparo López Lapeña",
        avatar: {
            src: "https://lh3.googleusercontent.com/a-/AOh14Gjm0G1o1eNpxoNTcJeA832_w9APOX1W9Ezx9UvQ=w72-h72-p-rp-mo-br100",
            alt: "Amparo López Lapeña",
        },
        stars: 5,
        date: "",
        text: "¡Súper recomendable! Quedé encantada con Let’s Cook. No solo te resuelven el tema de pensar todo el día en qué cocinar, sino que te entregan productos de primera calidad. El resultado es un plato de comida rica y saludable todos los días.",
    },
];

export const ReviewsSection = ({ reviews = data }: ReviewsSectionProps) => {
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
                            <img className={clsx(classes.item, classes.img)} src="/assets/img-google-logo.png" />
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
                    {reviews.map((review, index) => (
                        <GoogleReviewBox key={index} review={review} />
                    ))}
                </Carousel>
            </div>
        </>
    );
};

export default ReviewsSection;
