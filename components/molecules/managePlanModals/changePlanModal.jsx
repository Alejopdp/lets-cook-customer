// Utils & Config
import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Modal from '../../atoms/modal/modal';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    },
}));


const ChangePlanModal = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [planSelected, setPlanSelected] = useState({
        planId: '',
        planVariantId: '',
    });

    useEffect(() => {
        let activePlanId = props.data.plans.filter(plan => plan.active === true)[0].planId
        let activePlanVariantId = props.data.variants.filter(variant => variant.active === true)[0].planVariantId
        setPlanSelected({
            ...planSelected,
            planId: activePlanId,
            planVariantId: activePlanVariantId
        })
    }, [props.open]);

    const handleChangePlan = (event) => {
        console.log('event', event.target.value)
        const name = event.target.name;
        setPlanSelected({
            ...planSelected,
            [name]: event.target.value,
        });
    };


    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Cambiar plan'
            primaryButtonText='cambiar plan'
            secondaryButtonText='cancelar'
        >
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(2) }}>
                1. Elige tu plan
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Plan</InputLabel>
                <Select
                    native
                    value={planSelected.planId}
                    onChange={handleChangePlan}
                    label="Plan"
                    inputProps={{ name: 'planId', id: 'outlined-age-native-simple' }}
                >
                    {props.data.plans.map((plan, index) => (
                        <option key={index} value={plan.planId}>{plan.name}</option>
                    ))}
                </Select>
            </FormControl>
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(2) }}>
                2. Elige el tamaño de tu plan
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Variante</InputLabel>
                <Select
                    native
                    value={planSelected.planVariantId}
                    onChange={handleChangePlan}
                    label="Variante"
                    inputProps={{ name: 'planVariantId', id: 'outlined-age-native-simple' }}
                >
                    {props.data.variants.filter(variant => variant.planId === planSelected.planId).map((variant, index) => (
                        <option key={index} value={variant.planVariantId}>{variant.variantDescription}</option>
                    ))}
                </Select>
            </FormControl>
        </Modal>
    );
}

export default ChangePlanModal;