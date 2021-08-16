import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    // root: {
    //     top: 0,
    //     position: "absolute",
    //     display: 'flex',
    //     flexDirection: "column"
    // },
    paddingY8: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    paddingX8: {
        paddingLeft: theme.spacing(8),
        paddingRight: theme.spacing(8),
    },
}));