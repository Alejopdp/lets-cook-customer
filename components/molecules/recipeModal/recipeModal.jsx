// Utils
import React from 'react';
import { withStyles, useTheme } from '@material-ui/core/styles';

// Internal Components
import RecipeImgTags from '../../atoms/recipeImgTags/recipeImgTags'

// External Components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Image from "next/image";

// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";
import CloseIcon from '@material-ui/icons/Close';


const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
    tag: {
        width: "max-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#EFEFEF',
        color: theme.palette.primary,
        textAlign: "center",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        borderRadius: "4px",
        marginRight: theme.spacing(1),
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const RecipeModal = withStyles(styles)((props) => {
    const theme = useTheme();
    return (
        <div>
            <Dialog
                fullWidth={true}
                maxWidth='md'
                open={props.open}
                onClose={props.handleClose}
                scroll='paper'
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
                    Detalle de la receta
                </DialogTitle>

                <DialogContent dividers={true}>
                    <DialogContentText id="scroll-dialog-description" ref={props.descriptionElementRef} tabIndex={-1} >
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Image src={props.data.imageUrl} alt={props.data.name} width={400} height={250} />
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <RecipeImgTags imgTags={props.data.imageTags} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {props.data.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {props.data.shortDescription}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item className={props.classes.tag}>
                                                <TimerIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                                                <Typography variant="subtitle2">
                                                    {props.data.cookDuration}
                                                </Typography>
                                            </Grid>
                                            <Grid item className={props.classes.tag}>
                                                <SpeedIcon color="primary" style={{ marginRight: theme.spacing(1) }} />
                                                <Typography variant="subtitle2">
                                                    {props.data.difficultyLevel}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid container>
                            <Grid item xs={12}>
                                variantOptions
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography>
                                    Descripción
                                </Typography>
                                <Typography>
                                    {props.data.longDescription}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Ingredientes
                                </Typography>
                                <Typography>
                                    {props.data.longDescription}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Herramientas necesarias
                                </Typography>
                                <Typography>
                                    {props.data.longDescription}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography>
                                    Información nutricional (cada 100 gramos)
                                </Typography>
                                <Typography>
                                    {props.data.longDescription}
                                </Typography>
                            </Grid>
                        </Grid>

                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
});

export default RecipeModal;