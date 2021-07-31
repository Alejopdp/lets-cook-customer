import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary.main,
        },
    },
    selected: {
        color: theme.palette.primary.main,
        borderBottom: "none",
        outline: "none",
    },

    indicator: {
        display: "none",
        borderBottom: "none",
        outline: "none",
    },

    tabWrapper: {
        alignItems: "flex-start",
    },

    tabRoot: {
        paddingLeft: 0,
        paddingRight: 16,
    },
}));
