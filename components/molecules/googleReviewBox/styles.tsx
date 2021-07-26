import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(theme => ({
    reviewBox: {
        borderRadius: "8px",
        padding: theme.spacing(3),
        backgroundColor: theme.palette.background.paper,
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        marginRight: '16px'
    },
    avatarLarge: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    item: {
        marginRight: theme.spacing(1),
    },
    flexCenter: {
        display: 'flex',
        alignItems: 'center'
    },
    marginLeft2: {
        marginLeft: theme.spacing(2)
    }
}));