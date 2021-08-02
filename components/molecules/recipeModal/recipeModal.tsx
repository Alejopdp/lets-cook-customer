// Utils
import React, { useMemo } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// Internal Components
import RecipeImgTags from "../../atoms/recipeImgTags/recipeImgTags";
import RecipeVariantsTab from "../../atoms/recipeVariantsTab/recipeVariantsTab";
import NutritionalInformationTable from "../../atoms/nutritionalInformationTable/nutritionalInformationTable";

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
import { RecipeModalProps } from "./interfaces";

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
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h5">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const RecipeModal = withStyles(styles)((props: RecipeModalProps) => {
    const theme = useTheme();
    const isMdUp = useMediaQuery("(min-width:960px)");

    const tools = useMemo(() => {
        return (props.recipe.tools || []).join(", ");
    }, []);

    return (
        <>
            {!!props.recipe && (
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
                        style={{ zIndex: 3147483647 }}
                    >
                        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                            Detalle de la receta
                        </DialogTitle>

                        <DialogContent dividers={false}>
                            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <Image
                                            className={props.classes.image}
                                            src={props.recipe.imageUrl}
                                            alt={props.recipe.name}
                                            width={400}
                                            height={250}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <RecipeImgTags imgTags={props.recipe.imageTags} />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="h6">{props.recipe.name}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography variant="body2">{props.recipe.shortDescription}</Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Grid container>
                                                    <Grid item className={props.classes.tag}>
                                                        <TimerIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                                                        <Typography variant="subtitle2">{props.recipe.cookDuration}</Typography>
                                                    </Grid>
                                                    <Grid item className={props.classes.tag}>
                                                        <SpeedIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                                                        <Typography variant="subtitle2">{props.recipe.difficultyLevel}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        style={{ display: "flex", alignItems: "center", margin: `${theme.spacing(3)}px 0px` }}
                                    >
                                        {(props.recipe.recipeVariants || []).map((option, index) => (
                                            <Typography key={index} style={{ marginRight: theme.spacing(2), fontSize: 14 }}>
                                                Hay opción {option.restriction.label}
                                            </Typography>
                                        ))}
                                    </Grid>
                                </Grid>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(2) }}>
                                        <Typography variant="subtitle1" style={{ marginBottom: theme.spacing(1) }}>
                                            Descripción
                                        </Typography>
                                        <Typography variant="body2">{props.recipe.longDescription}</Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(2) }}>
                                        <Typography variant="subtitle1" style={{ marginBottom: theme.spacing(1) }}>
                                            Ingredientes
                                        </Typography>
                                        <RecipeVariantsTab
                                            variants={props.recipe.recipeVariants} // TO DO SON RESTRICTIONS ?
                                            // ingredientsLists={[props.recipe.]}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(2) }}>
                                        <Typography variant="subtitle1" style={{ marginBottom: theme.spacing(1) }}>
                                            Herramientas necesarias
                                        </Typography>
                                        <Typography variant="body2">{tools}</Typography>
                                    </Grid>
                                    <Grid item xs={12} style={{ marginBottom: theme.spacing(2) }}>
                                        <Typography variant="subtitle1" style={{ marginBottom: theme.spacing(1) }}>
                                            Información nutricional (cada 100 gramos)
                                        </Typography>
                                        {/* <NutritionalInformationTable rows={props.recipe.} /> */}
                                    </Grid>
                                </Grid>
                            </DialogContentText>
                        </DialogContent>
                    </Dialog>
                </div>
            )}
        </>
    );
});

export default RecipeModal;
