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

const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "100%",
    },
}));

const CancelPlanModal = (props) => {
    // Data for CantGetKitsNextWeek
    const skipWeekData = {
        weeks: [
            { weekId: "1", text: "1 al 7 de marzo", skipped: true },
            { weekId: "2", text: "8 al 15 de marzo", skipped: true },
            { weekId: "3", text: "16 al 23 de marzo", skipped: false },
            { weekId: "4", text: "24 al 31 de marzo", skipped: false },
            { weekId: "5", text: "1 al 7 de abril", skipped: false },
            { weekId: "6", text: "8 al 15 de abril", skipped: false },
            { weekId: "7", text: "16 al 23 de abril", skipped: false },
            { weekId: "8", text: "24 al 1 de mayo", skipped: false },
            { weekId: "9", text: "2 al 8 de mayo", skipped: false },
            { weekId: "10", text: "9 al 16 de mayo", skipped: false },
            { weekId: "11", text: "17 al 24 de mayo", skipped: false },
            { weekId: "12", text: "25 al 2 de junio", skipped: false },
        ],
    };

    // Data for PriceTooHigh

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

    const [reasonSelected, setReason] = useState();
    const [cancellationComments, setCancellationComments] = useState("");
    const [weeksToSkip, setWeeksToSkip] = useState([]);
    const [specialDiet, setSpecialDiet] = useState({ value: "", comments: "" });
    // PriceTooHigh States
    const [planVariantIdSelected, setPlanVariantIdSelected] = useState(plan.planVariantId);

    // useEffect(() => {
    //     setReason("");
    // }, [props.open]);

    const handleChangeReason = (event) => {
        let newReason = props.data.reasons.filter((reason) => reason.value === event.target.value)[0];
        setCancellationComments("");
        setWeeksToSkip([]);
        setSpecialDiet({ value: "", comments: "" });
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

    const handleRecoverCustomerClick = () => {
        alert("cliente recuperado!!!");
    };

    // Skip Weeks Functions
    // Tengo un bug dentro de CantGetKitsNextWeeks, no me marca el checked de la semana elegida.
    const handleClickRecoverSkipWeeks = () => {
        alert(JSON.stringify(weeksToSkip));
        props.handleClose();
    };

    const handleChangeSkipWeeks = (event, newValue) => {
        setWeeksToSkip(newValue);
    };

    // Special Diet Functions

    const handleClickRecoverSpecialDiet = () => {
        alert(JSON.stringify(specialDiet));
        props.handleClose();
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
                    <CreatedByError handleChange={handleChangeCancellationComments} value={cancellationComments} />
                );
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
            case "cant_get_kits_next_week":
                cancellationReasonComponent = (
                    <CantGetKitsNextWeek handleChange={handleChangeSkipWeeks} weeks={skipWeekData.weeks} value={weeksToSkip} />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = "no gracias, deseo cancelar";
                handlePrimaryBtnClick = handleClickRecoverSkipWeeks;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = "saltar semana";
                break;
            case "special_diet":
                cancellationReasonComponent = (
                    <SpecialDiet
                        handleChangeSelect={handleChangeSelectSpecialDiet}
                        valueSelect={specialDiet.value}
                        handleChangeComments={handleChangeCommentsSpecialDiet}
                        valueComments={specialDiet.comments}
                    />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = "no gracias, deseo cancelar";
                handlePrimaryBtnClick = handleClickRecoverSpecialDiet;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = "ajustar dieta";
                break;
            case "move_abroad":
                cancellationReasonComponent = <MoveAbroad />;
                handleSecondaryBtnClick = props.handleClose;
                secondaryBtnColor = theme.palette.text.secondary;
                secondaryBtnText = "cerrar";
                handlePrimaryBtnClick = handleClickCancel;
                primaryBtnColor = "#FC1919";
                primaryBtnText = "cancelar plan";
                break;
            case "dont_like_meal_kits":
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
            case "had_problems_with_letscook":
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
            case "price_too_high":
                cancellationReasonComponent = (
                    <PriceTooHigh
                        plan={plan}
                        variants={variants}
                        planVariantIdSelected={planVariantIdSelected}
                        setPlanVariantIdSelected={setPlanVariantIdSelected}
                    />
                );
                handleSecondaryBtnClick = handleClickCancel;
                secondaryBtnColor = "#FC1919";
                secondaryBtnText = "no gracias, deseo cancelar";
                handlePrimaryBtnClick = handleClickRecoverPriceTooHigh;
                primaryBtnColor = theme.palette.primary.main;
                primaryBtnText = "cambiar plan";
                break;
            case "other_reason":
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
