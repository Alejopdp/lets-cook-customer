// Utils & Config
import React, { useState, useEffect, useMemo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../atoms/modal/modal";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Typography from "@material-ui/core/Typography";

// Internal Components
import CantGetKitsNextWeek from "../cancellationReasonComponents/cantGetKitsNextWeek";
import CreatedByError from "../cancellationReasonComponents/createdByError";
import DontLikeMealKits from "../cancellationReasonComponents/dontLikeMealKits";
import HadProblemsWithLetsCook from "../cancellationReasonComponents/hadProblemsWithLetscook";
import MoveAbroad from "../cancellationReasonComponents/moveAbroad";
import OtherReason from "../cancellationReasonComponents/otherReason";
import PriceTooHigh from "../cancellationReasonComponents/priceTooHigh";
import SpecialDiet from "../cancellationReasonComponents/specialDiet";
import { skippOrdersFromCancellationModal } from "helpers/serverRequests/order";
import { useSnackbar } from "notistack";
import { CancelPlanModalProps } from "./interface";
import { useRouter } from "next/router";
import { swapPlan, updateRestriction } from "helpers/serverRequests/subscription";
import { CancellationReason } from "types/cancellation";
import { getPlanAhorro } from "@helpers";
import { PlanVariant } from "types/planVariant";

export enum RecoverPriceTooHighActions {
    SWAP_WITH_PLAN_AHORRO = "SWAP_WITH_PLAN_AHORRO",
    CHANGE_ACTUAL_PlAN_VARiANT = "CHANGE_ACTUAL_PlAN_VARiANT",
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const CancelPlanModal = (props: CancelPlanModalProps) => {
    // Data for PriceTooHigh

    // const plan = {
    //     planId: "1",
    //     name: "Plan Ahorro",
    //     icon: "/assets/plan-test-color.svg",
    //     variantInfo: "4 recetas para 3 personas por semana",
    //     variantExtraInfo: "12 raciones a 3 € por ración",
    //     planVariantId: "1",
    //     priceText: "36 €/semana",
    // };

    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [reasonSelected, setReason] = useState();
    const [cancellationComments, setCancellationComments] = useState("");
    const [weeksToSkip, setWeeksToSkip] = useState([]);
    const [specialDiet, setSpecialDiet] = useState({ id: "", value: "", comments: "" });
    // PriceTooHigh States
    const [planAhorro, setplanAhorro] = useState({ variants: [] });
    const [planVariantIdSelected, setPlanVariantIdSelected] = useState("");
    const [priceTooHighModalView, setpriceTooHighModalView] = useState<RecoverPriceTooHighActions>(
        RecoverPriceTooHighActions.SWAP_WITH_PLAN_AHORRO
    );

    useEffect(() => {
        const getPlanAhorroForCancellation = async () => {
            const res = await getPlanAhorro();

            if (res && res.status === 200) {
                setplanAhorro(res.data);
                setPlanVariantIdSelected(
                    res.data.variants.reduce((acc, variant) => (variant.price < acc.price ? variant : acc), { price: 9999 }).id
                );
            }
        };

        getPlanAhorroForCancellation();
    }, []);

    const handleChangeReason = (event) => {
        let newReason = props.data.reasons.filter((reason) => reason.value === event.target.value)[0];
        setCancellationComments("");
        setWeeksToSkip([]);
        setSpecialDiet({ value: "", comments: "", id: "" });
        setPlanVariantIdSelected(
            planAhorro.variants.reduce((acc, variant) => (variant.price < acc.price ? variant : acc), { price: 9999 }).id
        );
        setReason(newReason);
    };

    // Cancel Plan Functions

    const handleChangeCancellationComments = (event) => {
        setCancellationComments(event.target.value);
    };

    const handleClickCancel = () => {
        props.handlePrimaryButtonClick(reasonSelected, cancellationComments);
        props.handleClose();
    };

    // Skip Weeks Functions
    // Tengo un bug dentro de CantGetKitsNextWeeks, no me marca el checked de la semana elegida.
    const handleClickRecoverSkipWeeks = async () => {
        const res = await skippOrdersFromCancellationModal(weeksToSkip);

        if (res.status === 200) {
            enqueueSnackbar("Semanas salteadas correctamente", { variant: "success" });
            router.reload();
        } else {
            enqueueSnackbar("Error al saltear las semanas", { variant: "error" });
        }
        props.handleClose();
    };

    const handleChangeSkipWeeks = (event, newValue) => {
        setWeeksToSkip(newValue);
    };

    // Special Diet Functions

    const handleClickRecoverSpecialDiet = async () => {
        const res = await updateRestriction(props.subscriptionId, specialDiet.value);

        if (res.status === 200) {
            enqueueSnackbar("Dieta actualizada correctamente", { variant: "success" });
            props.handleClose();
        } else {
            enqueueSnackbar(res.data.message, { variant: "success" });
        }
    };

    const handleChangeSelectSpecialDiet = (event) => {
        setSpecialDiet({
            ...specialDiet,
            value: event.target.value,
        });
    };

    const handleChangeCommentsSpecialDiet = (event) => {
        setSpecialDiet({
            ...specialDiet,
            comments: event.target.value,
        });
    };

    // Price Too High Functions

    const getActualPlanAhorroVariant = (): PlanVariant =>
        planAhorro.variants.find(
            (variant) =>
                variant.numberOfPersons === props.actualPlanVariant.numberOfPersons &&
                variant.numberOfRecipes === props.actualPlanVariant.numberOfRecipes
        ) || planAhorro.variants.find((variant) => variant.isDefault);

    const defaultPlanAhorroVariant = useMemo(() => {
        return getActualPlanAhorroVariant();
    }, [planAhorro]);

    const handleClickRecoverPriceTooHigh = () => {
        switch (priceTooHighModalView) {
            case RecoverPriceTooHighActions.CHANGE_ACTUAL_PlAN_VARiANT:
                handleChangePlanVariant();
                router.push("/perfil");
                break;
            case RecoverPriceTooHighActions.SWAP_WITH_PLAN_AHORRO:
                handleSwapPlanAhorro();
                router.push("/perfil");
                break;
            default:
                () => "";
                break;
        }
    };

    const handleChangePlanVariant = async () => {
        const res = await swapPlan(props.subscriptionId, props.actualPlan.id, planVariantIdSelected);

        if (res && res.status === 200) {
            enqueueSnackbar("Plan cambiado correctamente", { variant: "success" });
            props.handleClose();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const handleSwapPlanAhorro = async () => {
        const res = await swapPlan(props.subscriptionId, planAhorro.id, defaultPlanAhorroVariant.id);

        if (res && res.status === 200) {
            enqueueSnackbar("Plan cambiado correctamente", { variant: "success" });
            props.handleClose();
        } else {
            enqueueSnackbar(res.data.message, { variant: "error" });
        }
    };

    const isSkipWeekButtonDisabled = () => {
        return reasonSelected?.value === CancellationReason.CANT_GET_KITS_NEXT_WEEK && weeksToSkip.length === 0;
    };

    const isModalPrimaryButtonDisabled = () => {
        return isSkipWeekButtonDisabled();
    };

    let cancellationReasonComponent;
    let secondaryBtnColor;
    let secondaryBtnText;
    let handleSecondaryBtnClick;
    let primaryBtnColor;
    let primaryBtnText;
    let handlePrimaryBtnClick;

    if (reasonSelected) {
        switch (reasonSelected?.value) {
            case CancellationReason.CREATED_BY_ERROR:
                cancellationReasonComponent = (
                    <CreatedByError handleChange={handleChangeCancellationComments} value={cancellationComments} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
            case CancellationReason.CANT_GET_KITS_NEXT_WEEK:
                cancellationReasonComponent = (
                    <CantGetKitsNextWeek handleChange={handleChangeSkipWeeks} weeks={props.orders} value={weeksToSkip} />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = "no gracias, deseo cancelar";
                handlePrimaryBtnClick = handleClickRecoverSkipWeeks;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = "saltar semana";
                break;
            case CancellationReason.SPECIAL_DIET:
                cancellationReasonComponent = (
                    <SpecialDiet
                        handleChangeSelect={handleChangeSelectSpecialDiet}
                        valueSelect={specialDiet.value}
                        handleChangeComments={handleChangeCommentsSpecialDiet}
                        valueComments={specialDiet.comments}
                        restrictions={props.restrictions}
                    />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = "no gracias, deseo cancelar";
                handlePrimaryBtnClick = handleClickRecoverSpecialDiet;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = "ajustar dieta";
                break;
            case CancellationReason.MOVE_ABROAD:
                cancellationReasonComponent = <MoveAbroad />;
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
            case CancellationReason.DONT_LIKE_MEAL_KITS:
                cancellationReasonComponent = (
                    <DontLikeMealKits handleChange={handleChangeCancellationComments} value={cancellationComments} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
            case CancellationReason.HAD_PROBLEMS_WITH_LETSCOOK:
                cancellationReasonComponent = (
                    <HadProblemsWithLetsCook handleChange={handleChangeCancellationComments} value={cancellationComments} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
            case CancellationReason.PRICE_TOO_HIGH:
                cancellationReasonComponent = (
                    <PriceTooHigh
                        plan={planAhorro}
                        variants={planAhorro.variants}
                        actualPlan={props.actualPlan}
                        actualPlanVariant={props.actualPlanVariant}
                        planVariantIdSelected={planVariantIdSelected}
                        setPlanVariantIdSelected={setPlanVariantIdSelected}
                        priceTooHighModalView={priceTooHighModalView}
                        setpriceTooHighModalView={setpriceTooHighModalView}
                        defaultPlanAhorroVariant={defaultPlanAhorroVariant}
                    />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = "no gracias, deseo cancelar";
                handlePrimaryBtnClick = handleClickRecoverPriceTooHigh;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = "cambiar plan";
                break;
            case CancellationReason.OTHER_REASONS:
                cancellationReasonComponent = <OtherReason handleChange={handleChangeCancellationComments} value={cancellationComments} />;
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
            default:
                cancellationReasonComponent = <OtherReason handleChange={handleChangeCancellationComments} value={cancellationComments} />;
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
        }
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title="Cancelar plan"
            handlePrimaryButtonClick={handlePrimaryBtnClick}
            primaryButtonColor={primaryBtnColor}
            primaryButtonText={primaryBtnText}
            handleSecondaryButtonClick={handleSecondaryBtnClick}
            secondaryButtonColor={secondaryBtnColor}
            secondaryButtonText={secondaryBtnText}
            fullScreen={true}
            disabled={isModalPrimaryButtonDisabled()}
        >
            <Typography variant="subtitle2" color="textSecondary" style={{ fontSize: "16px", marginBottom: theme.spacing(2) }}>
                ¿Por qué quieres cancelar el plan?
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Razones de cancelación</InputLabel>
                <Select
                    native
                    value={reasonSelected && reasonSelected.value}
                    onChange={handleChangeReason}
                    label="Razones de cancelación"
                    inputProps={{ name: "reason", id: "outlined-age-native-simple" }}
                >
                    <option key="0" value=""></option>
                    {props.data.reasons.map((reason) => (
                        <option key={reason.id} value={reason.value}>
                            {reason.text}
                        </option>
                    ))}
                </Select>
            </FormControl>
            {cancellationReasonComponent}
        </Modal>
    );
};

export default CancelPlanModal;
