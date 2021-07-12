// Utils
import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";

// Internal Components
import PlanInfo from "../planInfo/planInfo";
import TextButton from "../../atoms/textButton/textButton";

// External Components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Modal from "../../atoms/modal/modal";

// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";
import CloseIcon from "@material-ui/icons/Close";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(3),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(2),
        top: theme.spacing(2),
        color: theme.palette.grey[500],
    },
    tag: {
        width: "max-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EFEFEF",
        color: theme.palette.primary,
        textAlign: "center",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        borderRadius: "4px",
        marginRight: theme.spacing(1),
    },
    image: {
        borderRadius: "15px",
    },
});



const PaymentDetailsModal = withStyles(styles)((props) => {
    const theme = useTheme();

    const urlImageMock = "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80";

    const paymentOrderDetails = {
        amounts: {
            subtotal: '100 €',
            shippingCost: '10 €',
            discounts: '-5 €',
            total: '105 €'
        },
        plans: [
            {
                subscriptionId: '123',
                planName: 'Plan Familiar',
                planIcon: '/assets/plan-test-color.svg',
                planDescription: '3 recetas para 2 personas',
                frequency: 'semanal',
                subtotal: '50 €',
                hasRecipes: true,
                recipes: [
                    { recipeId: '123', img: urlImageMock, name: 'Salmón con quinoa' },
                    { recipeId: '123', img: urlImageMock, name: 'Garbazos revueltos' },
                    { recipeId: '123', img: urlImageMock, name: 'Hamburguesa de pollo' },
                ]
            },
            {
                subscriptionId: '234',
                planName: 'Plan Ahorro',
                planIcon: '/assets/plan-test-color.svg',
                planDescription: '2 recetas para 4 personas',
                frequency: 'semanal',
                subtotal: '30 €',
                hasRecipes: true,
                recipes: [
                    { recipeId: '123', img: urlImageMock, name: 'Salmón con quinoa' },
                    { recipeId: '123', img: urlImageMock, name: 'Garbazos revueltos' },
                ]
            },
            {
                subscriptionId: '456',
                planName: 'Plan Vinos',
                planIcon: '/assets/plan-test-color.svg',
                planDescription: 'Selección de vino blanco',
                frequency: 'semanal',
                subtotal: '20 €',
                hasRecipes: false,
                recipes: []
            }
        ]
    }


    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            maxWidth='md'
            fullScreen
            title='Detalle del pago'
        >
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" color='textSecondary' style={{ marginBottom: theme.spacing(2) }}>
                        Suscripciones pagadas
                    </Typography>
                    {paymentOrderDetails.plans.map((plan, index) => (
                        <div key={index} style={{ borderBottom: `1px dashed rgba(0,0,0,0.1)`, paddingBottom: theme.spacing(2), marginBottom: theme.spacing(2) }}>
                            <PlanInfo planName={plan.planName} planIcon={plan.planIcon} style={{ marginBottom: theme.spacing(1) }} />
                            <Typography variant="body2" color='textSecondary' style={{ marginBottom: theme.spacing(1) }}>
                                {plan.planDescription}
                            </Typography>
                            <Typography variant="body2" color='textSecondary' style={{ marginBottom: theme.spacing(1) }}>
                                Subtotal: {plan.subtotal}
                            </Typography>
                            {plan.hasRecipes && (
                                <>
                                    <Typography variant="body2" color='textSecondary' style={{ marginBottom: theme.spacing(2) }}>
                                        Recetas elegidas:
                                    </Typography>
                                    {plan.recipes.length > 0 ? (
                                        plan.recipes.map((recipe, index) => (
                                            <div style={{ display: "flex", flexDirection: "row", marginLeft: theme.spacing(2), marginBottom: theme.spacing(1), alignItems: "center" }} >
                                                <Image
                                                    src={recipe.img}
                                                    width={74}
                                                    height={48}
                                                    alt={recipe.name}
                                                />
                                                <Typography variant="body2" color='textSecondary' style={{ marginLeft: theme.spacing(2) }}>
                                                    {recipe.name}
                                                </Typography>
                                            </div>
                                        ))
                                    ) : (
                                            <Typography variant="body2" color='textSecondary'>
                                                No se encontraron recetas
                                            </Typography>
                                        )}
                                </>
                            )}
                        </div>
                    ))}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" color='textSecondary' style={{ marginBottom: theme.spacing(2) }}>
                        Detalle del monto pagado
                    </Typography>
                    <Typography variant="body2" color='textSecondary' style={{ marginBottom: theme.spacing(1) }}>
                        Subtotal: {paymentOrderDetails.amounts.subtotal}
                    </Typography>
                    <Typography variant="body2" color='textSecondary' style={{ marginBottom: theme.spacing(1) }}>
                        Costo de envío: {paymentOrderDetails.amounts.shippingCost}
                    </Typography>
                    <Typography variant="body2" color='textSecondary' style={{ marginBottom: theme.spacing(1) }}>
                        Descuento: {paymentOrderDetails.amounts.discounts}
                    </Typography>
                    <Typography variant="body2" color='textSecondary' style={{ fontWeight: 600, borderTop: `1px dashed rgba(0,0,0,0.1)`, paddingTop: theme.spacing(1) }} >
                        Total: {paymentOrderDetails.amounts.total}
                    </Typography>
                </Grid>
            </Grid>
        </Modal>
    );
});

export default PaymentDetailsModal;
