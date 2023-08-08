// Utils & Config
import React, { useState, useEffect } from "react";

import { useTheme, makeStyles, Typography, Grid, TextField, Button, DialogActions, useMediaQuery, Box } from "@material-ui/core";

// External Components
import Modal from "../../atoms/modal/modal";
import SimpleRating from "../starRating/starRating";
import { updateRecipeRating } from "../../../helpers/serverRequests/user-recipes";

const useStyles = makeStyles((theme) => ({
    img: {
        height: "96px",
        width: "150px",
        borderRadius: "5%",
    },
    span: {
        fontStyle: "italic",
    },
    boxRecipeDesc: {
        display: "flex",
        flexDirection: "column",
        alignSelf: "center",
        marginLeft: theme.spacing(3),
    },
}));

const RecipesModal = (props) => {
    const lang = props.lang;
    const classes = useStyles();
    const { chosenRecipe, starValue, handleSecondaryButtonClick, setStarValue, setChosenRecipe, handleClose } = props;

    const [comment, setComment] = useState("");

    useEffect(() => {
        setComment(chosenRecipe.comment);
    }, [chosenRecipe.comment]);
    
    const handleChangeComment = (e) => {
        setComment(e.target.value);
    };

    return (
        <Modal
            open={props.open}
            handleClose={handleClose}
            handlePrimaryButtonClick={() => props.handlePrimaryButton(starValue, comment)}
            title={chosenRecipe.rating ? lang.title.hasRating : lang.title.hasNotRating}
            primaryButtonText={chosenRecipe.rating ? lang.primaryButtonText.hasRating : lang.primaryButtonText.hasNotRating}
            secondaryButtonText={lang.secondaryButtonText}
            fullScreen={true}
        >
            <Grid container spacing={2}>
                <Grid item xs={12} style={{ display: "flex" }}>
                    <img src={props.chosenRecipe.recipeImageUrl} className={classes.img} />
                    <Box className={classes.boxRecipeDesc}>
                        <Typography gutterBottom variant="h6">
                            {chosenRecipe.recipeName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {chosenRecipe.label}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <SimpleRating
                        setStarValue={setStarValue}
                        starValue={starValue}
                        selectedRecipe={chosenRecipe}
                        isModal={true}
                        handleClickOpenRecipeModal={() => ""}
                    />
                </Grid>
                <Grid item xs={12}>
                    <form className={classes.root} noValidate autoComplete="off" style={{ marginTop: "1rem" }}>
                        <TextField
                            id={chosenRecipe.id}
                            placeholder={lang.comments}
                            variant="outlined"
                            fullWidth
                            multiline
                            rows="5"
                            onChange={(e) => handleChangeComment(e)}
                            value={comment}
                        />
                    </form>
                </Grid>
            </Grid>
        </Modal>
    );
};

export default RecipesModal;
