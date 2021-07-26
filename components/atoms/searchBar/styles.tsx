import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    container: {
        margin: "auto",
        marginBottom: theme.spacing(8),
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(5),
        },
    },
    padd2: {
        paddingBottom: theme.spacing(2),
    },
    align: {
        textAlign: "center",
    },
    searchBar: {
        borderRadius: "8px",
        backgroundColor: "white",
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        // '& fieldset.MuiOutlinedInput-notchedOutline': {
        //     borderColor: 'transparent',
        // },
    },
}));