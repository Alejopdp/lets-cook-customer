// Utils & Config
import React from "react";
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// Internal Components
import RecipeImgTags from '../../atoms/recipeImgTags/recipeImgTags';

// External components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";

const RecipeCard = (props) => {
    const { root, imgTag, tag, marg, textWhite, gradient, titleText } = useStyles();

    return (
        <div
            className={gradient}
            style={{ backgroundImage: `url(${props.img})`, cursor: 'pointer' }}
            onClick={props.handleClickOpenModal}
        >
            <Card className={root} >
                <CardContent style={{ height: "60%" }}>
                    <RecipeImgTags imgTags={props.imgTags} />
                </CardContent>

                <CardContent style={{ height: "40%" }}>
                    <Grid container>
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

                    <Typography variant="subtitle1" className={clsx(titleText, textWhite)}>
                        {props.recipeName}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

RecipeCard.propTypes = {
    img: PropTypes.string.isRequired,
    imgTags: PropTypes.array,
    timeTag: PropTypes.string.isRequired,
    difficultyTag: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
    handleClickOpenModal: PropTypes.func.isRequired,
};

RecipeCard.defaultProps = {
    handleClickOpenModal: () => {}
}
export default RecipeCard;
