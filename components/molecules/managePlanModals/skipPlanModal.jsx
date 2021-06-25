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


const SkipPlanModal = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            title='Saltar semana'
            primaryButtonText='saltar semana'
            secondaryButtonText='cancelar'
        >
            <Typography variant='subtitle2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(2) }}>
                SkipPlanModal
            </Typography>
            <FormControl variant="outlined" className={classes.formControl} style={{ marginBottom: theme.spacing(3) }}>
                <InputLabel htmlFor="outlined-age-native-simple">Plan</InputLabel>
                <Select
                    native
                    // value={planSelected.planId}
                    // onChange={handleChangePlan}
                    label="Plan"
                    inputProps={{ name: 'planId', id: 'outlined-age-native-simple' }}
                >
                    {/* {props.data.plans.map((plan, index) => (
                        <option key={index} value={plan.planId}>{plan.name}</option>
                    ))} */}
                </Select>
            </FormControl>
        </Modal>
    );
}

export default SkipPlanModal;