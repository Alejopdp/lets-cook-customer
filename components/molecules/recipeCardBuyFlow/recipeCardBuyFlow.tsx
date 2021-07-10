// Utils & Config
import React from "react";
import useStyles from "./styles";

import { CustomButton, RecipeImgTags } from "@atoms";

// External components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";
import Visibility from "@material-ui/icons/Visibility";
import AddCircle from "@material-ui/icons/AddCircle";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import { Box, Button, IconButton } from "@material-ui/core";
import { useBuyFlow } from "@stores";
import { RecipeCardBuyFlowProps } from './interfaces';

export const RecipeCardBuyFlow = (props: RecipeCardBuyFlowProps) => {
    const { root, cardCnt, tag, marg, titleText, visibilityBtn } = useStyles();
    const [recipes] = useBuyFlow((store) => [store.form.recipes, store.selectRecipes]);

    const hideAddButton = () => {
        const index = recipes.findIndex(({ id }) => id === props.id);
        return index !== -1;
    };

    return (
        <Card className={root}>
            <CardContent style={{ backgroundImage: `url(${props.imageUrl})` }} className={cardCnt}>
                <RecipeImgTags imgTags={props.imageTags} />
            </CardContent>

            <CardContent>
                <Grid container direction="column">
                    <Grid item container>
                        <Grid item className={tag}>
                            <TimerIcon color="primary" className={marg} />
                            <Typography variant="subtitle2">{props.cookDuration}</Typography>
                        </Grid>

                        <Grid item className={tag}>
                            <SpeedIcon color="primary" className={marg} />
                            <Typography variant="subtitle2">{props.difficultyLevel}</Typography>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1" className={titleText}>
                            {props.name}
                        </Typography>
                    </Grid>
                </Grid>

                <Box display="flex" flexDirection="row">
                    <Grid container alignItems="center">
                        <Grid item xs={hideAddButton()}>
                            <Button className={visibilityBtn} onClick={() => props.handleClickOpenModal()}>
                                <Visibility />
                            </Button>
                        </Grid>
                        {hideAddButton() && (
                            <>
                                <Grid item>
                                    <IconButton onClick={() => props.handleClickAddRecipe()} disabled={recipes.length >= 3}>
                                        <AddCircleOutline />
                                    </IconButton>
                                </Grid>
                                <Grid item style={{ textAlign: "center" }}>
                                    <Typography>{recipes.filter(({ id }) => id === props.id).length}</Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton onClick={() => props.handleClickRemoveRecipe()}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                </Grid>
                            </>
                        )}
                    </Grid>

                    {!hideAddButton() && (
                        <CustomButton
                            smallButton
                            icon={<AddCircle />}
                            disabled={recipes.length >= 3}
                            text="Agregar"
                            onClick={props.handleClickAddRecipe}
                        />
                    )}
                </Box>
            </CardContent>
        </Card>
    );
};

export default RecipeCardBuyFlow;
