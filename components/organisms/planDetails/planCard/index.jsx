// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";

// Internal components
import BoxWithTextButton from "../../../molecules/specificBox/boxWithTextButton";
import PlanInfoWithStatus from "../../../molecules/planInfo/planInfoWithStatus";

const useStyles = makeStyles((theme) => ({

}));

const PlanCard = props => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <BoxWithTextButton btnText='cambiar plan' handleClick={props.handleClick}>
            <PlanInfoWithStatus style={{ marginBottom: theme.spacing(2) }} planName={props.plan.planName} planIcon={props.plan.icon} status={{ value: props.plan.state.stateTitle, text: props.plan.state.state }} />
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(1) }}>
                {props.plan.planVariantDescription}
            </Typography>
            {props.plan.servingsLabel !== '' && (
                <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(1) }}>
                    {props.plan.servingsLabel}
                </Typography>
            )}
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', fontWeight: 600 }}>
                {props.plan.priceLabel}
            </Typography>
        </BoxWithTextButton>

    );
};

export default PlanCard;
