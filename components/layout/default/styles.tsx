import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: "column"
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: 250,
            flexShrink: 0,
        },
    },
    drawerPaper: {
        width: 250,
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        position: "relative",
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    menuLogginButton: {
        padding: theme.spacing(2),
        width:'100%',
    },
    logo: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        [theme.breakpoints.up('sm')]: {
            justifyContent: "right",
        }
    },
    navbarClass: {
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.1)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.1)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.1)',
    }
}));
