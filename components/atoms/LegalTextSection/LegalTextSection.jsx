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
                <Typography variant="subtitle1">{lang.firstParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.firstParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.firstParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">
                    {lang.firstParagraph.adress} <br />
                    Passeig de Sant Joan, 93 <br />
                    08009 Barcelona <br />{lang.firstParagraph.email} info@letscooknow.es <br />
                </Typography>

                {/* Párrafo 2 */}
                <Typography variant="subtitle1">{lang.secondParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.secondParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.secondParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.secondParagraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.secondParagraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.secondParagraph.paragraph5}</Typography>

                {/* Párrafo 3 */}
                <Typography variant="subtitle1">{lang.thirdParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph5}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph6}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph7}</Typography>
                <Typography paragraph variant="body1">{lang.thirdParagraph.paragraph8}</Typography>

                {/* Párrafo 4 */}
                <Typography variant="subtitle1">{lang.fourthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.fourthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.fourthParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.fourthParagraph.paragraph3}</Typography>

                {/* Párrafo 5 */}
                <Typography variant="subtitle1">{lang.fifthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.fifthParagraph.paragraph1}</Typography>

                {/* Párrafo 6 */}
                <Typography variant="subtitle1">{lang.sixthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.sixthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.sixthParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.sixthParagraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.sixthParagraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.sixthParagraph.paragraph5}</Typography>

                {/* Párrafo 7 */}
                <Typography variant="subtitle1">{lang.seventhParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.seventhParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">
                    {lang.seventhParagraph.adress} <br />
                    Passeig de Sant Joan, 93 <br />
                    08009 Barcelona <br />{lang.seventhParagraph.email} info@letscooknow.es <br />
                </Typography>

                {/* Párrafo 8 */}
                <Typography variant="subtitle1">{lang.eighthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.eighthParagraph.paragraph1}</Typography>

                {/* Párrafo 9 */}
                <Typography variant="subtitle1">{lang.ninthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph5}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph6}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph7}</Typography>
                <Typography paragraph variant="body1">{lang.ninthParagraph.paragraph8}</Typography>

                {/* Párrafo 10 */}
                <Typography variant="subtitle1">{lang.tenthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.tenthParagraph.paragraph1}</Typography>

                {/* Párrafo 11 */}
                <Typography variant="subtitle1">{lang.eleventhParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.eleventhParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.eleventhParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.eleventhParagraph.paragraph3}</Typography>

                {/* Párrafo 12 */}
                <Typography variant="subtitle1">{lang.twelfthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twelfthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twelfthParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twelfthParagraph.paragraph3}</Typography>

                {/* Párrafo 13 */}
                <Typography variant="subtitle1">{lang.thirteenthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.thirteenthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.thirteenthParagraph.paragraph2}</Typography>

                {/* Párrafo 14 */}
                <Typography variant="subtitle1">{lang.fourteenthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.fourteenthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.fourteenthParagraph.paragraph2}</Typography>

                {/* Párrafo 15 */}
                <Typography variant="subtitle1">{lang.fifteenthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.fifteenthParagraph.paragraph1}</Typography>

                {/* Párrafo 16 */}
                <Typography variant="subtitle1">{lang.sixteenthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.sixteenthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.sixteenthParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.sixteenthParagraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.sixteenthParagraph.paragraph4}</Typography>

                {/* Párrafo 17 */}
                <Typography variant="subtitle1">{lang.seventeenthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph5}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph6}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph7}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph8}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph9}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph10}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph11}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph12}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph13}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph14}</Typography>
                <Typography paragraph variant="body1">{lang.seventeenthParagraph.paragraph15}</Typography>
                <Typography paragraph variant="body1">
                    {lang.firstParagraph.adress} <br />
                    Passeig de Sant Joan, 93 <br />
                    08009 Barcelona <br />{lang.firstParagraph.email} info@letscooknow.es <br />
                </Typography>

                {/* Párrafo 18 */}
                <Typography variant="subtitle1">{lang.eighthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.eighthParagraph.paragraph1}</Typography>

                {/* Párrafo 19 */}
                <Typography variant="subtitle1">{lang.nineteenthParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.nineteenthParagraph.paragraph1}</Typography>

                {/* Párrafo 20 */}
                <Typography variant="subtitle1">{lang.twentiethParagraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twentiethParagraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twentiethParagraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twentiethParagraph.paragraph3}</Typography>

                {/* Párrafo 21 */}
                <Typography variant="subtitle1">{lang.twenty1Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty1Paragraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twenty1Paragraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twenty1Paragraph.paragraph3}</Typography>

                {/* Párrafo 22 */}
                <Typography variant="subtitle1">{lang.twenty2Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty2Paragraph.paragraph1}</Typography>

                {/* Párrafo 23 */}
                <Typography variant="subtitle1">{lang.twenty3Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty3Paragraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twenty3Paragraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twenty3Paragraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.twenty3Paragraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.twenty3Paragraph.paragraph5}</Typography>

                {/* Párrafo 24 */}
                <Typography variant="subtitle1">{lang.twenty4Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty4Paragraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twenty4Paragraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twenty4Paragraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.twenty4Paragraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.twenty4Paragraph.paragraph5}</Typography>
                <Typography paragraph variant="body1">{lang.twenty4Paragraph.paragraph6}</Typography>
                <Typography paragraph variant="body1">{lang.twenty4Paragraph.paragraph7}</Typography>

                {/* Párrafo 25 */}
                <Typography variant="subtitle1">{lang.twenty5Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty5Paragraph.paragraph1}</Typography>

                {/* Párrafo 26 */}
                <Typography variant="subtitle1">{lang.twenty6Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty6Paragraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twenty6Paragraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twenty6Paragraph.paragraph3}</Typography>

                {/* Párrafo 27 */}
                <Typography variant="subtitle1">{lang.twenty7Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph3}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph4}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph5}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph6}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph7}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph8}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph9}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph10}</Typography>
                <Typography paragraph variant="body1">{lang.twenty7Paragraph.paragraph11}</Typography>

                {/* Párrafo 28 */}
                <Typography variant="subtitle1">{lang.twenty8Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty8Paragraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twenty8Paragraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twenty8Paragraph.paragraph3}</Typography>

                {/* Párrafo 29 */}
                <Typography variant="subtitle1">{lang.twenty9Paragraph.subtitle}</Typography>
                <Typography paragraph variant="body1">{lang.twenty9Paragraph.paragraph1}</Typography>
                <Typography paragraph variant="body1">{lang.twenty9Paragraph.paragraph2}</Typography>
                <Typography paragraph variant="body1">{lang.twenty9Paragraph.paragraph3}</Typography>
            </Grid>
        </Grid>
    );
};

export default LegalTextSection;
