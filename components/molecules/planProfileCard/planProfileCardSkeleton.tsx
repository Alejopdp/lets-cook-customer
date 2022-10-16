// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

// Internal components
import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: any) => ({
    box: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        boxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        webkitBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        mozBoxShadow: "0px 3px 16px 0px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        overflowWrap: "anywhere",
        padding: theme.spacing(2),
        height: 250,
    },
}));

const PlanProfileCardSkeleton = ({ plan, lang }) => {
    const theme = useTheme();
    const classes = useStyles();

    return (
        <Box className={clsx(classes.box)}>
            <div style={{ display: "flex", width: "100%", flexDirection: "row", alignItems: "center" }}>
                <Skeleton variant="circle" height={64} width={64} style={{ marginRight: theme.spacing(2) }} />
                <Skeleton variant="rect" width="100%" />
            </div>
            <div style={{ marginBottom: theme.spacing(2), marginTop: theme.spacing(1), width: "100%" }}>
                <Skeleton variant="text" width="80%" height={24} />
            </div>
            <div style={{ width: "100%" }}>
                <Skeleton variant="text" width="80%" height={24} />
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", width: "100%" }}>
                <Skeleton variant="text" width="80%" height={24} />
            </div>
        </Box>
    );
};

export default PlanProfileCardSkeleton;
