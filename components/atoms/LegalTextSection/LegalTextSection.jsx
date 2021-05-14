// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";
const langs = require("../../../lang").LegalTextSection;

// External components
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    padd6: {
        paddingBottom: theme.spacing(6),
    },
    align: {
        maxWidth: "80vw",
        margin: "0 auto",
    },
}));

const LegalTextSection = () => {
    const classes = useStyles();
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <Grid
            container
            direction="column"
            className={clsx(classes.padd6, classes.align)}
        >
            <Grid item>
                {/* Párrafo 1 */}
                <Typography variant="subtitle1">
                    {lang.firstParagraph.subtitle}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.firstParagraph.paragraph1}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.firstParagraph.paragraph2}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.firstParagraph.adress} <br />
                    Passeig de Sant Joan, 93 <br />
                    08009 Barcelona <br />
                    {lang.firstParagraph.email} info@letscooknow.es <br />
                </Typography>

                {/* Párrafo 2 */}
                <Typography variant="subtitle1">
                    {lang.secondParagraph.subtitle}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.secondParagraph.paragraph1}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.secondParagraph.paragraph2}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.secondParagraph.paragraph3}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.secondParagraph.paragraph4}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.secondParagraph.paragraph5}
                </Typography>

                {/* Párrafo 3 */}
                <Typography variant="subtitle1">
                    {lang.thirdParagraph.subtitle}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph1}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph2}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph3}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph4}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph5}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph6}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph7}
                </Typography>
                <Typography paragraph variant="body1">
                    {lang.thirdParagraph.paragraph8}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default LegalTextSection;
