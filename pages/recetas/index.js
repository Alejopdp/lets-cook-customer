// Utils & Config
import React from "react";
import { useRouter } from "next/router";
const langs = require("../../lang").recetas;

// External components
import Grid from "@material-ui/core/Grid";

// Internal Components
import TitleOtherPages from "../../components/molecules/titleOtherPages/titleOtherPages";
import ReceiptCard from "../../components/molecules/receiptCard/receiptCard";

const Recetas = () => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <div>
            <TitleOtherPages title={lang.title} subtitle={lang.subtitle} />

            <Grid
                container
                direction="row"
                justify="center"
                alignItems="flex-start"
                spacing={1}
            >
                <Grid item>
                    <ReceiptCard
                        mainTag={"Más vendido"}
                        timeTag={"15 min"}
                        difficultyTag={"Fácil"}
                        recipeName={"Salmón con quinoa"}
                    />
                </Grid>

                <Grid item>
                    <ReceiptCard
                        mainTag={"Más vendido"}
                        timeTag={"15 min"}
                        difficultyTag={"Fácil"}
                        recipeName={"Salmón con quinoa"}
                    />
                </Grid>

                <Grid item>
                    <ReceiptCard
                        mainTag={"Más vendido"}
                        timeTag={"15 min"}
                        difficultyTag={"Fácil"}
                        recipeName={"Salmón con quinoa"}
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default Recetas;
