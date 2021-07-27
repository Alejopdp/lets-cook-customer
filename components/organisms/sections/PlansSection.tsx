import { Typography, Container, Grid } from "@material-ui/core/";
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";

import { Plan } from "@helpers";
import { usePlansStyles as useStyles } from "./styles";
import { PlansSectionProps } from "./interfaces";
import { memo } from "react";
import { useLang } from "@hooks";

export const PlansSection = memo((props: PlansSectionProps) => {
    const { push: navigateTo, locale } = useRouter();
    const classes = useStyles();
    const [lang] = useLang('homeSession');

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Title
                    title={lang.foundPlansForYou}
                    subtitle={lang.foundPlansForYouSubtitle}
                />
                {(props.cards || []).map((card, index) => (
                    <Grid key={index} item xs={12} md={3}>
                        <div
                            className={classes.card}
                            style={{
                                backgroundImage: `url(${card.imageUrl})`,
                            }}
                        >
                            <div className={classes.overlay}>
                                <div className={classes.cardContent}>
                                    <Typography className={classes.paddingCardTitle} variant="subtitle1" color="initial">
                                        {card.name[locale]}
                                    </Typography>
                                    <Typography variant="body2" color="initial">
                                        {card.description}
                                    </Typography>
                                </div>
                                <div className={classes.cardAction}>
                                    <RoundedButton
                                        label="¡QUIERO ESTE PLAN!"
                                        onClick={() =>
                                            navigateTo({
                                                pathname: "/planes/[slug]",
                                                query: {
                                                    slug: card.slug,
                                                    personas: card.variants[0]?.numberOfPersons || "",
                                                    recetas: card.variants[0]?.numberOfRecipes || "",
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
});

export default PlansSection;
