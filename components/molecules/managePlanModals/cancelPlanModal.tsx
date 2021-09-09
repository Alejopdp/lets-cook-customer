// Utils & Config
import React, { useState, useEffect } from "react";
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
import { updateRestriction } from "helpers/serverRequests/subscription";

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const CancelPlanModal = (props: CancelPlanModalProps) => {
    // Data for PriceTooHigh
    const lang = props.lang;

    const plan = {
        planId: "1",
        name: "Plan Ahorro",
        icon: "/assets/plan-test-color.svg",
        variantInfo: "4 recetas para 3 personas por semana",
        variantExtraInfo: "12 raciones a 3 € por ración",
        planVariantId: "1",
        priceText: "36 €/semana",
    };

    const variants = [
        { planId: "1", planVariantId: "6", variantDescription: "4 recetas para 3 personas - 36 €/semana", active: true },
        { planId: "1", planVariantId: "7", variantDescription: "3 recetas para 3 personas - 30 €/semana", active: false },
        { planId: "1", planVariantId: "8", variantDescription: "2 recetas para 3 personas - 24 €/semana", active: false },
    ];

    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [reasonSelected, setReason] = useState();
    const [cancellationComments, setCancellationComments] = useState("");
    const [weeksToSkip, setWeeksToSkip] = useState([]);
    const [specialDiet, setSpecialDiet] = useState({ id: "", value: "", comments: "" });
    // PriceTooHigh States
    const [planVariantIdSelected, setPlanVariantIdSelected] = useState(plan.planVariantId);

    const handleChangeReason = (event) => {
        let newReason = props.data.reasons.filter((reason) => reason.value === event.target.value)[0];
        setCancellationComments("");
        setWeeksToSkip([]);
        setSpecialDiet({ value: "", comments: "", id: "" });
        setPlanVariantIdSelected(plan.planVariantId);
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

    const handleClickRecoverPriceTooHigh = () => {
        alert(`PlanVariantId: ${JSON.stringify(planVariantIdSelected)}`);
        props.handleClose();
    };

    let cancellationReasonComponent;
    let secondaryBtnColor;
    let secondaryBtnText;
    let handleSecondaryBtnClick;
    let primaryBtnColor;
    let primaryBtnText;
    let handlePrimaryBtnClick;

    if (reasonSelected) {
        switch (reasonSelected.value) {
            case "created_by_error":
                cancellationReasonComponent = (
                    <CreatedByError handleChange={handleChangeCancellationComments} value={cancellationComments} lang={lang.createdByError} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.createdByError.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.createdByError.primaryButtonText;
                break;
            case "cant_get_kits_next_week":
                cancellationReasonComponent = (
                    <CantGetKitsNextWeek handleChange={handleChangeSkipWeeks} weeks={props.orders} value={weeksToSkip} lang={lang.cantGetKitsNextWeek} />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = lang.cantGetKitsNextWeek.secondaryButtonText;
                handlePrimaryBtnClick = handleClickRecoverSkipWeeks;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = lang.cantGetKitsNextWeek.primaryButtonText;
                break;
            case "special_diet":
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
            case "move_abroad":
                cancellationReasonComponent = <MoveAbroad lang={lang.moveAbroad} />;
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.moveAbroad.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.moveAbroad.primaryButtonText;
                break;
            case "dont_like_meal_kits":
                cancellationReasonComponent = (
                    <DontLikeMealKits handleChange={handleChangeCancellationComments} value={cancellationComments} lang={lang.dontLikeMealKits} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.dontLikeMealKits.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.dontLikeMealKits.primaryButtonText;
                break;
            case "had_problems_with_letscook":
                cancellationReasonComponent = (
                    <HadProblemsWithLetsCook handleChange={handleChangeCancellationComments} value={cancellationComments} lang={lang.hadProblemsWithLetsCook} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.hadProblemsWithLetsCook.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.hadProblemsWithLetsCook.primaryButtonText;
                break;
            case "price_too_high":
                cancellationReasonComponent = (
                    <PriceTooHigh
                        plan={plan}
                        variants={variants}
                        planVariantIdSelected={planVariantIdSelected}
                        setPlanVariantIdSelected={setPlanVariantIdSelected}
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
            case "other_reason":
                cancellationReasonComponent = <OtherReason handleChange={handleChangeCancellationComments} value={cancellationComments} lang={lang.otherReason} />;
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = lang.otherReason.secondaryButtonText;
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = lang.otherReason.primaryButtonText;
                break;
            default:
                cancellationReasonComponent = <OtherReason handleChange={handleChangeCancellationComments} value={cancellationComments} lang={lang.otherReason} />;
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
