// Utils & config
import React from "react";

// External components
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useStyles } from "./styles";
import { SimpleAccordionProps } from "./interfaces";

export const SimpleAccordion = (props: SimpleAccordionProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordionCard}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon color="disabled" fontSize="large" />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="body1" color="textSecondary">
                        {props.question}
                    </Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <Typography variant="body2" color="textSecondary">
                        {props.answer}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
};

export default SimpleAccordion;
