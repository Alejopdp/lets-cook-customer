import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";

import PlanWithIcon from "../../../atoms/planWithIcon/planWithIcon";
import CustomButton from "../../../atoms/customButton/customButton";
import SimpleAccordion from "../../../atoms/accordion/accordion";
import PlanSize from "../../../molecules/planSize/planSize";
import RecipesCalculation from "../../../molecules/recipesCalculation/recipesCalculation";
import RecipesSection from "../../sections/RecipesSection";
import ReviewsSection from "../../sections/ReviewsSection";

import { Plan, FAQS } from "../../../../helpers/serverRequests";
import { PlanUrlParams } from "../../../../pages/planes/[slug]";

import { useBuyFlow } from "../../../../stores/buyFlow";
import { useStyles } from "./styles";
import { faqsSection } from "../../../../lang";
import { useRouter } from "next/router";

interface SelectPlanProps {
    plans: Plan[];
    faqs: FAQS[];
    initialPlanSettins: PlanUrlParams;
}

export const SelectPlanStep = (props: SelectPlanProps) => {
    const { push: navigateTo } = useRouter();
    const classes = useStyles();

    const buyFlow = useBuyFlow();

    const handleOnSelectPeopleQty = (qty: { name: string; value: string }) => {
        buyFlow.setPeopleQty(qty.value);
        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: props.initialPlanSettins.slug,
                personas: qty.value,
                recetas: props.initialPlanSettins.recipeQty,
            },
        });
    };

    const handleOnSelectRecipeQty = (qty: { name: string; value: string }) => {
        buyFlow.setRecipesQty(qty.value);
        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: props.initialPlanSettins.slug,
                personas: props.initialPlanSettins.personQty,
                recetas: qty.value,
            },
        });
    };

    const handleOnSelectPlan = (plan: Plan) => {
        buyFlow.setPlanCode(plan.id);
        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: plan.slug,
                personas: props.initialPlanSettins.personQty,
                recetas: props.initialPlanSettins.recipeQty
            },
        });
    };

    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item xs={10}>
                <Typography variant="h5">1. Elige tu plan</Typography>
            </Grid>

            <Grid item xs={12}>
                <div className={clsx(classes.root, classes.smUpHide)}>
                    {props.plans.map((plan, index) => (
                        <PlanWithIcon
                            key={index}
                            plan={plan}
                            isSelected={props.initialPlanSettins.slug === plan.slug}
                            onClick={handleOnSelectPlan}
                        />
                    ))}
                </div>
            </Grid>

            <Grid className={clsx(classes.smDownHide)} item container direction="row" justify="center">
                {props.plans.map((plan, index) => (
                    <PlanWithIcon
                        key={index}
                        plan={plan}
                        isSelected={props.initialPlanSettins.slug === plan.slug}
                        onClick={handleOnSelectPlan}
                    />
                ))}
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
};

export default SelectPlanStep;
