// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// Internal Components
import RecipeImgTags from '../../components/atoms/recipeImgTags/recipeImgTags';
import CustomButton from '../../components/atoms/customButton/customButton';

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

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '8px',
        width: 300,
        height: 350,
    },
    tag: {
        width: "max-content",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        textAlign: "center",
        padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
        borderRadius: "4px",
        marginRight: theme.spacing(1),
    },
    marg: {
        marginRight: theme.spacing(1),
    },
    titleText: {
        marginTop: theme.spacing(1)
    }
}));

const RecipeCard = (props) => {
    const classes = useStyles();

    const { root, tag, marg,titleText } = classes;

    return (
        <Card className={root} >
            <CardContent style={{ height: "60%", backgroundImage: "url(https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                <RecipeImgTags imgTags={["Más vendido"]} />
            </CardContent>

            <CardContent style={{ height: "40%" }}>
                <Grid container>
                    <Grid item className={tag}>
                        <TimerIcon color="primary" className={marg} />
                        <Typography variant="subtitle2">
                            15 min
                        </Typography>
                    </Grid>

                    <Grid item className={tag}>
                        <SpeedIcon color="primary" className={marg} />
                        <Typography variant="subtitle2">
                            Fácil
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant="subtitle1" className={titleText}>
                            Arepas de Kriss
                        </Typography>
                    </Grid>

                    <Grid item container direction="row">
                        <Visibility />
                        <CustomButton icon={<AddCircle />} text="Agregar" />
                    </Grid>

                </Grid>
            </CardContent>
        </Card>
    );
};

RecipeCard.propTypes = {
    mainTag: PropTypes.string,
    timeTag: PropTypes.string.isRequired,
    difficultyTag: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
};

export default RecipeCard;
