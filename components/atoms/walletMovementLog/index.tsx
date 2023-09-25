import React from "react";
import { Box, Typography } from "@material-ui/core";
import { getDdMmYyyy } from "helpers/utils/utils";

type WalletMovementLogProps = {
    createdAt: string;
    title: string;
    amount: number;
};

const WalletMovementLog = (props: WalletMovementLogProps) => {
    return (
        <Box display={"flex"} justifyContent={"space-between"} alignContent={"center"} width={"100%"}>
            <Box>
                <Typography variant="subtitle1" color="initial">
                    {getDdMmYyyy(props.createdAt)} - {props.title}
                </Typography>
            </Box>
            <Box visibility={props.amount !== 0 ? "visible" : "hidden"}>
                <Typography variant="subtitle1" color="initial">
                    €{props.amount}
                </Typography>
            </Box>
        </Box>
    );
};

export default WalletMovementLog;
