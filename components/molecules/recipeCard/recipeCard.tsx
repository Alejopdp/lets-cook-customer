// Utils & Config
import React from "react";
import { useStyles } from "./styles";
import clsx from "clsx";

// Internal Components
import { RecipeImgTags } from "@atoms";

// External components
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { RecipeCardProps } from "./interface";
// Icons & Images
import TimerIcon from "@material-ui/icons/Timer";
import SpeedIcon from "@material-ui/icons/Speed";
import { useLang } from "@hooks";
import Image from "next/image";

export const RecipeCard = (props: RecipeCardProps) => {
    const { root, imgTag, tag, marg, textWhite, gradient, titleText, borderRadius } = useStyles();
    const [lang] = useLang("buyFlowLayout");

    return (
        <div
            className={gradient}
            style={{
                position: "relative",
                cursor: "pointer",
                borderRadius: "8px",
                ...props.style,
            }}
            onClick={props.handleClickOpenModal}
        >
            <Image
                src={props.img}
                alt={props.recipeName}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
                className={borderRadius}
                unoptimized
            />
            <Card className={root}>
                <CardContent style={{ height: "20%" }}>
                    <RecipeImgTags imgTags={props.imgTags} />
                </CardContent>

                <CardContent style={{ height: "80%", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <Grid container>
                        <Grid item className={tag}>
                            <Image src={"/time.png"} width={17} height={15} />
                            <Typography variant="subtitle2" style={{ fontSize: "13px", marginLeft: 8 }}>
                                {props.timeTag}
                            </Typography>
                        </Grid>

                        <Grid item className={tag}>
                            <Image src={"/dificultad.png"} width={17} height={15} />
                            <Typography variant="subtitle2" style={{ fontSize: "13px", marginLeft: 8 }}>
                                {props.difficultyTag === "Facil"
                                    ? lang.itemEasy
                                    : props.difficultyTag === "Dificil"
                                    ? lang.itemHard
                                    : lang.itemMedium}
                            </Typography>
                        </Grid>
                    </Grid>

                    <Typography variant="h6" className={clsx(titleText, textWhite)}>
                        {props.recipeName}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
};

export default RecipeCard;
