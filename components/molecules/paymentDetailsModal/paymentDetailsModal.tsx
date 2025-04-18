// Utils
import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import Image from "next/image";

// Internal Components
import PlanInfo from "../planInfo/planInfo";

// External Components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Modal from "../../atoms/modal/modal";

// Icons & Images
import { PaymentDetailsModalProps } from "./interface";

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

const PaymentDetailsModal = withStyles(styles)((props: PaymentDetailsModalProps) => {
    const theme = useTheme();
    const lang = props.lang;

    return (
        <Modal open={props.open} handleClose={props.handleClose} maxWidth="md" fullScreen title={lang.title}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" color="textPrimary" style={{ marginBottom: theme.spacing(2) }}>
                        {lang.subscriptionPaid}
                    </Typography>
                    {props.data.orders?.map((order, index) => (
                        <div
                            key={index}
                            style={{
                                borderBottom: `1px dashed rgba(0,0,0,0.1)`,
                                paddingBottom: theme.spacing(2),
                                marginBottom: theme.spacing(2),
                            }}
                        >
                            <PlanInfo planName={order.planName} planIcon={order.planIcon} style={{ marginBottom: theme.spacing(1) }} />
                            <Typography variant="body2" color="textPrimary" style={{ marginBottom: theme.spacing(1) }}>
                                {order.planVariant}
                            </Typography>
                            <Typography variant="body2" color="textPrimary" style={{ marginBottom: theme.spacing(1) }}>
                                {lang.subtotal}: {order.amount} €
                            </Typography>
                            {order.hasRecipes && (
                                <>
                                    <Typography variant="body2" color="textPrimary" style={{ marginBottom: theme.spacing(2) }}>
                                        {lang.recipesChoosen}
                                    </Typography>
                                    {order.recipes.length > 0 ? (
                                        order.recipes.map((recipe, index) => (
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    marginLeft: theme.spacing(2),
                                                    marginBottom: theme.spacing(1),
                                                    alignItems: "center",
                                                }}
                                                key={index}
                                            >
                                                <Image unoptimized src={recipe.imageUrl} width={74} height={48} alt={recipe.name} />
                                                <Typography variant="body2" color="textPrimary" style={{ marginLeft: theme.spacing(2) }}>
                                                    {recipe.name}
                                                </Typography>
                                            </div>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="textPrimary">
                                            {lang.recipesNotFound}
                                        </Typography>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="textPrimary" style={{ marginBottom: theme.spacing(1) }}>
                        {lang.subtotal}: {props.data.amount} €
                    </Typography>
                    <Typography variant="body2" color="textPrimary" style={{ marginBottom: theme.spacing(1) }}>
                        {lang.shippingCost}: {props.data.shippingCost} €
                    </Typography>
                    {props.data.discountAmount !== 0 && (
                        <Typography variant="body2" color="textPrimary" style={{ marginBottom: theme.spacing(1) }}>
                            {lang.discount}: -{props.data.discountAmount} €
                        </Typography>
                    )}
                    <Typography
                        variant="body2"
                        color="textPrimary"
                        style={{ fontWeight: 600, borderTop: `1px dashed rgba(0,0,0,0.1)`, paddingTop: theme.spacing(1) }}
                    >
                        {lang.total}: {props.data.totalAmount} €
                    </Typography>
                </Grid>
            </Grid>
        </Modal>
    );
});

export default PaymentDetailsModal;
