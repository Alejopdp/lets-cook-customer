// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import { translateFrequency } from "helpers/utils/i18n";
import RotateRight from "@material-ui/icons/RotateRight";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import PlanInfoWithStatus from "../planInfo/planInfoWithStatus";
import Options from "../../atoms/options/Options";
import { Box } from "@material-ui/core";
import GeneralBox from "components/atoms/generalBox/generalBox";
import TextButton from "components/atoms/textButton/textButton";

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
        <GeneralBox variant="medium">
            <div style={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                <PlanInfoWithStatus
                    style={{ marginBottom: theme.spacing(1) }}
                    planName={plan.planName}
                    planIcon={plan.iconUrl}
                    status={{ value: plan.stateTitle, text: plan.stateHumanTitle }}
                />
                <Box visibility={plan.stateTitle !== "SUBSCRIPTION_CANCELLED" && !plan.isOneTime ? "visible" : "hidden"}>
                    <Options
                        isOneTime={plan.isOneTime}
                        handleSetSubscriptionId={handleSetSubscriptionId}
                        subscriptionId={plan.id}
                        handleClickOpenSkipPlanModal={handleClickOpenSkipPlanModal}
                        handleClickOpenChangePlanModal={handleClickOpenChangePlanModal}
                        />
                </Box>
            </div>
            <div style={{ marginBottom: theme.spacing(3), marginTop: theme.spacing(2) }}>
                <Typography variant="body2" style={{ fontSize: "16px" }}>
                    {plan.planVariantLabel}
                </Typography>
            </div>
            {!!plan.nextShippment && (
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
            <Box display={"flex"}>
                {plan.stateTitle !== "SUBSCRIPTION_ACTIVE" && <TextButton
                    btnText={lang.repeatPurchaseBtnText}
                    handleClick={handleClickOpenPlanRecoverModal}
                    style={{
                        marginTop: theme.spacing(3),
                        marginRight: theme.spacing(2),
                        color:theme.palette.primary.main
                    }}
                />}
                <TextButton
                    btnText={lang.seeDetailsBtnText}
                    handleClick={() => handleClickRedirectToPlanDetail(plan.id)}
                    style={{
                        marginTop: theme.spacing(3)
                    }}
                />
            </Box>
        </GeneralBox>
    );
};

export default PlanProfileCard;
