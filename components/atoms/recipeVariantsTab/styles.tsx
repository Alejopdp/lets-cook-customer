import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.main
        }
    },

}));