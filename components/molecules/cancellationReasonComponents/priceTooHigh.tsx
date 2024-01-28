// Utils & Config
import React, { useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

// Internal Components
import PlanInfo from "../planInfo/planInfo";
import { RecoverPriceTooHighActions } from "../managePlanModals/cancelPlanModal";

const useStyles = makeStyles((theme) => ({
    planBox: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        border: "1px dashed rgba(0,0,0,0.1)",
        borderRadius: "8px",
        marginBottom: theme.spacing(3),
    },
    totalPrice: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: theme.spacing(2),
        borderTop: "1px dashed rgba(0,0,0,0.1)",
    },
    formControl: {
        width: "100%",
        marginBottom: theme.spacing(3),
    },
}));

const PriceTooHigh = ({
    setPlanVariantIdSelected,
    plan,
    actualPlan,
    variants,
    actualPlanVariant,
    planVariantIdSelected,
    priceTooHighModalView,
    setpriceTooHighModalView,
    defaultPlanAhorroVariant,
}) => {
    const classes = useStyles();
    const theme = useTheme();

    const hasVariantWithLowerPrice = useMemo(() => {
        return plan.variants.some((variant) => variant.price < actualPlanVariant.price);
    }, []);

    const changeOperationView = (newView: RecoverPriceTooHighActions) => {
        if (newView === RecoverPriceTooHighActions.SWAP_WITH_PLAN_AHORRO) {
            setPlanVariantIdSelected(plan.planVariantId);
        } else {
            setPlanVariantIdSelected(variants[0].planVariantId);
        }
        setpriceTooHighModalView(newView);
    };

    const handleChangeVariant = (event) => {
        setPlanVariantIdSelected(event.target.value);
    };

    const economyPlanComponent = (
        <>
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                El precio del plan ahorro es el más bajo que podemos ofrecer. Let’s Cook recibe descuentos por comprar en cantidad y lo
                traducimos directamente al precio en los planes ahorro.
            </Typography>
            <Box className={classes.planBox}>
                <PlanInfo style={{ marginBottom: theme.spacing(2) }} planName={plan.name} planIcon={plan.iconWithColor} />
                <Typography variant="body2" color="textPrimary" style={{ fontSize: "14px", marginBottom: theme.spacing(2) }}>
                    {defaultPlanAhorroVariant?.description} por semana
                </Typography>
                <Typography variant="body2" color="textPrimary" style={{ fontSize: "14px", marginBottom: theme.spacing(2) }}>
                    {defaultPlanAhorroVariant?.servingsLabel}
                </Typography>
                <Box className={classes.totalPrice}>
                    <Typography variant="body1" color="primary" style={{ fontSize: "16px", fontWeight: 600 }}>
                        Valor total:
                    </Typography>
                    <Typography variant="body1" color="primary" style={{ fontSize: "16px", fontWeight: 600 }}>
                        {defaultPlanAhorroVariant?.priceWithOffer || defaultPlanAhorroVariant?.price} €/semana
                    </Typography>
                </Box>
            </Box>
            {hasVariantWithLowerPrice ? (
                <>
                    <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(0.5) }}>
                        También podemos ofrecerte reducir raciones del plan actual.
                    </Typography>
                    <Link
                        onClick={() => changeOperationView(RecoverPriceTooHighActions.CHANGE_ACTUAL_PlAN_VARiANT)}
                        color="textPrimary"
                        style={{ cursor: "pointer", textDecoration: "none" }}
                    >
                        <Typography variant="subtitle1" color="textPrimary" style={{ fontSize: "14px" }}>
                            Ver opciones
                        </Typography>
                    </Link>
                </>
            ) : (
                <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(0.5) }}>
                    No tenemos una variante del mismo plan mas barata para ofrecerte
                </Typography>
            )}
        </>
    );
    const lowerVariantsComponent = (
        <>
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(3) }}>
                A continuación encontrarás una lista de opciones de tu plan actual
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Variante</InputLabel>
                <Select
                    native
                    value={planVariantIdSelected}
                    onChange={handleChangeVariant}
                    label="Variante"
                    inputProps={{ name: "planVariantId", id: "variantDropdown" }}
                >
                    {actualPlan.variants
                        .filter((variant) => variant.id !== actualPlanVariant.id && variant.price < actualPlanVariant.price)
                        .map((variant) => (
                            <option key={variant.id} value={variant.id}>
                                {variant.description}
                            </option>
                        ))}
                </Select>
            </FormControl>
            <Typography variant="body2" color="textPrimary" style={{ fontSize: "16px", marginBottom: theme.spacing(0.5) }}>
                También podemos ofrecerte cambiar a un plan más económico.
            </Typography>
            <Link
                onClick={() => changeOperationView(RecoverPriceTooHighActions.SWAP_WITH_PLAN_AHORRO)}
                color="textPrimary"
                style={{ cursor: "pointer", textDecoration: "none" }}
            >
                <Typography variant="subtitle1" color="textPrimary" style={{ fontSize: "14px" }}>
                    Ver opciones
                </Typography>
            </Link>
        </>
    );

    return (
        <>{priceTooHighModalView === RecoverPriceTooHighActions.SWAP_WITH_PLAN_AHORRO ? economyPlanComponent : lowerVariantsComponent}</>
    );
};

export default PriceTooHigh;
