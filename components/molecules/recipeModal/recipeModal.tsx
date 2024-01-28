// Utils
import React, { useMemo } from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";

// External Components
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";
import CloseIcon from "@material-ui/icons/Close";
import { RecipeModalProps } from "./interfaces";
import NutritionalInfoTable from "./nutritionalInfoTable";
import CarouselComponent from "../carousel/carousel";
import { useLang } from "@hooks";
import { translateRecipeDifficulty } from "helpers/utils/i18n";
import { useRouter } from "next/router";

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
    const router = useRouter();
    const theme = useTheme();
    const isMdUp = useMediaQuery("(min-width:960px)");
    const [lang] = useLang("recipeModal");
    const tools = useMemo(() => {
        return (props.recipe.tools || []).join(", ");
    }, []);

    const ingredients = useMemo(() => {
        return props.recipe?.recipeVariants[0]?.ingredients.join(", ") || "";
    }, []);

    const componentsForCarousel = useMemo(() => {
        return props.recipe.imagesUrls.map((url: string, index: number) => ({
            item: url,
            component: <img className={props.classes.image} src={url} alt={index} width="100%" />,
        }));
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
                            {props.recipe.shortDescription}
                        </DialogTitle>

                        <DialogContent dividers={false}>
                            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
                                <Grid container spacing={3} style={{ marginTop: "-32px", marginBottom: 16 }}>
                                    <Grid item xs={12} sm={6}>
                                        <CarouselComponent
                                            maxItemsMobile={1}
                                            maxItemsTablet={1}
                                            maxItemsDesktop={1}
                                            components={componentsForCarousel}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12}>
                                                <Grid container style={{ paddingTop: 20 }}>
                                                    <Grid item className={props.classes.tag}>
                                                        <TimerIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                                                        <Typography variant="subtitle2" color="textPrimary">
                                                            {props.recipe.cookDuration}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item className={props.classes.tag}>
                                                        <SpeedIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                                                        <Typography color="textPrimary">
                                                            {translateRecipeDifficulty(props.recipe.difficultyLevel, router.locale)}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="textPrimary"
                                                    style={{ marginBottom: theme.spacing(1) }}
                                                >
                                                    {lang.ingredients}
                                                </Typography>
                                                <Typography variant="body2" color="textPrimary">
                                                    {ingredients}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="textPrimary"
                                                    style={{ marginBottom: theme.spacing(1) }}
                                                >
                                                    {lang.tools}
                                                </Typography>
                                                <Typography variant="body2" color="textPrimary">
                                                    {tools}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="textPrimary" style={{ marginBottom: theme.spacing(1) }}>
                                            {lang.description}
                                        </Typography>
                                        <Typography variant="body2" color="textPrimary">
                                            {props.recipe.longDescription}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="subtitle1" color="textPrimary" style={{ marginBottom: theme.spacing(1) }}>
                                            {lang.nutritionalInfo}
                                        </Typography>
                                        <NutritionalInfoTable rows={props.recipe.nutritionalInfo || []} />
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
