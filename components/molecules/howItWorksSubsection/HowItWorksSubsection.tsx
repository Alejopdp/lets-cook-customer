import Typography from "@material-ui/core/Typography";
import { useTheme, Container, Grid } from "@material-ui/core";
import Title from "../../molecules/titleOtherPages/titleOtherPages";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";

import { useHowItWorksStyles as useStyles } from "./styles";
import { HowItWorksSectionProps, HowItWorks } from "./interfaces";
import { memo } from "react";
import SectionTitleBuyFlow from '../../molecules/sectionTitleBuyFlow/sectionTitleBuyFlow';


const HowItWorksSubsection = memo((props: HowItWorksSectionProps) => {
    const theme = useTheme();
    const classes = useStyles();
    const router = useRouter();

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SectionTitleBuyFlow
                        title="¿Cómo funciona?"
                        subtitle="Lorem impus daenet sim se dae"
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
