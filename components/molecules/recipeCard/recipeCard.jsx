// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// Internal Components
import RecipeImgTags from '../../atoms/recipeImgTags/recipeImgTags';

// External components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '8px',
        height: 250,
        background: "rgb(0,0,0)",
        background:
            "linear-gradient(0deg, rgba(0,0,0,0.9444152661064426) 0%, rgba(0,0,0,0) 100%)",
        zIndex: "99",
    },
    gradient: {
        borderRadius: '8px',
        height: 250,
        backgroundSize: "cover",
    },
    imgTag: {
        width: "max-content",
        backgroundColor: theme.palette.primary.main,
        textTransform: "uppercase",
        textAlign: "center",
        fontWeight: '600',
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1.5)}px`,
        borderRadius: "60px",
        marginRight: theme.spacing(1),
    },
    tag: {
        width: "max-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: '#262626',
        color: theme.palette.primary.contrastText,
        textAlign: "center",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        borderRadius: "4px",
        marginRight: theme.spacing(1),
    },
    marg: {
        marginRight: theme.spacing(1),
    },
    textWhite: {
        color: theme.palette.primary.contrastText,
    },
    titleText: {
        marginTop: theme.spacing(1)
    }
}));

const RecipeCard = (props) => {
    const classes = useStyles();

    const { root, imgTag, tag, marg, textWhite, gradient, titleText } = classes;

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
    mainTag: PropTypes.string,
    timeTag: PropTypes.string.isRequired,
    difficultyTag: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
};

export default RecipeCard;
