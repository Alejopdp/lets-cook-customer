// Utils
import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Image from "next/image";

// Internal Components
import PlanInfo from "../planInfo/planInfo";
import TextButton from "../../atoms/textButton/textButton";

// External Components
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

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

const DialogTitle = withStyles(styles)((props) => {
    const theme = useTheme();
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h5" style={{ color: theme.palette.text.black }}>
                {children}
            </Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const PaymentDetailsModal = withStyles(styles)((props) => {
    const theme = useTheme();
    const isMdUp = useMediaQuery("(min-width:960px)");

    let price = props.data ? props.data.monto : "";

    return (
        <div>
            <Dialog
                fullScreen={isMdUp ? false : true}
                fullWidth={true}
                maxWidth="md"
                open={props.open}
                onClose={props.handleClose}
                scroll="paper"
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                style={{ zIndex: "3147483647" }}
            >
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Detalle del pago
                </DialogTitle>

                <DialogContent dividers={false}>
                    <DialogContentText id="scroll-dialog-description" ref={props.descriptionElementRef} tabIndex={-1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" style={{ fontSize: "20px", marginBottom: theme.spacing(2) }}>
                                    Detalle del monto
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                                    Subtotal: {price} €
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                                    Costo de envío: 0 €
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                                    Descuento: 0 €
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: "16px", fontWeight: 900, marginBottom: theme.spacing(1) }}>
                                    Total: {price} €
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="body2" style={{ fontSize: "20px", marginBottom: theme.spacing(2) }}>
                                    Recetas elegidas
                                </Typography>
                                <div
                                    style={{ display: "flex", flexDirection: "row", marginBottom: theme.spacing(1), alignItems: "center" }}
                                >
                                    <Image
                                        src={`https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`}
                                        width={74}
                                        height={48}
                                        alt="Salmón con quinoa"
                                    />
                                    <Typography variant="body2" style={{ fontSize: "16px", marginLeft: theme.spacing(2) }}>
                                        Salmón con quinoa
                                    </Typography>
                                </div>
                                <div
                                    style={{ display: "flex", flexDirection: "row", marginBottom: theme.spacing(1), alignItems: "center" }}
                                >
                                    <Image
                                        src={`https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`}
                                        width={74}
                                        height={48}
                                        alt="Garbanzos revueltos"
                                    />
                                    <Typography variant="body2" style={{ fontSize: "16px", marginLeft: theme.spacing(2) }}>
                                        Garbazos revueltos
                                    </Typography>
                                </div>
                                <div
                                    style={{ display: "flex", flexDirection: "row", marginBottom: theme.spacing(1), alignItems: "center" }}
                                >
                                    <Image
                                        src={`https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80`}
                                        width={74}
                                        height={48}
                                        alt="Hamburguesa de pollo"
                                    />
                                    <Typography variant="body2" style={{ fontSize: "16px", marginLeft: theme.spacing(2) }}>
                                        Hamburguesa de pollo
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
});

export default PaymentDetailsModal;
