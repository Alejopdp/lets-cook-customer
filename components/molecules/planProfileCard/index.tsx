// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
// const langs = require("../../lang").comoFunciona;
import { translateFrequency } from "helpers/utils/i18n";
import RotateRight from "@material-ui/icons/RotateRight";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components

import BoxWithTextButton from "../specificBox/boxWithTextButton";
import PlanInfoWithStatus from "../planInfo/planInfoWithStatus";
import Options from "../../atoms/options/Options";

const PlanProfileCard = ({
    plan,
    handleClickRedirectToPlanDetail,
    handleClickOpenPlanRecoverModal,
    lang,
    handleSetSubscriptionId,
    handleClickOpenSkipPlanModal,
    handleClickOpenChangePlanModal,
}) => {
    const theme = useTheme();
    const router = useRouter();

    return (
        <BoxWithTextButton
            status={plan.stateTitle}
            btnText={plan.stateTitle === "SUBSCRIPTION_ACTIVE" ? lang.seeDetailsBtnText : lang.repeatPurchaseBtnText}
            handleClick={
                plan.stateTitle === "SUBSCRIPTION_ACTIVE" ? () => handleClickRedirectToPlanDetail(plan.id) : handleClickOpenPlanRecoverModal
            }
        >
            <div style={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <PlanInfoWithStatus
                    style={{ marginBottom: theme.spacing(1) }}
                    planName={plan.planName}
                    planIcon={plan.iconUrl}
                    status={{ value: plan.stateTitle, text: plan.stateHumanTitle }}
                />
                {plan.stateTitle !== "SUBSCRIPTION_CANCELLED" && (
                    <Options
                        handleSetSubscriptionId={handleSetSubscriptionId}
                        subscriptionId={plan.id}
                        handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                        handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                    />
                )}
            </div>
            <div style={{ marginBottom: theme.spacing(3), marginTop: theme.spacing(2) }}>
                <Typography variant="body2" style={{ fontSize: "16px" }}>
                    {plan.planVariantLabel}
                </Typography>
            </div>
            {plan.stateTitle === "SUBSCRIPTION_ACTIVE" && (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: theme.spacing(2) }}>
                    <img width={24} height={24} src="/icons/checkout/informacion-de-envio.svg" />
                    <Typography variant="body2" style={{ fontSize: "14px", marginLeft: "8px" }}>
                        {lang.nextShippingDateText}: {plan.nextShippment}
                    </Typography>
                </div>
            )}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <RotateRight style={{ fontSize: "24px" }} />
                <Typography variant="body2" style={{ fontSize: "14px", marginLeft: "8px" }}>
                    {lang.frequencyText} {translateFrequency(plan.frequency, router.locale).toLocaleLowerCase()}
                </Typography>
            </div>
        </BoxWithTextButton>
    );
};

export default PlanProfileCard;
