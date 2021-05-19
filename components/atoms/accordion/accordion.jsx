// Utils & config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// External components
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        paddingTop: theme.spacing(2),
    },
    accordionCard: {
        borderRadius: "15px !important",
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
    }
}));

const SimpleAccordion = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Accordion className={classes.accordionCard}>
                <AccordionSummary
                    expandIcon={
                        <ExpandMoreIcon color="error" fontSize="large" />
                    }
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

SimpleAccordion.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
};

export default SimpleAccordion;
