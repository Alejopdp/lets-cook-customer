// Utils & config
import React from "react";

// External components
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@material-ui/core";
import { ExpandMore as ExpandMoreIcon } from "@material-ui/icons";
import { useStyles } from "./styles";
import { SimpleAccordionProps } from "./interfaces";

export const SimpleAccordion = (props: SimpleAccordionProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordionCard}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="primary" fontSize="large" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body1" color="textPrimary">
                        {props.question}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails style={{ flexDirection: "column" }}>
                    {props.answer.split("\n").map((item, key) => {
                        return (
                            <Typography variant="body2" color="textPrimary" style={{ marginBottom: "8px" }}>
                                {item}
                            </Typography>
                        );
                    })}
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default SimpleAccordion;
