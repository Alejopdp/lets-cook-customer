// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
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

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '8px',
        width: 300,
        height: 360,
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
        marginTop: theme.spacing(2)
    },
    visibilityBtn: {
        marginLeft: "-16px"
    }
}));

const RecipeCardBuyFlow = (props) => {
    const classes = useStyles();

    const { root, tag, marg, titleText, visibilityBtn } = classes;

    return (
        <Card className={root} >
            <CardContent style={{ height: "200px", backgroundImage: "url(https://cdn.shopify.com/s/files/1/0196/4330/1988/products/perfil1_26_1024x1024@2x.jpg)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
                <RecipeImgTags imgTags={["Más vendido"]} />
            </CardContent>

            <CardContent>
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
                </Grid>

                <Box display="flex" flexDirection="row">
                    <Button className={visibilityBtn}>
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
    mainTag: PropTypes.string,
    timeTag: PropTypes.string.isRequired,
    difficultyTag: PropTypes.string.isRequired,
    recipeName: PropTypes.string.isRequired,
};

export default RecipeCardBuyFlow;
