import { makeStyles, Box, useTheme, Typography, Container, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";
import BenefitsCard from "../../molecules/benefits/benefits";
import { useBenefitsStyle as useStyles } from "./styles";
import { Benefit, BenefitsSectionProps } from "./interfaces";
import TitleOtherPages from "components/molecules/titleOtherPages/titleOtherPages";
import * as ga from '../../../helpers/ga'

export const BenefitsSection = (props: BenefitsSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    const goToPlans = () => {
        ga.event({
            action: "clic en me interesa",
            params: {
                event_category: 'homepage',
                event_label: 'beneficios lets cook',
            }
        })
        router.push("/planes")
    }

    return (
        <Box style={{ backgroundColor: props.backgroundColor ? props.backgroundColor : "white", padding: `${theme.spacing(8)}px 0px` }}>
            <Container maxWidth="lg">
                {props.enableTitleSection && (
                    <TitleOtherPages title="Beneficios de Let's Cook" subtitle='...' />
                )}
                <Grid container spacing={2}>
                    <Grid item xs={12} md={5} style={{ alignSelf: "center" }}>
                        <img className={classes.img} src="/assets/home/home-atributos.jpg" alt='atributos' />
                    </Grid>
                    <Grid item xs={12} md={7} style={{ alignSelf: 'center' }}>
                        {(Array.isArray(props.cards) ? props.cards : []).map((card, index) => (
                            <div key={index} className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src={card.image} alt={card.title} className={classes.icon} />
                                </div>
                                <div>
                                    <Typography variant="h5" color="textSecondary" style={{ marginBottom: theme.spacing(1) }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary">
                                        {card.content}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </Grid>
                </Grid>
                {!props.removeCallToAction && (
                    <Grid container style={{ marginTop: theme.spacing(4) }}>
                        <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                            <RoundedButton label="Me interesa" onClick={goToPlans} />
                            <Typography className={classes.smallText} variant="caption">
                                Podrás pausar, cambiar o cancelar el plan cuando quieras
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default BenefitsSection;
