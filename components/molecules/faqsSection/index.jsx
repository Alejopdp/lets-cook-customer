

import React from 'react'
import { Divider, Grid, Typography, useTheme, Container } from "@material-ui/core";
import { SimpleAccordion } from "@atoms";
import SectionTitleBuyFlow from "components/molecules/sectionTitleBuyFlow/sectionTitleBuyFlow";

const FaqsSection = (props) => {

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SectionTitleBuyFlow
                        title="Preguntas frecuentes"
                        subtitle="¿Necesitas ayuda? Revisa nuestras preguntas frecuentes o consulta en nuestro chat"
                    />
                    <Grid item xs={12} sm={8} style={{ margin: `0px auto 0px auto` }}>
                        <Grid container spacing={2}>
                            {props.faqs.map((faq, index) => (
                                <Grid item xs={12}>
                                    <SimpleAccordion question={faq.question} answer={faq.answer} key={index} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FaqsSection;
