// Utils
import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

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
import Image from "next/image";

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

const PlanRecoverModal = withStyles(styles)((props) => {
    const theme = useTheme();
    const isMdUp = useMediaQuery("(min-width:960px)");

    let freq = props.data ? props.data.frequency : "";
    let icon = props.data ? "/assets/plan-test-color.svg" /* props.data.planIcon */ : "/assets/plan-test-color.svg";
    let name = props.data ? props.data.planName : "";
    let label = props.data ? props.data.planVariantLabel : "";

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
                    Volver a pedir plan
                </DialogTitle>

                <DialogContent dividers={false}>
                    <DialogContentText id="scroll-dialog-description" ref={props.descriptionElementRef} tabIndex={-1}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <PlanInfo planName={name} planIcon={icon} style={{ marginBottom: theme.spacing(3) }} />
                                <Typography variant="body2" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                                    {label}
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: "16px", marginBottom: theme.spacing(1) }}>
                                    Frecuencia: {freq}
                                </Typography>
                                <Typography variant="body2" style={{ fontSize: "16px", marginBottom: theme.spacing(1), fontWeight: 900 }}>
                                    Valor total: 36 €
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} justify="flex-end">
                            <Grid item>
                                <TextButton handleClick={props.handleClose} btnText="Cancelar" />
                            </Grid>
                            <Grid item>
                                <TextButton
                                    handleClick={() => console.log("Pedido!")}
                                    style={{ color: theme.palette.primary.main }}
                                    btnText="Volver a pedir"
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
});

export default PlanRecoverModal;
