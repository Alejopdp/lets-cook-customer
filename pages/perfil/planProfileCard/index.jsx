// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import Link from "next/link";
// const langs = require("../../lang").comoFunciona;

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components

import BoxWithTextButton from "../../../components/molecules/specificBox/boxWithTextButton";
import PlanInfoWithStatus from "../../../components/molecules/planInfo/planInfoWithStatus";
import Network from "../../../components/atoms/icons/Network";
import Options from "../../../components/atoms/options/Options";


const PlanProfileCard = ({ plan, handleClickRedirectToPlanDetail, handleClickOpenPlanRecoverModal }) => {

    const theme = useTheme();

    return (
        <BoxWithTextButton
            status={plan.stateTitle}
            btnText={plan.stateTitle === 'SUBSCRIPTION_ACTIVE' ? "Ver detalle" : "Volver a pedir"}
            handleClick={plan.stateTitle === 'SUBSCRIPTION_ACTIVE' ? () => handleClickRedirectToPlanDetail(plan.id) : handleClickOpenPlanRecoverModal}
        >
            <div style={{ display: "flex", flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }} >
                <PlanInfoWithStatus
                    style={{ marginBottom: theme.spacing(1) }}
                    planName={plan.planName}
                    planIcon={plan.iconUrl}
                    status={{ value: plan.stateTitle, text: plan.stateHumanTitle }}
                />
                <Options />
            </div>
            <div style={{ marginBottom: theme.spacing(3), marginTop: theme.spacing(2) }}>
                <Typography variant="body2" style={{ fontSize: "16px" }}>
                    {plan.planVariantLabel}
                </Typography>
            </div>
            {plan.stateTitle === 'SUBSCRIPTION_ACTIVE' && (
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: theme.spacing(2) }}>
                    <Network width={15} heigth={15} />
                    <Typography variant="body2" style={{ fontSize: "14px", marginLeft: "8px" }}>
                        Próxima entrega: {plan.nextShippment}
                    </Typography>
                </div>
            )}
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Network width={15} heigth={15} />
                <Typography variant="body2" style={{ fontSize: "14px", marginLeft: "8px" }}>
                    Frecuencia {plan.frequency}
                </Typography>
            </div>
        </BoxWithTextButton>
    );
};

export default PlanProfileCard;
