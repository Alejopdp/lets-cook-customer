import PropTypes from "prop-types";
import clsx from "clsx";
import { Grid, Typography } from "@material-ui/core";

import { useBuyFlow } from "../../../../stores/buyflow";

import PlanWithIcon from "../../../atoms/planWithIcon/planWithIcon";
import CustomButton from "../../../atoms/customButton/customButton";
import SimpleAccordion from "../../../atoms/accordion/accordion";
import PlanSize from "../../../molecules/planSize/planSize";
import RecipesCalculation from "../../../molecules/recipesCalculation/recipesCalculation";
import RecipesSection from "../../../organisms/sections/RecipesSection";
import ReviewsSection from "../../../organisms/sections/ReviewsSection";
import { useStyles } from "./styles";
import { faqsSection } from "../../../../lang";

export const SelectPlanStep = ({ plans = [], faqs = [] }) => {
    const gotToNextView = useBuyFlow(({ forward }) => forward);
    const classes = useStyles();
    const handleOnSelectPeopleQty = (p) => {
        console.log(p);
    };
    const handleOnSelectRecipeQty = (p) => {
        console.log(p);
    };
    return (
        <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
            <Grid item xs={10}>
                <Typography variant="h5">1. Elige tu plan</Typography>
            </Grid>

            <Grid item xs={12}>
                <div className={clsx(classes.root, classes.smUpHide)}>
                    {plans.map((plan, index) => (
                        <PlanWithIcon key={index} icon={plan.icon} checkedIcon={plan.checkedIcon} name={plan.name} />
                    ))}
                </div>
            </Grid>

            <Grid className={clsx(classes.smDownHide)} item container direction="row" justify="center">
                {plans.map((plan, index) => (
                    <PlanWithIcon key={index} icon={plan.icon} checkedIcon={plan.checkedIcon} name={plan.name} />
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
                        handleOnChange={handleOnSelectPeopleQty}
                    />
                </Grid>
                <Grid item xs={10}>
                    <PlanSize
                        name="recipeQty"
                        subtitle="Cantidad de recetas por semana"
                        fromNumber={2}
                        numberItems={5}
                        handleOnChange={handleOnSelectRecipeQty}
                    />
                </Grid>
                <Grid item xs={10}>
                    <RecipesCalculation recipesQty={4} peopleQty={3} totalPrice={40} />
                </Grid>
            </Grid>

            <Grid item xs={10}>
                <CustomButton text="Seleccionar plan" onClick={() => gotToNextView()} />
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
                {faqs.map((faq, index) => (
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

SelectPlanStep.propTypes = {
    plans: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            description: PropTypes.string,
            icon: PropTypes.string,
            checkedIcon: PropTypes.string,
            slug: PropTypes.string,
        })
    ),
    faqs: PropTypes.arrayOf(
        PropTypes.shape({
            question: PropTypes.string,
            answer: PropTypes.string,
        })
    ),
};

SelectPlanStep.defaultProps = {
    plans: [],
    faqs: [],
};

export default SelectPlanStep;
