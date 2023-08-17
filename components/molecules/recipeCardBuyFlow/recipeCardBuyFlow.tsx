// Utils & Config
import React from "react";
import useStyles from "./styles";
import { Divider, useTheme } from "@material-ui/core";
import { CustomButton, RecipeImgTags } from "@atoms";
import Rating from "@material-ui/lab/Rating";

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
import { Box, IconButton } from "@material-ui/core";
import { RecipeCardBuyFlowProps } from "./interfaces";
import { useLang } from "@hooks";

export const RecipeCardBuyFlow = (props: RecipeCardBuyFlowProps) => {
    const theme = useTheme();
    const [lang] = useLang("buyFlowLayout");
    const { root, cardCnt, tag, marg } = useStyles();

    const hideAddButton = () => {
        const index = props.selectedRecipes.findIndex(({ id }) => id === props.id);
        return index !== -1;
    };

    return (
        <Card className={root} style={{ width: "100%" }}>
            <CardContent style={{ backgroundImage: `url(${props.imageUrl})` }} className={cardCnt}>
                <RecipeImgTags imgTags={props.imageTags} />
            </CardContent>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={12} style={{ display: "flex" }}>
                        <Box className={tag}>
                            <TimerIcon fontSize="small" color="primary" className={marg} />
                            <Typography variant="subtitle2" style={{ fontSize: "13px" }}>
                                {props.cookDuration}
                            </Typography>
                        </Box>
                        <Box className={tag}>
                            <SpeedIcon fontSize="small" color="primary" className={marg} />
                            <Typography variant="subtitle2" style={{ fontSize: "13px" }}>
                                {props.difficultyLevel === "Facil"
                                    ? lang.itemEasy
                                    : props.difficultyLevel === "Dificil"
                                    ? lang.itemHard
                                    : lang.itemMedium}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} style={{ marginBottom: theme.spacing(2) }}>
                        <Typography variant="subtitle1" style={{ fontSize: "16px" }}>
                            {props.name}
                        </Typography>
                        <Box display={"flex"} visibility={!props.otherUsersRating ? "hidden" : "default"}>
                        <Typography variant="body1" style={{ fontSize: "14px", fontWeight: 500, marginRight: 8 }}>
                            {props.otherUsersRating}
                        </Typography>
                            <Rating readOnly value={props.otherUsersRating} precision={0.1} size="small" />
                            </Box>
                    </Grid>

                    <Grid item xs={12} >
                        <Grid container spacing={2} justifyContent="space-between">
                            <Grid item xs={hideAddButton()}>
                                <IconButton style={{ padding: "0px" }} onClick={() => props.handleClickOpenModal()}>
                                    <Visibility />
                                </IconButton>
                            </Grid>
                            {hideAddButton() && (
                                <>
                                    <Grid item>
                                        <IconButton style={{ padding: "0px" }} onClick={() => props.handleClickRemoveRecipe()}>
                                            <RemoveCircleOutlineIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item style={{ display: "flex", alignItems: "center" }}>
                                        <Typography>{props.selectedRecipes.filter(({ id }) => id === props.id).length}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton
                                            style={{ padding: "0px" }}
                                            color="primary"
                                            onClick={() => props.handleClickAddRecipe()}
                                            disabled={!props.isAddable}
                                        >
                                            <AddCircleOutline />
                                        </IconButton>
                                    </Grid>
                                </>
                            )}
                            {!hideAddButton() && props.isAddable && (
                                <CustomButton
                                    smallButton
                                    icon={<AddCircle />}
                                    disabled={!props.isAddable}
                                    text={lang.addRecipeCardText}
                                    onClick={props.handleClickAddRecipe}
                                    style={{ padding: "6px 16px" }}
                                />
                            )}
                        </Grid>
                    </Grid>
                    <Divider style={{width: "100%", marginTop: theme.spacing(2), marginBottom: theme.spacing(2)}} />
                    <Grid item xs={12}><Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} visibility={!props.userRating ? "hidden" : "default"}><><Typography variant="body2" color="initial" style={{fontSize: 14, fontWeight: 500}}>{lang.lastRating}</Typography><Box display={"flex"}><Typography variant="body2" color="initial" style={{fontSize: 14, fontWeight: 500, marginRight: 8}}>{props.userRating}</Typography><Rating readOnly value={props.userRating} size="small"/></Box></></Box></Grid>
                    
                </Grid>
            </CardContent>
        </Card>
    );
};

export default RecipeCardBuyFlow;
