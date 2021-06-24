// Utils & Config
import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
// import { useRouter } from "next/router";
// const langs = require("../../lang").comoFunciona;

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
    // const router = useRouter();
    // const lang = langs[router.locale];

    return (
        <BoxWithTextButton btnText='cambiar plan'>
            <PlanInfoWithStatus style={{ marginBottom: theme.spacing(2) }} planName={props.plan.name} planIcon={props.plan.icon} status={{ value: props.plan.status.value, text: props.plan.status.text }} />
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(1) }}>
                {props.plan.variantInfo}
            </Typography>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(1) }}>
                {props.plan.variantExtraInfo}
            </Typography>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', fontWeight: 600 }}>
                {props.plan.priceText}
            </Typography>
        </BoxWithTextButton>

    );
};

export default PlanCard;
