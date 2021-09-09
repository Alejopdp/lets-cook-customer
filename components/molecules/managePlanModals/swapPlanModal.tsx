// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../atoms/modal/modal";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const SwapPlanModal = (props) => {
    const lang = props.lang
    const classes = useStyles();
    const theme = useTheme();

    const [planSelected, setPlanSelected] = useState({
        planId: "",
        planVariantId: "",
    });

    useEffect(() => {
        const activePlan = props.data?.plans?.filter((plan) => plan.active === true)[0];
        let activePlanId = activePlan ? activePlan.planId : props.data?.plans?.length === 1 ? props.data.plans[0].planId : "";
        let activePlanVariantId = props.data?.variants?.filter((variant) => variant.active === true)[0]?.planVariantId;

        setPlanSelected({
            planId: activePlanId,
            planVariantId: activePlanVariantId,
        });
    }, [props.open]);

    useEffect(() => {
        let newPlanVariantId;
        if (planSelected.planId == "") {
            newPlanVariantId = "";
        } else {
            newPlanVariantId = props.data.variants.filter((variant) => variant.planId === planSelected.planId)[0]?.planVariantId;
        }
        setPlanSelected({
            ...planSelected,
            planVariantId: newPlanVariantId,
        });
    }, [planSelected.planId]);

    const handleDisableButton = () => {
        let currentPlanVariantId = props.data?.variants?.find((variant) => variant.active === true)?.planVariantId || "";
        if (planSelected.planVariantId === currentPlanVariantId) {
            return true;
        } else {
            return false;
        }
    };

    const handleChangePlan = (event) => {
        setPlanSelected({
            ...planSelected,
            planId: event.target.value,
        });
    };

    const handleChangeVariant = (event) => {
        setPlanSelected({
            ...planSelected,
            planVariantId: event.target.value,
        });
    };

    const submitNewPlan = () => {
        props.handlePrimaryButtonClick(planSelected);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={submitNewPlan}
            title={lang.title}
            primaryButtonText={lang.primaryButtonText}
            secondaryButtonText={lang.secondaryButtonText}
            disabled={handleDisableButton()}
        >
            <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(2) }}>
                {lang.choosePlanSubtitle}
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">{lang.choosePlanInputLabel}</InputLabel>
                <Select
                    native
                    value={planSelected.planId}
                    onChange={handleChangePlan}
                    label={lang.choosePlanInputLabel}
                    inputProps={{ name: "planId", id: "planDropdown" }}
                >
                    {props.data?.plans?.map((plan) => (
                        <option key={plan.planId} value={plan.planId}>
                            {plan.name}
                        </option>
                    ))}
                </Select>
            </FormControl>
            <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(2) }}>
                {lang.sizePlanSubtitle}
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Variante</InputLabel>
                <Select
                    native
                    value={planSelected.planVariantId}
                    onChange={handleChangeVariant}
                    label={lang.sizePlanSubtitle}
                    inputProps={{ name: "planVariantId", id: "variantDropdown" }}
                >
                    {props.data?.variants ? (
                        props.data.variants
                            .filter((variant) => variant.planId === planSelected.planId)
                            .map((variant) => (
                                <option key={variant.planVariantId} value={variant.planVariantId}>
                                    {variant.variantDescription}
                                </option>
                            ))
                    ) : (
                        <></>
                    )}
                </Select>
            </FormControl>
        </Modal>
    );
};

export default SwapPlanModal;
