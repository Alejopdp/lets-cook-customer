// Utils & Config
import React from "react";
import { useStyles } from "./styles";
import clsx from "clsx";

// Internal Components
import { RecipeImgTags } from '@atoms';

// External components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { RecipeCardProps } from './interface';
// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";

export const RecipeCard = (props: RecipeCardProps) => {
    const { root, imgTag, tag, marg, textWhite, gradient, titleText } = useStyles();

    return (
        <div
            className={gradient}
            style={{ backgroundImage: `url(${props.img})`, cursor: 'pointer', ...props.style }}
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

export default RecipeCard;
