import { makeStyles } from "@material-ui/core";

export const useValuePropositionStyle = makeStyles((theme) => ({
    root: {
        minHeight: "65vh",
        backgroundImage: "url(/assets/img-background-proposition-section.jpeg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        minHeight: "65vh",
        paddingTop: 64,
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        },
    },
    container: {
        marginTop: theme.spacing(10),
        [theme.breakpoints.down('xs')]: {
            marginTop: '0px'
        },
    },
    buttonWithCaptionGrid: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(4)
    },
    marginTop2: {
        marginTop: theme.spacing(1)
    }
}));