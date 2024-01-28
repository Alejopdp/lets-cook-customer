// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithTextButton from "../../../molecules/specificBox/boxWithTextButton";
import PlanInfoWithStatus from "../../../molecules/planInfo/planInfoWithStatus";
import { useRouter } from "next/router";

const texts = {
    es: {
        portions: "raciones a",
        perPortion: "por ración",
        swapPlanButtonText: "Cambiar plan",
    },
    en: {
        portions: "portions for",
        perPortion: "per portion",
        swapPlanButtonText: "Swap plan",
    },
    ca: {
        portions: "raciones a",
        perPortion: "por porción",
        swapPlanButtonText: "Canviar pla",
    },
};

const PlanCard = (props) => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <BoxWithTextButton
            btnText={texts[router.locale].swapPlanButtonText}
            handleClick={props.handleClick}
            hideButton={props.isOneTime || props.plan.state.stateTitle !== "SUBSCRIPTION_ACTIVE"}
        >
            <PlanInfoWithStatus
                style={{ marginBottom: theme.spacing(2) }}
                planName={props.plan.planName}
                planIcon={props.plan.icon}
                status={{ value: props.plan.state.stateTitle, text: props.plan.state.state }}
            />
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                {props.plan.planVariantDescription}
            </Typography>
            {props.plan.servingsLabel !== "" && (
                <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                    {`${props.portionsQuantity} ${texts[router.locale].portions} ${props.portionPrice} € ${
                        texts[router.locale].perPortion
                    }`}
                </Typography>
            )}
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", fontWeight: 600 }}>
                {props.plan.priceLabel}
            </Typography>
        </BoxWithTextButton>
    );
};

export default PlanCard;
