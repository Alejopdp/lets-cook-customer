import React from "react";
import { withStyles, useTheme } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import KeyboardArrowDown from "@material-ui/icons/KeyboardArrowDown";
import Input from "../couponInput/couponInput";
import { CouponInputAccordionProps } from "./interface";

const Accordion = withStyles({
    root: {
        padding: 0,
        boxShadow: "none",
        "&:not(:last-child)": {
            borderBottom: 0,
        },
        "&:before": {
            display: "none",
        },
        "&$expanded": {
            margin: "auto",
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        marginBottom: -1,
        minHeight: 56,
        padding: 0,
        "&$expanded": {
            minHeight: 56,
        },
    },
    content: {
        "&$expanded": {
            margin: "12px 0",
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: 0,
    },
}))(MuiAccordionDetails);

export default function CustomizedAccordions(props: CouponInputAccordionProps) {
    const [expanded, setExpanded] = React.useState("");
    const [couponValue, setcouponValue] = React.useState("");
    const theme = useTheme();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div>
            <Accordion square expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
                <AccordionSummary expandIcon={<KeyboardArrowDown />} aria-controls="panel1d-content" id="panel1d-header">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box display="flex" alignItems="center">
                            <ConfirmationNumber style={{ marginRight: theme.spacing(1) }} />
                            <Typography variant='body1' style={{ fontWeight: 500, fontSize:'16px' }}>{props.text}</Typography>
                        </Box>
                        {/* <KeyboardArrowDown /> */}
                    </Box>
                </AccordionSummary>
                <AccordionDetails>
                    <Input
                        value={couponValue}
                        onChange={(e) => setcouponValue(e.target.value)}
                        name="Coupon"
                        handleSubmit={() => props.handleSubmit(couponValue)}
                    />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
