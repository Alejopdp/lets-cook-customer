// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

// External Components
import Modal from "../../atoms/modal/modal";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { SkippableOrder, SkipPlanModalProps } from "components/organisms/planDetails/interfaces";

const useStyles = makeStyles((theme) => ({
    generalBoxStyle: {
        height: "100px",
        padding: theme.spacing(3),
        borderRadius: "8px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        cursor: "pointer",
    },
    activeWeek: {
        backgroundColor: "white",
        color: theme.palette.text.secondary,
        border: "1px solid rgba(0,0,0,0.1)",
    },
    skippedWeek: {
        backgroundColor: theme.palette.secondary.main,
        color: "white",
    },
}));

const SkipPlanModal = (props: SkipPlanModalProps) => {
    const classes = useStyles();
    const theme = useTheme();

    console.log("QUIE ME LLEGA EN SKIPPLANMODAL: ", props.data);

    const [weeksStore, setWeeksStore] = useState<SkippableOrder[]>([]);

    useEffect(() => {
        setWeeksStore(props.data);
    }, [props.open]);

    const skipWeek = (id: string) => {
        let weekIndexSelected = weeksStore.findIndex((week) => week.id === id);
        let weekToModify = weeksStore[weekIndexSelected];
        weekToModify["isSkipped"] = !weekToModify["isSkipped"];
        setWeeksStore([...weeksStore.slice(0, weekIndexSelected), weekToModify, ...weeksStore.slice(weekIndexSelected + 1)]);
    };

    const submitSkippedWeeks = () => {
        props.handlePrimaryButtonClick(weeksStore);
    };

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={submitSkippedWeeks}
            title="Saltar semana"
            primaryButtonText="guardar cambios"
            secondaryButtonText="cancelar"
            fullScreen={true}
            maxWidth="lg"
        >
            <Grid container spacing={2}>
                {weeksStore.map((week, index) => (
                    <Grid key={week.id} item xs={6} sm={3}>
                        <Box
                            className={clsx(classes.generalBoxStyle, week.isSkipped ? classes.skippedWeek : classes.activeWeek)}
                            onClick={() => skipWeek(week.id)}
                        >
                            <Typography
                                variant="subtitle2"
                                align="center"
                                style={{ fontWeight: 600, fontSize: "16px", marginBottom: theme.spacing(0.5) }}
                            >
                                {week.weekLabel}
                            </Typography>
                            <Typography variant="subtitle2" style={{ fontWeight: 700, fontSize: "14px", textTransform: "uppercase" }}>
                                {week.isSkipped ? "reanudar" : "saltar"}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Modal>
    );
};

export default SkipPlanModal;
