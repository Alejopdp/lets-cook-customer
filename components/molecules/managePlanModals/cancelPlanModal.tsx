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
import { localeRoutes, Routes } from "lang/routes/routes";

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
    const lang = props.lang;

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
                router.push(localeRoutes[router.locale][Routes.perfil]);
                break;
            case RecoverPriceTooHighActions.SWAP_WITH_PLAN_AHORRO:
                handleSwapPlanAhorro();
                router.replace(localeRoutes[router.locale][Routes.perfil]);
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
                    <CreatedByError
                        handleChange={handleChangeCancellationComments}
                        value={cancellationComments}
                        lang={lang.createdByError}
                    />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.createdByError.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.createdByError.primaryButtonText;
                break;
            case CancellationReason.CANT_GET_KITS_NEXT_WEEK:
                cancellationReasonComponent = (
                    <CantGetKitsNextWeek
                        handleChange={handleChangeSkipWeeks}
                        weeks={props.orders}
                        value={weeksToSkip}
                        lang={lang.cantGetKitsNextWeek}
                    />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = lang.cantGetKitsNextWeek.secondaryButtonText;
                handlePrimaryBtnClick = handleClickRecoverSkipWeeks;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = lang.cantGetKitsNextWeek.primaryButtonText;
                break;
            case CancellationReason.SPECIAL_DIET:
                cancellationReasonComponent = (
                    <SpecialDiet
                        handleChangeSelect={handleChangeSelectSpecialDiet}
                        valueSelect={specialDiet.value}
                        handleChangeComments={handleChangeCommentsSpecialDiet}
                        valueComments={specialDiet.comments}
                        restrictions={props.restrictions}
                        lang={lang.specialDiet}
                    />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = lang.specialDiet.secondaryButtonText;
                handlePrimaryBtnClick = handleClickRecoverSpecialDiet;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = lang.specialDiet.primaryButtonText;
                break;
            case CancellationReason.MOVE_ABROAD:
                cancellationReasonComponent = <MoveAbroad lang={lang.moveAbroad} />;
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.moveAbroad.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.moveAbroad.primaryButtonText;
                break;
            case CancellationReason.DONT_LIKE_MEAL_KITS:
                cancellationReasonComponent = (
                    <DontLikeMealKits
                        handleChange={handleChangeCancellationComments}
                        value={cancellationComments}
                        lang={lang.dontLikeMealKits}
                    />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.dontLikeMealKits.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.dontLikeMealKits.primaryButtonText;
                break;
            case CancellationReason.HAD_PROBLEMS_WITH_LETSCOOK:
                cancellationReasonComponent = (
                    <HadProblemsWithLetsCook
                        handleChange={handleChangeCancellationComments}
                        value={cancellationComments}
                        lang={lang.hadProblemsWithLetsCook}
                    />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.hadProblemsWithLetsCook.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.hadProblemsWithLetsCook.primaryButtonText;
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
                        lang={lang.priceTooHigh}
                    />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = lang.priceTooHigh.secondaryButtonText;
                handlePrimaryBtnClick = handleClickRecoverPriceTooHigh;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = lang.priceTooHigh.primaryButtonText;
                break;
            case CancellationReason.OTHER_REASONS:
                cancellationReasonComponent = (
                    <OtherReason handleChange={handleChangeCancellationComments} value={cancellationComments} lang={lang.otherReason} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.otherReason.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.otherReason.primaryButtonText;
                break;
            default:
                cancellationReasonComponent = (
                    <OtherReason handleChange={handleChangeCancellationComments} value={cancellationComments} lang={lang.otherReason} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.otherReason.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.otherReason.primaryButtonText;
                break;
        }
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title={lang.title}
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
                {lang.subtitle}
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">{lang.cancellationText}</InputLabel>
                <Select
                    native
                    value={reasonSelected && reasonSelected.value}
                    onChange={handleChangeReason}
                    label={lang.cancellationInputLabel}
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
