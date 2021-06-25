// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../atoms/modal/modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

// Internal Components
import CantGetKitsNextWeek from '../cancellationReasonComponents/cantGetKitsNextWeek';
import CreatedByError from '../cancellationReasonComponents/createdByError';
import DontLikeMealKits from '../cancellationReasonComponents/dontLikeMealKits';
import HadProblemsWithLetsCook from '../cancellationReasonComponents/hadProblemsWithLetscook';
import MoveAbroad from '../cancellationReasonComponents/moveAbroad';
import OtherReason from '../cancellationReasonComponents/otherReason';
import PriceTooHigh from '../cancellationReasonComponents/priceTooHigh';
import SpecialDiet from '../cancellationReasonComponents/specialDiet';


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
}));


const CancelPlanModal = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [reasonSelected, setReason] = useState({})

    // Esta mal, en realidad tengo que inicializar el valor en 0... Sin razon de cancelacion
    useEffect(() => {
        setReason(props.data.reasons[0])
    }, [props.open]);

    const handleChangeReason = event => {
        let newReason = props.data.reasons.filter(reason => reason.value === event.target.value)[0]
        setReason(newReason)
    }

    let cancellationReasonComponent;
    let secondaryBtnColor;
    let secondaryBtnText;
    let handleSecondaryBtnClick;
    let primaryBtnColor;
    let primaryBtnText;
    let handlePrimaryBtnClick;

    const handleCancelClick = () => {
        alert('plan canceladoooo!!!')
    }

    const handleRecoverCustomerClick = () => {
        alert('cliente recuperado!!!')
    }

    switch (reasonSelected.value) {
        case 'created_by_error':
            cancellationReasonComponent = <CreatedByError />
            handleSecondaryBtnClick = props.handleClose
            secondaryBtnColor = theme.palette.text.secondary
            secondaryBtnText = 'cerrar'
            handlePrimaryBtnClick = handleCancelClick
            primaryBtnColor = '#FC1919'
            primaryBtnText = 'cancelar plan'
            break;
        case 'cant_get_kits_next_week':
            cancellationReasonComponent = <CantGetKitsNextWeek />
            handleSecondaryBtnClick = handleCancelClick
            secondaryBtnColor = '#FC1919'
            secondaryBtnText = 'no gracias, deseo cancelar'
            handlePrimaryBtnClick = handleRecoverCustomerClick
            primaryBtnColor = theme.palette.primary.main
            primaryBtnText = 'saltar semana'
            break;
        case 'special_diet':
            cancellationReasonComponent = <SpecialDiet />
            handleSecondaryBtnClick = handleCancelClick
            secondaryBtnColor = '#FC1919'
            secondaryBtnText = 'no gracias, deseo cancelar'
            handlePrimaryBtnClick = handleRecoverCustomerClick
            primaryBtnColor = theme.palette.primary.main
            primaryBtnText = 'ajustar dieta'
            break;
        case 'move_abroad':
            cancellationReasonComponent = <MoveAbroad />
            handleSecondaryBtnClick = props.handleClose
            secondaryBtnColor = theme.palette.text.secondary
            secondaryBtnText = 'cerrar'
            handlePrimaryBtnClick = handleCancelClick
            primaryBtnColor = '#FC1919'
            primaryBtnText = 'cancelar plan'
            break;
        case 'dont_like_meal_kits':
            cancellationReasonComponent = <DontLikeMealKits />
            handleSecondaryBtnClick = props.handleClose
            secondaryBtnColor = theme.palette.text.secondary
            secondaryBtnText = 'cerrar'
            handlePrimaryBtnClick = handleCancelClick
            primaryBtnColor = '#FC1919'
            primaryBtnText = 'cancelar plan'
            break;
        case 'had_problems_with_letscook':
            cancellationReasonComponent = <HadProblemsWithLetsCook />
            handleSecondaryBtnClick = props.handleClose
            secondaryBtnColor = theme.palette.text.secondary
            secondaryBtnText = 'cerrar'
            handlePrimaryBtnClick = handleCancelClick
            primaryBtnColor = '#FC1919'
            primaryBtnText = 'cancelar plan'
            break;
        case 'price_too_high':
            cancellationReasonComponent = <PriceTooHigh />
            handleSecondaryBtnClick = handleCancelClick
            secondaryBtnColor = '#FC1919'
            secondaryBtnText = 'no gracias, deseo cancelar'
            handlePrimaryBtnClick = handleRecoverCustomerClick
            primaryBtnColor = theme.palette.primary.main
            primaryBtnText = 'cambiar plan'
            break;
        case 'other_reason':
            cancellationReasonComponent = <OtherReason />
            cancellationReasonComponent = <HadProblemsWithLetsCook />
            handleSecondaryBtnClick = props.handleClose
            secondaryBtnColor = theme.palette.text.secondary
            secondaryBtnText = 'cerrar'
            handlePrimaryBtnClick = handleCancelClick
            primaryBtnColor = '#FC1919'
            primaryBtnText = 'cancelar plan'
            break;
        default:
            cancellationReasonComponent = <OtherReason />
            cancellationReasonComponent = <HadProblemsWithLetsCook />
            handleSecondaryBtnClick = props.handleClose
            secondaryBtnColor = theme.palette.text.secondary
            secondaryBtnText = 'cerrar'
            handlePrimaryBtnClick = handleCancelClick
            primaryBtnColor = '#FC1919'
            primaryBtnText = 'cancelar plan'
            break;
    }

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            title='Cancelar plan'
            handlePrimaryButtonClick={handlePrimaryBtnClick}
            primaryButtonColor={primaryBtnColor}
            primaryButtonText={primaryBtnText}
            handleSecondaryButtonClick={handleSecondaryBtnClick}
            secondaryButtonColor={secondaryBtnColor}
            secondaryButtonText={secondaryBtnText}
        >
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(2) }}>
                ¿Por qué quieres cancelar el plan?
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Razones de cancelación</InputLabel>
                <Select
                    native
                    value={reasonSelected.value}
                    onChange={handleChangeReason}
                    label="Razones de cancelación"
                    inputProps={{ name: 'reason', id: 'outlined-age-native-simple' }}
                >
                    {props.data.reasons.map(reason => (
                        <option key={reason.id} value={reason.value}>{reason.text}</option>
                    ))}
                </Select>
            </FormControl>
            {cancellationReasonComponent}
        </Modal>
    );
}

export default CancelPlanModal;