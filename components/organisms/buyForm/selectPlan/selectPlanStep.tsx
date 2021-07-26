import React, { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Divider, Grid, Typography, useTheme, Container } from "@material-ui/core";
import { faqsSection } from "@lang";
import { Plan, getPlanVariant, Recipe, PlanVariant } from "@helpers";
import { useBuyFlow } from "@stores";
import { PlanWithIcon, CustomButton, SimpleAccordion, RoundedButton } from "@atoms";
import { PlanSize } from "@molecules";
import RecipesCalculation from "../../../molecules/recipesCalculation/recipesCalculation";
import RecipesSection from "../../sections/RecipesSection";
import ReviewsSection from "../../sections/ReviewsSection";
import { useStyles } from "./styles";
import { SelectPlanProps, ARGS } from "./interfaces";
import { PlansList } from "./planesList";
import { useSnackbar } from "notistack";

export const SelectPlanStep = memo((props: SelectPlanProps) => {
    const { push: navigateTo, locale: lang } = useRouter();
    const classes = useStyles();
    const theme = useTheme();
    const buyFlow = useBuyFlow();
    const [planSize, setPlanSize] = useState({});
    const [recipesOfWeek, setRecipesOfWeek] = useState<Recipe[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    const getPlanSize = useCallback((slug: string, plans: Plan[]) => {
        const planSelect = plans.find((plan) => plan.slug === slug);

        const peopleLabels = planSelect.variants ?.reduce((_planSize, _variant) => {
            const valueIsIncluded = (_planSize[_variant.numberOfPersons] || []).includes(_variant.numberOfRecipes);

            if (valueIsIncluded || !_variant ?.numberOfPersons) {
                return _planSize;
            }

            _planSize[_variant.numberOfPersons] = [...(_planSize[_variant.numberOfPersons] || []), _variant.numberOfRecipes];
            return _planSize;
        }, {});
        return peopleLabels;
    }, []);

    const handleOnSelectPlan = (plan: Plan) => {
        const recipeQty = buyFlow.form.variant ?.numberOfRecipes || parseInt(props.initialPlanSettings.recipeQty);
        const peopleQty = buyFlow.form.variant ?.numberOfPersons || parseInt(props.initialPlanSettings.personQty);

        const { variant, errors, slug, id, recipes } = getPlanVariant(
            {
                slug: plan.slug,
                recipeQty,
                peopleQty,
            },
            props.plans
        );

        if (errors.length) {
            console.log("***->Oops!", errors);
            errors.forEach((errorMessage) => {
                enqueueSnackbar(errorMessage, { variant: "warning" });
            });
        }

        const planSize = getPlanSize(plan.slug, props.plans);
        setPlanSize(planSize);
        setRecipesOfWeek(recipes);
        buyFlow.setPlanCode(plan.id, plan.slug);
        navigate(variant, id, slug);
    };

    const handleOnSelectPeopleQty = (qty: ARGS) => {
        const { variant, errors, slug, id } = getPlanVariant(
            {
                peopleQty: parseInt(qty.value),
                recipeQty: buyFlow.form.variant ?.numberOfRecipes || parseInt(props.initialPlanSettings.recipeQty),
                slug: buyFlow.form.planSlug,
            },
            props.plans
        );

        if (errors.length) {
            console.log("***->Oops!", errors);
            errors.forEach((errorMessage) => {
                enqueueSnackbar(errorMessage, { variant: "warning" });
            });
        }

        navigate(variant, id, slug);
    };

    const handleOnSelectRecipeQty = (qty: ARGS) => {
        const { variant, errors, slug, id } = getPlanVariant(
            {
                recipeQty: parseInt(qty.value),
                peopleQty: buyFlow.form.variant ?.numberOfPersons || parseInt(props.initialPlanSettings.personQty),
                slug: buyFlow.form.planSlug,
            },
            props.plans
        );

        if (errors.length) {
            console.log("***->Oops!", errors);
            errors.forEach((errorMessage) => {
                enqueueSnackbar(errorMessage, { variant: "warning" });
            });
        }

        navigate(variant, id, slug);
    };

    const navigate = (variant: PlanVariant, planId: string, slug?: string) => {
        buyFlow.setPlanVariant(variant);
        buyFlow.setPlanCode(planId, slug);

        navigateTo(
            {
                pathname: "/planes/[slug]",
                query: {
                    slug: slug,
                    recetas: variant.numberOfRecipes,
                    personas: variant.numberOfPersons,
                },
            },
            undefined,
            {
                shallow: true,
            }
        );
    };

    useEffect(() => {
        buyFlow.setPlanCode(props.initialPlanSettings.id, props.initialPlanSettings.slug);
        buyFlow.setPlanVariant(props.variant);
        const _planSize = getPlanSize(props.initialPlanSettings.slug, props.plans);
        setPlanSize(_planSize);
        setRecipesOfWeek(props.recipes);
    }, []);

    return (
        <>
            <Container maxWidth="lg">
                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    {/* PLAN CARRUSEL */}
                    <Grid item xs={12}>
                        <Typography variant="h5">1. Elige tu plan</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.smUpHide}>
                            {props.plans.map((plan, index) => {
                                return (
                                    <PlanWithIcon
                                        key={index}
                                        plan={plan}
                                        isSelected={buyFlow.form.planSlug === plan.slug}
                                        onClick={handleOnSelectPlan}
                                    />
                                );
                            })}
                        </div>
                    </Grid>
                    <Grid item xs={12} direction="row" justify="center" className={clsx(classes.smDownHide)}>
                        <PlansList plans={props.plans} slug={buyFlow.form.planSlug} handleOnSelectPlan={handleOnSelectPlan} />
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: theme.spacing(2), marginBottom: theme.spacing(6) }}>
                        <Typography variant="body1">Descripción del producto seleccionado</Typography>
                    </Grid>
                    <Grid container spacing={2} justifyContent='center'>
                        <Grid item xs={4}>
                            {!!Object.keys(planSize).length && (
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="h5">2. Elige el tamaño de tu plan</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PlanSize
                                            name="peopleQty"
                                            subtitle={"Cantidad de personas"}
                                            fromArray={Object.keys(planSize)}
                                            valueSelected={`${buyFlow.form.variant ?.numberOfPersons}`}
                                            handleOnChange={handleOnSelectPeopleQty}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <PlanSize
                                            name="recipeQty"
                                            subtitle="Cantidad de recetas por semana"
                                            fromArray={planSize[buyFlow.form.variant ?.numberOfPersons]}
                                            valueSelected={`${buyFlow.form.variant ?.numberOfRecipes}`}
                                            handleOnChange={handleOnSelectRecipeQty}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </Grid>
                        <Grid item xs={2}>
                            <div className={classes.divider} />
                        </Grid>
                        <Grid item xs={4} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <RecipesCalculation
                                recipesQty={buyFlow.form.variant ?.numberOfRecipes}
                                peopleQty={buyFlow.form.variant ?.numberOfPersons}
                                totalPrice={buyFlow.form.variant ?.priceWithOffer || buyFlow.form.variant ?.price}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: 'center', marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                        <RoundedButton label="Seleccionar plan" onClick={() => buyFlow.forward()} />
                        <Typography variant="body2" color='textSecondary' style={{ marginTop: theme.spacing(2) }}>Podrás elegir las recetas en el último paso. Cada semana cambiamos las recetas.</Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* RECIPES SECTION */}
            {!!recipesOfWeek.length && (
                <div className={classes.recipeSection} >
                    <RecipesSection
                        title="Hecha un vistazo a las recetas de esta semana"
                        subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                        titleAlign="center"
                        recipes={recipesOfWeek}
                    />
                </div>
            )}

            {/* FAQS SECTION */}
            <Container maxWidth="lg">
                <Grid container spacing={2} className={classes.faqsSection}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align='center' style={{ marginBottom: theme.spacing(2) }}>
                            Preguntas frecuentes
                        </Typography>
                        <Typography variant="body1" align='center'>
                            ¿Necesitas ayuda? Revisa nuestras preguntas frecuentes o consulta en nuestro chat
                        </Typography>
                        <Grid item xs={12} sm={8} style={{ margin: `${theme.spacing(4)}px auto 0px auto` }}>
                            <Grid container spacing={2}>
                                {props.faqs.map((faq, index) => (
                                    // TODO: what is the origin for FAQS? {faqsSection[lang].sections}
                                    <Grid item xs={12}>
                                        <SimpleAccordion question={faq.question} answer={faq.answer} key={index} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            {/* REVIEWS SECTION */}
            <div className={classes.reviewsSection}>
                <ReviewsSection />
            </div>

            {/* FOOTER SECTION */}
            <Grid item container direction="row" component="nav" xs={12} className={classes.footer}>
                <Grid item className={classes.footerItem} xs>
                    Let's Cook 2021 © Todos los derechos reservados
                </Grid>
                <Grid item className={classes.footerItem}>
                    Términos y condiciones
                </Grid>
                <Grid item className={classes.footerItem}>
                    Política de privacidad
                </Grid>
            </Grid>
        </>
    );
});

export default SelectPlanStep;
