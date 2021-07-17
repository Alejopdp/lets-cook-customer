import React, { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Divider, Grid, Typography } from "@material-ui/core";
import { faqsSection } from "@lang";
import { Plan, getPlanVariant, Recipe, PlanVariant } from "@helpers";
import { useBuyFlow } from "@stores";
import { PlanWithIcon, CustomButton, SimpleAccordion } from "@atoms";
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
    const buyFlow = useBuyFlow();
    const [planSize, setPlanSize] = useState({});
    const [recipesOfWeek, setRecipesOfWeek] = useState<Recipe[]>([]);
    const { enqueueSnackbar } = useSnackbar();

    const getPlanSize = useCallback((slug: string, plans: Plan[]) => {
        const planSelect = plans.find((plan) => plan.slug === slug);

        const peopleLabels = planSelect.variants?.reduce((_planSize, _variant) => {
            const valueIsIncluded = (_planSize[_variant.numberOfPersons] || []).includes(_variant.numberOfRecipes);

            if (valueIsIncluded || !_variant?.numberOfPersons) {
                return _planSize;
            }

            _planSize[_variant.numberOfPersons] = [...(_planSize[_variant.numberOfPersons] || []), _variant.numberOfRecipes];
            return _planSize;
        }, {});
        return peopleLabels;
    }, []);

    const handleOnSelectPlan = (plan: Plan) => {
        const recipeQty = buyFlow.form.variant?.numberOfRecipes || parseInt(props.initialPlanSettings.recipeQty);
        const peopleQty = buyFlow.form.variant?.numberOfPersons || parseInt(props.initialPlanSettings.personQty);

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
                recipeQty: buyFlow.form.variant?.numberOfRecipes || parseInt(props.initialPlanSettings.recipeQty),
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
                peopleQty: buyFlow.form.variant?.numberOfPersons || parseInt(props.initialPlanSettings.personQty),
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
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            {/* PLAN CARRUSEL */}

            <Grid item xs={10}>
                <Typography variant="h5">1. Elige tu plan</Typography>
            </Grid>

            <Grid item xs={12}>
                <div className={clsx(classes.root, classes.smUpHide)}>
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

            {/* PLAN DETAIL */}

            <Grid className={clsx(classes.smDownHide)} item container direction="row" justify="center">
                <PlansList plans={props.plans} slug={buyFlow.form.planSlug} handleOnSelectPlan={handleOnSelectPlan} />
            </Grid>

            <Grid item xs={10}>
                <Typography variant="body1">Descripción del producto seleccionado</Typography>
            </Grid>

            <Grid item container xs={10}>
                <Typography variant="h5">2. Elige el tamaño de tu plan</Typography>
            </Grid>

            <Grid item container direction="row" justify="center" spacing={2}>
                {!!Object.keys(planSize).length && (
                    <>
                        <Grid item container xs={4} spacing={2}>
                            <Grid item xs={12}>
                                <PlanSize
                                    name="peopleQty"
                                    subtitle={"Cantidad de personas"}
                                    fromArray={Object.keys(planSize)}
                                    valueSelected={`${buyFlow.form.variant?.numberOfPersons}`}
                                    handleOnChange={handleOnSelectPeopleQty}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <PlanSize
                                    name="recipeQty"
                                    subtitle="Cantidad de recetas por semana"
                                    fromArray={planSize[buyFlow.form.variant?.numberOfPersons]}
                                    valueSelected={`${buyFlow.form.variant?.numberOfRecipes}`}
                                    handleOnChange={handleOnSelectRecipeQty}
                                />
                            </Grid>
                        </Grid>

                        <Grid item xs={2}>
                            <div className={classes.divider} />
                        </Grid>
                    </>
                )}

                <Grid item xs={4}>
                    <RecipesCalculation
                        recipesQty={buyFlow.form.variant?.numberOfRecipes}
                        peopleQty={buyFlow.form.variant?.numberOfPersons}
                        totalPrice={buyFlow.form.variant?.priceWithOffer || buyFlow.form.variant?.price}
                    />
                </Grid>
            </Grid>

            {/* PLAN DETAIL */}

            <Grid item xs={10} direction="column" container alignItems="center">
                <Grid item xs>
                    <CustomButton text="Seleccionar plan" onClick={() => buyFlow.forward()} />
                </Grid>
                <Grid item xs={10}>
                    <Typography variant="body1">Podrás elegir las recetas en el último paso. Cada semana cambiamos las recetas.</Typography>
                </Grid>
            </Grid>

            {/* RECIPES SECTION */}

            {!!recipesOfWeek.length && (
                <Grid className={classes.recipeSection} item xs={12}>
                    <div className={classes.separatorOffset}></div>
                    <RecipesSection
                        title="Hecha un vistazo a las recetas de esta semana"
                        subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                        titleAlign="center"
                        recipes={recipesOfWeek}
                    />
                </Grid>
            )}

            {/* FAQS SECTION */}

            <Grid item xs={10}>
                <div className={classes.faqsTitle}>
                    <Typography variant="subtitle1">Preguntas frecuentes</Typography>
                    <Typography variant="body1">
                        ¿Necesitas ayuda? Revisa nuestras preguntas frecuentes o consulta en nuestro chat
                    </Typography>
                </div>
                {props.faqs.map((faq, index) => (
                    // TODO: what is the origin for FAQS? {faqsSection[lang].sections}
                    <SimpleAccordion question={faq.question} answer={faq.answer} key={index} />
                ))}
            </Grid>

            {/* REVIEWS SECTION */}

            <Grid item xs={12}>
                <ReviewsSection />
            </Grid>

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
        </Grid>
    );
});

export default SelectPlanStep;
