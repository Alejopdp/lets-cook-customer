import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";

import { useHowItWorksStyles as useStyles } from "./styles";
import { HowItWorksSectionProps } from "./interfaces";
import { memo } from "react";
import SectionTitleBuyFlow from "../../molecules/sectionTitleBuyFlow/sectionTitleBuyFlow";
import { useLang } from "@hooks";

const HowItWorksSubsection = memo((props: HowItWorksSectionProps) => {
    const classes = useStyles();
    const [lang] = useLang("bonoRegalo");

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SectionTitleBuyFlow
                        title={lang.landing.howItWorksSubsection.sectionTitleBuyFlow.title}
                        subtitle={lang.landing.howItWorksSubsection.sectionTitleBuyFlow.subtitle}
                    />
                </Grid>
                {(props.cards || []).map((card, index) => (
                    <Grid key={index} item xs={12} sm={6} md={3} style={{ textAlign: "center" }}>
                        <img className={classes.img} src={card.image} />
                        <Typography className={classes.paddingCardTitle} variant="subtitle1" color="initial">
                            {card.title}
                        </Typography>
                        <Typography variant="body2" color="initial">
                            {card.content}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
});

export default HowItWorksSubsection;
