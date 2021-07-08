import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";

import { PlanWithIcon, CustomButton, SimpleAccordion } from "@atoms";
import { PlanSize, } from "@molecules";
import RecipesCalculation from "../../../molecules/recipesCalculation/recipesCalculation";
import RecipesSection from "../../sections/RecipesSection";
import ReviewsSection from "../../sections/ReviewsSection";

import { Plan, FAQS, PlanVariant, getPlanVariant } from "@helpers";
import { useBuyFlow } from "@stores";
import { faqsSection } from "@lang";
import { useRouter } from "next/router";
import { useStyles } from "./styles";
import { SelectPlanProps, ARGS } from "./interfaces";
import { PlansList } from "./planesList";

export const SelectPlanStep = memo((props: SelectPlanProps) => {

    const { push: navigateTo, locale: lang } = useRouter();
    const classes = useStyles();
    const buyFlow = useBuyFlow();
    const [planSize, setPlanSize] = useState({});

    const getPlanSize = useCallback((slug: string, plans: Plan[]) => {
        const planSelect = plans.find(plan => plan.slug === slug)

        const peopleLabels = planSelect.variants?.reduce((planSize, variant) => {

            const valueIsIncluded = (planSize[variant.numberOfPersons] || [])
                .includes(variant.numberOfRecipes)

            if (valueIsIncluded) { return planSize; }

            planSize[variant.numberOfPersons] = [
                ...(planSize[variant.numberOfPersons] || []),
                variant.numberOfRecipes
            ];
            return planSize;
        }, {});
        return peopleLabels;
    }, [])

    const handleOnSelectPeopleQty = (qty: ARGS) => {
        // buyFlow.setPeopleQty(qty.value);
        // navigateTo({
        //     pathname: "/planes/[slug]",
        //     query: {
        //         slug: buyFlow.form.planSlug,
        //         personas: qty.value,
        //         recetas: buyFlow.form.recipesQty || props.initialPlanSettings.recipeQty,
        //     },
        // }, undefined, {
        //     shallow: true
        // });
    };

    const handleOnSelectRecipeQty = (qty: { name: string; value: string }) => {
        // buyFlow.setRecipesQty(qty.value);
        // navigateTo({
        //     pathname: "/planes/[slug]",
        //     query: {
        //         slug: buyFlow.form.planSlug,
        //         personas: buyFlow.form.peopleQty || props.initialPlanSettings.personQty,
        //         recetas: qty.value,
        //     },
        // }, undefined, {
        //     shallow: true
        // });
    };

    const handleOnSelectPlan = (plan: Plan) => {
        buyFlow.setPlanCode(plan.id, plan.slug);
        const planSize = getPlanSize(plan.slug, props.plans)
        setPlanSize(planSize)

        const recipesQty = planSize[buyFlow.form.variant?.numberOfPersons]
        const recipeQtyExist = (recipesQty || []).includes(`${buyFlow.form.variant?.numberOfRecipes}`)

        const peopleQty: number = recipesQty ?
            (buyFlow.form.variant?.numberOfPersons || parseInt(props.initialPlanSettings.personQty)) :
            (parseInt(Object.keys(planSize)[0]) || 0);

        const recipeQty = recipeQtyExist ?
            (buyFlow.form.variant?.numberOfRecipes || props.initialPlanSettings.recipeQty) :
            Object.values(planSize)[0][0]

        const {variant} = getPlanVariant({
            slug: plan.slug,
            recipeQty,
            peopleQty
        }, props.plans);
       // buyFlow.setPlanVariant(variant);

        console.log('***-Variant: ', variant?.name[lang]);

        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: plan.slug,
                personas: peopleQty,
                recetas: recipeQty
            }
        }, undefined, {
            shallow: true
        });
    };

    useEffect(() => {
        buyFlow.setPlanCode(props.initialPlanSettings.id, props.initialPlanSettings.slug);
        buyFlow.setPlanVariant(props.variant);
        const planSize = getPlanSize(props.initialPlanSettings.slug, props.plans)
        setPlanSize(planSize)
    }, [])

    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item xs={10}>
                <Typography variant="h5">1. Elige tu plan</Typography>
            </Grid>

            <Grid item xs={12}>
                <div className={clsx(classes.root, classes.smUpHide)}>
                    {props.plans.map((plan, index) => {
                        return <PlanWithIcon
                            key={index}
                            plan={plan}
                            isSelected={buyFlow.form.planSlug === plan.slug}
                            onClick={handleOnSelectPlan}
                        />
                    })}
                </div>
            </Grid>

            <Grid className={clsx(classes.smDownHide)} item container direction="row" justify="center">
                <PlansList
                    plans={props.plans}
                    slug={buyFlow.form.planSlug}
                    handleOnSelectPlan={handleOnSelectPlan}
                />
            </Grid>

            <Grid item xs={10}>
                <Typography variant="body1">Descripción del producto seleccionado</Typography>
            </Grid>

            <Grid item container direction="row" justify="center" spacing={2}>
                <Grid item xs={10}>
                    <Typography variant="h5">2. Elige el tamaño de tu plan</Typography>
                </Grid>
                <Grid item xs={10}>
                    {console.log('***-> Variant Value: ', buyFlow.form.variant?.numberOfPersons, buyFlow.form.variant?.numberOfRecipes)}
                    <PlanSize
                        name="peopleQty"
                        subtitle={"Cantidad de personas"}
                        fromArray={Object.keys(planSize)}
                        // valueSelected={`${buyFlow.form.variant?.numberOfPersons}` || `${props.variant?.numberOfPersons}`}
                        handleOnChange={handleOnSelectPeopleQty}
                    />
                </Grid>
                <Grid item xs={10}>
                    <PlanSize
                        name="recipeQty"
                        subtitle="Cantidad de recetas por semana"
                        fromArray={planSize[buyFlow.form.variant?.numberOfPersons]}
                        // valueSelected={`${buyFlow.form.variant?.numberOfRecipes}` || `${props.variant?.numberOfRecipes}`}
                        handleOnChange={handleOnSelectRecipeQty}
                    />
                </Grid>
                <Grid item xs={10}>
                    <RecipesCalculation
                        recipesQty={buyFlow.form.variant?.numberOfRecipes ||
                            props.variant?.numberOfRecipes}
                        peopleQty={buyFlow.form.variant?.numberOfPersons ||
                            props.variant?.numberOfPersons}
                        totalPrice={buyFlow.form.variant?.priceWithOffer ||
                            buyFlow.form.variant?.price ||
                            props.variant?.priceWithOffer ||
                            props.variant?.price
                        } />
                </Grid>
            </Grid>

            <Grid item xs={10}>
                <CustomButton text="Seleccionar plan" onClick={() => buyFlow.forward()} />
            </Grid>

            <Grid item xs={10}>
                <Typography variant="body1">Podrás elegir las recetas en el último paso. Cada semana cambiamos las recetas.</Typography>
            </Grid>

            <Grid className={classes.recipeSection} item xs={12}>
                <RecipesSection
                    title="Hecha un vistazo a las recetas de esta semana"
                    subtitle="Lorem ipsum dolor sit amet, consetetur sadipscing elitr sed diam"
                    titleAlign="center"
                />
            </Grid>
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
            <Grid item xs={12}>
                <ReviewsSection />
            </Grid>
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
