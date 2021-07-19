// Utils & config
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useStyles } from "./styles";

// External components
import { Typography } from "@material-ui/core";

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
    const classes = useStyles();
    const [cardView, setcardView] = useState(CardView.FIRST_CONTENT);
    const [selectedVariant, setselectedVariant] = useState<PlanVariant>({
        attributes: [],
        id: "",
        name: "",
        price: 0,
        priceWithOffer: 0,
        sku: "",
    });
    const [selectedFrequency, setselectedFrequency] = useState("");
    const { selectedPlans, setselectedPlans } = useCrossSellingStore(({ selectedPlans, setselectedPlans }) => ({
        selectedPlans,
        setselectedPlans,
    }));

    const { actualView, actualButton } = useMemo(() => {
        switch (cardView) {
            case CardView.FIRST_CONTENT:
                return {
                    actualView: (
                        <FirstContent
                            name={props.additionalPlan.name}
                            description={props.additionalPlan.description}
                            minPrice={props.additionalPlan.description}
                        />
                    ),
                    actualButton: (
                        <RoundedButton
                            label="VER OPCIONES"
                            style={{ width: "100%" }}
                            onClick={() => setcardView(CardView.SELECT_ATTRIBUTE)}
                        />
                    ),
                };
            case CardView.SELECT_ATTRIBUTE:
                return {
                    actualView: (
                        <SelectVariantContent
                            variants={props.additionalPlan.variants}
                            selectedVariant={selectedVariant}
                            setselectedVariant={setselectedVariant}
                            frequencies={props.additionalPlan.availableFrequencies!}
                            selectedFrequency={selectedFrequency}
                            setselectedFrequency={setselectedFrequency}
                        />
                    ),
                    actualButton: (
                        <RoundedButton
                            label="SELECCIONAR"
                            disabled={!!!selectedFrequency || !!!selectedVariant.id}
                            style={{ width: "100%" }}
                            onClick={() => {
                                addPlanToCart();
                                setcardView(CardView.ATTRIBUTE_SELECTED);
                            }}
                        />
                    ),
                };
            case CardView.ATTRIBUTE_SELECTED:
                return {
                    actualView: <VariantSelectedContent selectedFrequency={selectedFrequency} variant={selectedVariant} />,
                    actualButton: (
                        <RoundedButton label="REMOVER" style={{ width: "100%" }} onClick={() => setcardView(CardView.FIRST_CONTENT)} />
                    ),
                };
            default:
                return {
                    actualView: (
                        <FirstContent
                            name={props.additionalPlan.name}
                            description={props.additionalPlan.description}
                            minPrice={props.additionalPlan.description}
                        />
                    ),
                    actualButton: (
                        <RoundedButton
                            label="VER OPCIONES"
                            style={{ width: "100%" }}
                            onClick={() => setcardView(CardView.SELECT_ATTRIBUTE)}
                        />
                    ),
                };
        }
    }, [cardView, selectedVariant, selectedFrequency]);

    const addPlanToCart = () => {
        setselectedPlans({
            [props.additionalPlan.id]: {
                variant: selectedVariant,
                frequency: selectedFrequency,
            },
        });
    };

    return (
        <div className={classes.card} style={{ backgroundImage: `url(${classes.img})` }}>
            <div className={classes.overlay}>
                <Typography className={classes.paddingCardTitle} variant="subtitle1" color="initial" style={{ marginBottom: 24 }}>
                    {props.additionalPlan.name}
                </Typography>
                {actualView}
                <div className={classes.cardAction}>{actualButton}</div>
            </div>
        </div>
    );
};

AdditionalPlanCard.propTypes = {};

export default AdditionalPlanCard;
