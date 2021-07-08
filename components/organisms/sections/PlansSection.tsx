import { Typography, Container, Grid } from '@material-ui/core/';
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from '@atoms';
import { useRouter } from 'next/router';

import {Plan} from '@helpers';
import { usePlansStyles as useStyles } from "./styles";
import { PlansSectionProps } from "./interfaces";
import { memo } from 'react';

const _cards:Plan[] = [
    {
        name: {
            es: "Plan familiar",
            en: "Plan familiar",
            ca: "Plan familiar"
        },
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-familiar",
        id: '',
        sku: ''
    },
    {
        name: {
            es: "Plan gourmet",
            en: "Plan gourmet",
            ca: "Plan gourmet"
        },
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-gourmet",
        id: '',
        sku: ''
    },
    {
        name: {
            es: "Plan vegetariano/vegano",
            en: "Plan vegetariano/vegano",
            ca: "Plan vegetariano/vegano"
        },
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-vegetariano",
        id: '',
        sku: ''
    },
    {
        name: {
            es: "Plan ahorro",
            en: "Plan ahorro",
            ca: "Plan ahorro"
        },
        description: "Lorem ipsum dolor sit consetetur dipscing elitr, sed diam nonumy",
        imageUrl: "unnamed.jpg",
        slug: "plan-ahorro",
        id: '',
        sku: ''
    },
];

export const PlansSection = memo(({cards = _cards}: PlansSectionProps) => {
    const {push: navigateTo, locale} = useRouter();
    
    const classes = useStyles();

    return (
        <Container maxWidth='lg'>
            <Grid container spacing={2}>
                <Title
                    title="Encuentra el plan indicado para tí"
                    subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                />
                {cards.map((card, index) => (
                    <Grid item xs={12} md={3}>
                        <div key={index} className={classes.card} style={{
                            backgroundImage: `url(${classes.img})`
                        }}>
                            <div className={classes.overlay} >
                                <div className={classes.cardContent}>
                                    <Typography
                                        className={classes.paddingCardTitle}
                                        variant="subtitle1"
                                        color="initial">{card.name[locale]}</Typography>
                                    <Typography
                                        variant="body2"
                                        color="initial">{card.description}</Typography>
                                </div>
                                <div className={classes.cardAction}>
                                    <RoundedButton label="¡QUIERO ESTE PLAN!" onClick={()=>navigateTo({
                                        pathname:"/planes/[slug]",
                                        query: {
                                            slug: card.slug,
                                            personas: 2,
                                            recetas: 2
                                        }
                                    })} />
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
})

export default PlansSection;


