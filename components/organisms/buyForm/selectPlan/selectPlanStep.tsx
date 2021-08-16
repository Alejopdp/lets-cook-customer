import React, { memo, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import { Divider, Grid, Typography, useTheme, Container } from "@material-ui/core";
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
import SectionTitleBuyFlow from "components/molecules/sectionTitleBuyFlow/sectionTitleBuyFlow";
import WeekPlanRecipesSection from "./sections/weekPlanRecipesSection/weekPlanRecipesSection";
import TermsAndConditionsModal from "../../../molecules/legalModals/termsAndConditionsModal";
import PrivacyPolicyModal from "../../../molecules/legalModals/privacyPolicyModal";

const langs = require("../../../../lang").selectPlanStep;

export const SelectPlanStep = memo((props: SelectPlanProps) => {
    // const { push: navigateTo, locale: lang } = useRouter();
    const router = useRouter();
    const lang = langs[router.locale];
    const classes = useStyles();
    const theme = useTheme();
    const buyFlow = useBuyFlow();
    console.log('buyFlow', buyFlow)
    const [planSize, setPlanSize] = useState({});
    console.log('planSize', planSize)
    const [recipesOfWeek, setRecipesOfWeek] = useState<Recipe[]>([]);
    const [openTycModal, setOpenTycModal] = useState(false)
    const [openPrivacyPolicyModal, setOpenPrivacyPolicyModal] = useState(false)
    const { enqueueSnackbar } = useSnackbar();
    
    const getPlanData = useCallback(
        (slug: string, plans: Plan[]): { peopleLabels: string; planName: string; planDescription: string; canChooseRecipes: boolean } => {
            const planSelect = plans.find((plan) => plan.slug === slug);

            const peopleLabels = planSelect.variants ?.reduce((_planSize, _variant) => {
                const valueIsIncluded = (_planSize[_variant.numberOfPersons] || []).includes(_variant.numberOfRecipes);

                if (valueIsIncluded || !_variant ?.numberOfPersons) {
                    return _planSize;
                }

                _planSize[_variant.numberOfPersons] = [...(_planSize[_variant.numberOfPersons] || []), _variant.numberOfRecipes];
                return _planSize;
            }, {});

            return {
                peopleLabels,
                planName: planSelect.name,
                planDescription: planSelect.description,
                canChooseRecipes: planSelect.abilityToChooseRecipes,
            };
        },
        []
    );

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
        }

        const { peopleLabels, planName } = getPlanData(plan.slug, props.plans);
        setPlanSize(peopleLabels);
        setRecipesOfWeek(recipes);
        buyFlow.setPlanCode(plan.id, plan.slug, plan.name, plan.description, plan.abilityToChooseRecipes);
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
        }

        navigate(variant, id, slug);
    };

    const navigate = (variant: PlanVariant, planId: string, slug?: string) => {
        buyFlow.setPlanVariant(variant);
        buyFlow.setPlanCode(planId, slug, buyFlow.form.planName, buyFlow.form.planDescription, buyFlow.form.canChooseRecipes);

        router.push(
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
        const { peopleLabels, planName, planDescription, canChooseRecipes } = getPlanData(props.initialPlanSettings.slug, props.plans);
        buyFlow.setPlanCode(props.initialPlanSettings.id, props.initialPlanSettings.slug, planName, planDescription, canChooseRecipes);
        buyFlow.setPlanVariant(props.variant);
        setPlanSize(peopleLabels);
        setRecipesOfWeek(props.recipes);
    }, []);



    // TyC Modal Functions

    const handleOpenTycModal = () => {
        setOpenTycModal(true);
    };

    const handleCloseTycModal = () => {
        setOpenTycModal(false);
    };

    
    // Privacy Policy Modal Functions

    const handleOpenPrivacyPolicyModal = () => {
        setOpenPrivacyPolicyModal(true);
    };

    const handleClosePrivacyPolicyModal = () => {
        setOpenPrivacyPolicyModal(false);
    };
    

    return (
        <>
            <Container maxWidth="lg" style={{ paddingTop: theme.spacing(6) }}>
                <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                    {/* PLAN CARRUSEL */}
                    <Grid item xs={12}>
                        <Typography variant="h5">1. Elige tu plan</Typography>
                    </Grid>
                    <Grid container spacing={2} style={{ marginTop: theme.spacing(2), justifyContent: "center" }}>
                        {props.plans.map((plan, index) => {
                            return (
                                <Grid item xs={6} md={2}>
                                    <PlanWithIcon
                                        key={index}
                                        plan={plan}
                                        isSelected={buyFlow.form.planSlug === plan.slug}
                                        onClick={handleOnSelectPlan}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: theme.spacing(4), marginBottom: theme.spacing(6) }}>
                        <Typography variant="body1">{buyFlow.form.planDescription}</Typography>
                    </Grid>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={4}>
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
                        <Grid item xs={12} md={2}>
                            <div className={classes.divider} />
                        </Grid>
                        <Grid item xs={12} md={4} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <RecipesCalculation
                                recipesQty={buyFlow.form.variant ?.numberOfRecipes}
                                peopleQty={buyFlow.form.variant ?.numberOfPersons}
                                totalPrice={buyFlow.form.variant ?.priceWithOffer || buyFlow.form.variant ?.price}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} style={{ textAlign: "center", marginTop: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                        <RoundedButton
                            label="Seleccionar plan"
                            onClick={() => buyFlow.forward()}
                            style={{ padding: `${theme.spacing(2.5)}px ${theme.spacing(8)}px` }}
                        />
                        <Typography variant="body2" color="textSecondary" style={{ marginTop: theme.spacing(2) }}>
                            {buyFlow.form.canChooseRecipes
                                ? "Podrás elegir las recetas en el último paso. Cada semana cambiamos las recetas."
                                : "Te enviaremos las recetas más elegidas de la semana. Cada semana cambiamos las recetas"}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>

            {/* RECIPES SECTION */}
            {!!recipesOfWeek.length && (
                <div className={classes.recipeSection}>
                    <WeekPlanRecipesSection
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
                        <SectionTitleBuyFlow
                            title="Preguntas frecuentes"
                            subtitle="¿Necesitas ayuda? Revisa nuestras preguntas frecuentes o consulta en nuestro chat"
                        />
                        <Grid item xs={12} sm={8} style={{ margin: `0px auto 0px auto` }}>
                            <Grid container spacing={2}>
                                {lang.faqs.map((faq, index) => (
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
                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px' }}>
                        Let's Cook 2021 © - Todos los derechos reservados
                    </Typography>
                </Grid>
                <Grid item className={classes.footerItem}>
                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px', cursor: 'pointer' }} onClick={handleOpenTycModal}>
                        Términos y condiciones
                    </Typography>
                </Grid>
                <Grid item className={classes.footerItem}>
                    <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px', cursor: 'pointer' }} onClick={handleOpenPrivacyPolicyModal}>
                        Política de privacidad
                    </Typography>
                </Grid>
            </Grid>
            <TermsAndConditionsModal
                open={openTycModal}
                handleClose={handleCloseTycModal}
            />
            <PrivacyPolicyModal
                open={openPrivacyPolicyModal}
                handleClose={handleClosePrivacyPolicyModal}
            />
        </>
    );
});

export default SelectPlanStep;
