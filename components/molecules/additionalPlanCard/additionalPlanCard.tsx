// Utils & config
import React, { useState } from "react";
import { useStyles } from "./styles";
import { useLang } from "@hooks";

// External components
import { Box, useTheme } from "@material-ui/core";

// Internal components
import { RoundedButton } from "@atoms";
import { AdditionalPlanCardProps } from "./interface";
import FirstContent from "./firstContent";
import SelectVariantContent from "./selectVariantContent";
import VariantSelectedContent from "./variantSelectedContent";
import { PlanVariant } from "types/planVariant";
import { useCrossSellingStore } from "@stores";

enum CardView {
    FIRST_CONTENT = "FIRST_CONTENT",
    SELECT_ATTRIBUTE = "SELECT_ATTRIBUTE",
    ATTRIBUTE_SELECTED = "ATTRIBUTE_SELECTED",
}

const AdditionalPlanCard = (props: AdditionalPlanCardProps) => {
    const [lang] = useLang("additionalPlanCard");
    const classes = useStyles();
    const theme = useTheme();
    const [cardView, setcardView] = useState(CardView.FIRST_CONTENT);
    const [selectedVariant, setselectedVariant] = useState<PlanVariant>({
        attributes: [],
        id: "",
        name: "",
        price: 0,
        priceWithOffer: 0,
        sku: "",
        isDefault: false,
        isDeleted: false,
    });
    const [selectedFrequency, setselectedFrequency] = useState("");
    const { selectedPlans, setselectedPlans } = useCrossSellingStore(({ selectedPlans, setselectedPlans }) => ({
        selectedPlans,
        setselectedPlans,
    }));

    const handleRemoveVariant = (additionalPlanId: string) => {
        const newVariants = props.selectedVariants.filter((variant) => variant.planId !== additionalPlanId);
        props.setselectedVariants(newVariants);
        props.setvariantsToPay(props.variantsToPay.filter((variant) => variant.planId !== additionalPlanId));
        setcardView(CardView.FIRST_CONTENT);
    };

    const handleClickBackToFirstContent = () => {
        setcardView(CardView.FIRST_CONTENT);
    };
    const getRenders = () => {
        switch (cardView) {
            case CardView.FIRST_CONTENT:
                return {
                    actualView: (
                        <FirstContent
                            name={props.additionalPlan.name}
                            description={props.additionalPlan.description}
                            minPrice={props.additionalPlan.minimumVariantPrice}
                            additionalPlanName={props.additionalPlan.name}
                            lang={lang.cardView.firstContent.content}
                        />
                    ),
                    actualButton: (
                        <RoundedButton
                            label={lang.cardView.firstContent.btnText}
                            style={{ width: "100%", backgroundColor: "white", padding: theme.spacing(1) }}
                            textStyle={{ color: theme.palette.primary.main }}
                            onClick={() => setcardView(CardView.SELECT_ATTRIBUTE)}
                        />
                    ),
                    hasBgImg: true,
                };
            case CardView.SELECT_ATTRIBUTE:
                return {
                    actualView: (
                        <SelectVariantContent
                            attributesKeysAndValues={props.additionalPlan.attributes}
                            variants={props.additionalPlan.variants}
                            selectedVariants={props.selectedVariants}
                            setselectedVariants={props.setselectedVariants}
                            frequencies={props.additionalPlan.availableFrequencies!}
                            selectedFrequency={selectedFrequency}
                            setselectedFrequency={setselectedFrequency}
                            planId={props.additionalPlan.id}
                            additionalPlanName={props.additionalPlan.name}
                            handleClickBackToFirstContent={handleClickBackToFirstContent}
                            lang={lang.cardView.selectAttribute.content}
                        />
                    ),
                    actualButton: (
                        <RoundedButton
                            label={lang.cardView.selectAttribute.btnText}
                            disabled={
                                props.selectedVariants.length === 0 ||
                                props.selectedVariants.every((variant) =>
                                    variant.planId === props.additionalPlan.id ? !!!variant.frequency : true
                                )
                            }
                            style={{ width: "100%", padding: theme.spacing(1) }}
                            onClick={() => {
                                addPlanToCart();
                                setcardView(CardView.ATTRIBUTE_SELECTED);
                            }}
                        />
                    ),
                    hasBgImg: false,
                };
            case CardView.ATTRIBUTE_SELECTED:
                return {
                    actualView: (
                        <VariantSelectedContent
                            selectedFrequency={selectedFrequency}
                            variant={props.selectedVariants.find((variant) => variant.planId === props.additionalPlan.id)}
                            additionalPlanName={props.additionalPlan.name}
                            lang={lang.cardView.attributeSelected.content}
                        />
                    ),
                    actualButton: (
                        <RoundedButton
                            label={lang.cardView.attributeSelected.btnText}
                            style={{
                                width: "100%",
                                backgroundColor: "white",
                                border: `1px solid ${theme.palette.secondary.main}`,
                                padding: theme.spacing(1),
                            }}
                            textStyle={{ color: theme.palette.secondary.main }}
                            onClick={() => handleRemoveVariant(props.additionalPlan.id)}
                        />
                    ),
                    hasBgImg: false,
                };
            default:
                return {
                    actualView: (
                        <FirstContent
                            name={props.additionalPlan.name}
                            description={props.additionalPlan.description}
                            minPrice={props.additionalPlan.minimumVariantPrice}
                            lang={lang.cardView.firstContent.content}
                        />
                    ),
                    actualButton: (
                        <RoundedButton
                            label={lang.cardView.firstContent.btnText}
                            style={{ width: "100%", padding: theme.spacing(1) }}
                            onClick={() => setcardView(CardView.SELECT_ATTRIBUTE)}
                        />
                    ),
                    hasBgImg: true,
                };
        }
    };
    const { actualView, actualButton, hasBgImg } = getRenders();

    const addPlanToCart = () => {
        setselectedPlans({
            [props.additionalPlan.id]: {
                variant: selectedVariant,
                frequency: selectedFrequency,
            },
        });
        props.setvariantsToPay([
            ...props.variantsToPay,
            props.selectedVariants.find((variant) => variant.planId === props.additionalPlan.id),
        ]);
    };

    return (
        <Box style={{ ...props.style }}>
            <div className={classes.card} style={{ backgroundImage: `url(${props.additionalPlan.imageUrl})` }}>
                <div className={hasBgImg ? classes.overlay : classes.overlayWhite}>
                    {actualView}
                    <div className={classes.cardAction}>{actualButton}</div>
                </div>
            </div>
        </Box>
    );
};

AdditionalPlanCard.propTypes = {};

export default AdditionalPlanCard;
