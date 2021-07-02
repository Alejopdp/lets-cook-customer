import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    padd6: {
        paddingBottom: theme.spacing(6),
    },
    align: {
        maxWidth: "80vw",
        margin: "0 auto",
    },
}));