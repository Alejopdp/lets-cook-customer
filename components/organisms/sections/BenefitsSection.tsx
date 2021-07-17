import { makeStyles, Box, useTheme, Typography, Container, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { RoundedButton } from "@atoms";
import { useRouter } from "next/router";

import BenefitsCard from "../../molecules/benefits/benefits";
import { useBenefitsStyle as useStyles } from "./styles";
import { Benefit, BenefitsSectionProps } from "./interfaces";

export const BenefitsSection = (props: BenefitsSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    return (
        <Box style={{ backgroundColor: props.backgroundColor ? backgroundColor : "white", padding: `${theme.spacing(8)}px 0px` }}>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} style={{ alignSelf: "center" }}>
                        <div className={classes.imgContainer}>
                            <img className={classes.img} src="/assets/img-beneficios-letscook.jpeg" />
                        </div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {(props.cards || []).map((card, index) => (
                            <div key={index} className={classes.card}>
                                <div className={classes.cardIcon}>
                                    <img src={card.image} className={classes.icon}></img>
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
                            <RoundedButton label="Ver planes" onClick={() => router.push("/planes")} />
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
