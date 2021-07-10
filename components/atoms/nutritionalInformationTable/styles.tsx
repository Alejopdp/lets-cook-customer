import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    table: {
        [theme.breakpoints.up("md")]: {
            width: '50%'
        },
    },
}));
