import { makeStyles, Box, useTheme, Typography, Container, Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import { RoundedButton } from "@atoms";

import BenefitsCard from "../../molecules/benefits/benefits";
import { useBenefitsStyle as useStyles } from "./styles";
import { Benefit, BenefitsSectionProps } from "./interfaces";

export const BenefitsSection = (props: BenefitsSectionProps) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Box style={{ backgroundColor: "white", padding: `${theme.spacing(8)}px 0px` }}>
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
                                    <Typography variant="subtitle1" color="initial">
                                        {card.title}
                                    </Typography>
                                    <Typography variant="body1" color="initial">
                                        {card.content}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </Grid>
                </Grid>
                <Grid container style={{ marginTop: theme.spacing(4) }}>
                    <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
                        <RoundedButton label="Ver planes" />
                        <Typography className={classes.smallText} variant="caption">
                            Podrás pausar, cambiar o cancelar el plan cuando quieras
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default BenefitsSection;
