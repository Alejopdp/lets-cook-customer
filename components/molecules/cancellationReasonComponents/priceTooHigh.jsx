// Utils & Config
import React, { useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

// External Components
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from "@material-ui/core/Link";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

// Internal Components
import PlanInfo from '../planInfo/planInfo';

const useStyles = makeStyles((theme) => ({
    planBox: {
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
        border: '1px dashed rgba(0,0,0,0.1)',
        borderRadius: '8px',
        marginBottom: theme.spacing(3)
    },
    totalPrice: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: theme.spacing(2),
        borderTop: '1px dashed rgba(0,0,0,0.1)',
    },
    formControl: {
        width: '100%',
        marginBottom: theme.spacing(3)
    },
}));


const PriceTooHigh = ({ setPlanVariantIdSelected, plan, variants, planVariantIdSelected }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [operationView, setOperationView] = useState('economyPlan')

    const changeOperationView = (newView) => {
        if (newView === 'economyPlan') {
            setPlanVariantIdSelected(plan.planVariantId)
        } else {
            setPlanVariantIdSelected(variants[0].planVariantId)
        }
        setOperationView(newView)
    }

    const handleChangeVariant = (event) => {
        setPlanVariantIdSelected(event.target.value)
    };

    const economyPlanComponent = (
        <>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                El precio del plan ahorro es el más bajo que podemos ofrecer. Let’s Cook recibe descuentos por comprar en cantidad y lo traducimos directamente al precio en los planes ahorro.
            </Typography>
            <Box className={classes.planBox}>
                <PlanInfo style={{ marginBottom: theme.spacing(2) }} planName={plan.name} planIcon={plan.icon} />
                <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px', marginBottom: theme.spacing(2) }}>
                    {plan.variantInfo}
                </Typography>
                <Typography variant='body2' color='textSecondary' style={{ fontSize: '14px', marginBottom: theme.spacing(2) }}>
                    {plan.variantExtraInfo}
                </Typography>
                <Box className={classes.totalPrice}>
                    <Typography variant='body1' color='primary' style={{ fontSize: '16px', fontWeight: '600' }}>
                        Valor total:
                </Typography>
                    <Typography variant='body1' color='primary' style={{ fontSize: '16px', fontWeight: '600' }}>
                        {plan.priceText}
                    </Typography>
                </Box>
            </Box>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(0.5) }}>
                También podemos ofrecerte reducir raciones del plan actual.
            </Typography>
            <Link onClick={() => changeOperationView('lowerVariants')} color='textPrimary' style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <Typography variant="subtitle1" color="textPrimary" style={{ fontSize: '14px' }}>
                    Ver opciones
            </Typography>
            </Link>
        </>
    )

    const lowerVariantsComponent = (
        <>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(3) }}>
                A continuación encontrarás una lista de opciones de tu plan actual
            </Typography>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Variante</InputLabel>
                <Select
                    native
                    value={planVariantIdSelected}
                    onChange={handleChangeVariant}
                    label="Variante"
                    inputProps={{ name: 'planVariantId', id: 'variantDropdown' }}
                >
                    {variants.map(variant => (
                        <option key={variant.planVariantId} value={variant.planVariantId}>{variant.variantDescription}</option>
                    ))}
                </Select>
            </FormControl>
            <Typography variant='body2' color='textSecondary' style={{ fontSize: '16px', marginBottom: theme.spacing(0.5) }}>
                También podemos ofrecerte cambiar a un plan más económico.
            </Typography>
            <Link onClick={() => changeOperationView('economyPlan')} color='textPrimary' style={{ cursor: 'pointer', textDecoration: 'none' }}>
                <Typography variant="subtitle1" color="textPrimary" style={{ fontSize: '14px' }}>
                    Ver opciones
                </Typography>
            </Link>
        </>
    )


    return (
        <>
            {operationView === 'economyPlan' ? economyPlanComponent : lowerVariantsComponent}
        </>
    );
}

export default PriceTooHigh;