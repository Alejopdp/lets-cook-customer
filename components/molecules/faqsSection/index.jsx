import React from "react";
import { Grid, Container } from "@material-ui/core";
import { SimpleAccordion } from "@atoms";
import SectionTitleBuyFlow from "components/molecules/sectionTitleBuyFlow/sectionTitleBuyFlow";
import { useLang } from "@hooks";

const FaqsSection = (props) => {
    const [lang] = useLang("bonoRegalo");

    return (
        <Container maxWidth="lg">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <SectionTitleBuyFlow
                        title={lang.landing.sectionTitleBuyFlow.title}
                        subtitle={lang.landing.sectionTitleBuyFlow.subtitle}
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
