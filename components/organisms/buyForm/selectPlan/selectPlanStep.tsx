import React, { memo, useEffect } from "react";
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";

import { PlanWithIcon, CustomButton, SimpleAccordion } from "@atoms";
import { PlanSize, } from "@molecules";
import RecipesCalculation from "../../../molecules/recipesCalculation/recipesCalculation";
import RecipesSection from "../../sections/RecipesSection";
import ReviewsSection from "../../sections/ReviewsSection";

import { Plan, FAQS } from "@helpers";
import { useBuyFlow } from "@stores";
import { faqsSection } from "@lang";
import { useRouter } from "next/router";
import { useStyles } from "./styles";
import { SelectPlanProps, ARGS } from "./interfaces";
import { PlansList } from "./planesList";
import Slug from "pages/planes/[slug]";

export const SelectPlanStep = memo((props: SelectPlanProps) => {

    const { push: navigateTo } = useRouter();
    const classes = useStyles();
    const buyFlow = useBuyFlow();

    useEffect(() =>{
        buyFlow.setPlanCode( props.initialPlanSettins.id, props.initialPlanSettins.slug);
    },[])

    const handleOnSelectPeopleQty = (qty: ARGS) => {
        buyFlow.setPeopleQty(qty.value);
        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: buyFlow.form.planSlug,
                personas: qty.value,
                recetas: buyFlow.form.recipesQty || props.initialPlanSettins.recipeQty,
            },
        }, undefined, {
            shallow: true
        });
    };

    const handleOnSelectRecipeQty = (qty: { name: string; value: string }) => {
        buyFlow.setRecipesQty(qty.value);
        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: buyFlow.form.planSlug,
                personas: buyFlow.form.peopleQty || props.initialPlanSettins.personQty,
                recetas: qty.value,
            },
        }, undefined, {
            shallow: true
        });
    };

    const handleOnSelectPlan = (plan: Plan) => {
        buyFlow.setPlanCode(plan.id, plan.slug);
        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: plan.slug,
                personas: buyFlow.form.peopleQty || props.initialPlanSettins.personQty,
                recetas: buyFlow.form.recipesQty || props.initialPlanSettins.recipeQty
            }
        }, undefined, {
            shallow: true
        });
    };

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

                    }
                    )}
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
                    <PlanSize
                        name="peopleQty"
                        subtitle="Cantidad de personas"
                        fromNumber={2}
                        numberItems={4}
                        valueSelected={props.initialPlanSettins.personQty}
                        handleOnChange={handleOnSelectPeopleQty}
                    />
                </Grid>
                <Grid item xs={10}>
                    <PlanSize
                        name="recipeQty"
                        subtitle="Cantidad de recetas por semana"
                        fromNumber={2}
                        numberItems={5}
                        valueSelected={props.initialPlanSettins.recipeQty}
                        handleOnChange={handleOnSelectRecipeQty}
                    />
                </Grid>
                <Grid item xs={10}>
                    <RecipesCalculation recipesQty={4} peopleQty={3} totalPrice={40} />
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
