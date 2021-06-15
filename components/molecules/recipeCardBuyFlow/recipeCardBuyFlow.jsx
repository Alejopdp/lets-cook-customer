// Utils & Config
import React from "react";
import useStyles from "./styles";
import PropTypes from "prop-types";

// Internal Components
import RecipeImgTags from '../../atoms/recipeImgTags/recipeImgTags';
import CustomButton from '../../atoms/customButton/customButton';

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
import { Box, Button } from "@material-ui/core";

const RecipeCardBuyFlow = (props) => {
    const { root, cardCnt, tag, marg, titleText, visibilityBtn } = useStyles();

    return (
        <Card className={root} >
            <CardContent style={{ backgroundImage: `url(${props.img})` }} className={cardCnt}>
                <RecipeImgTags imgTags={props.imgTags} />
            </CardContent>

            <CardContent>
                <Grid container direction="column">
                    <Grid item container>
                        <Grid item className={tag}>
                            <TimerIcon color="primary" className={marg} />
                            <Typography variant="subtitle2">
                                {props.timeTag}
                            </Typography>
                        </Grid>

                        <Grid item className={tag}>
                            <SpeedIcon color="primary" className={marg} />
                            <Typography variant="subtitle2">
                                {props.difficultyTag}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1" className={titleText}>
                            {props.recipeName}
                        </Typography>
                    </Grid>
                </Grid>

                <Box display="flex" flexDirection="row">
                    <Button className={visibilityBtn} onClick={props.handleClickOpenModal}>
                        <Visibility />
                    </Button>

                    <CustomButton
                        smallButton
                        icon={<AddCircle />}
                        text="Agregar"
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

RecipeCardBuyFlow.propTypes = {
    img: PropTypes.string.isRequired,
    imgTags: PropTypes.array,
    timeTag: PropTypes.string.isRequired,
    difficultyTag: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
    handleClickOpenModal: PropTypes.func.isRequired,
};

export default RecipeCardBuyFlow;
