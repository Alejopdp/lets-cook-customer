import { makeStyles } from "@material-ui/core";

export const useValuePropositionStyle = makeStyles((theme) => ({
    root: {
        minHeight: "75vh",
        [theme.breakpoints.down('sm')]: {
            backgroundImage: "url(/assets/home/home-principal-mobile.jpg)",
        },
        backgroundImage: "url(/assets/home/home-principal-desktop.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    overlay: {
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        minHeight: "75vh",
        paddingTop: 64,
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
    },
    container: {
        margin: 'auto'
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

export const useBenefitsStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto"
    },

    row: {
        display: "flex",
        paddingBottom: theme.spacing(3)
    },
    imgContainer: {
        justifyContent: "center",
        boxSizing: "border-box",
        display: "flex"
    },
    img: {
        display: "flex",
        flex: 1,
        borderRadius: 8,
        width: "100%",
        maxWidth: 450,
        [theme.breakpoints.down("sm")]: {
            maxWidth: 375,
            margin: '0px auto 24px auto '
        },
    },
    smallText: {
        paddingTop: theme.spacing(1),
        textAlign: "center"
    },
    card: {
        flexDirection: "row",
        display: "flex",
        alignItems: "flex-start",
        padding: theme.spacing(2),
        [theme.breakpoints.down("md")]: {
            padding: `${theme.spacing(2)}px 0px`,
        },
    },
    cardIcon: {
        // marginLeft: theme.spacing(1),
        marginRight: theme.spacing(2)
    },
    icon: {
        width: 32,
        height: 32
    }

}));


export const useCallToActionStyle = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url(/assets/img-call-to-action-background.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        backgroundColor: theme.palette.background.paper
    },
    smallText: {
        paddingTop: theme.spacing(1),
    },
    title: {},
    subtitle: {}
}));

export const useGoogleRatingStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: 72,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2)
    },
    item: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    img: {
        height: 40
    },
    googleRatingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down("sm")]: {
            justifyContent: 'center',
        },
    },
    textRatingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down("sm")]: {
            justifyContent: 'center',
        },
    }

}))

export const useHowItWorksStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(3)
    },
    card: {
        width: 260,
        boxSizing: "border-box",
        paddingInline: theme.spacing(1),
        // margin: theme.spacing(1),
        textAlign: "center",
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(3),
        },
    },
    img: {
        borderRadius: 8,
        width: "100%",
    },
    paddingCardTitle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    smallText: {
        paddingTop: theme.spacing(1),
        textAlign: "center"
    },
    gridCard: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(4)
        },
    }
}));

export const usePlansStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
    },
    row: {
        display: "flex",
        justifyContent: "center",
        paddingBottom: theme.spacing(3)
    },
    card: {
        display: "flex",
        // width: 260,
        height: 400,
        boxSizing: "border-box",
        // marginLeft: theme.spacing(1),
        // marginRight: theme.spacing(1),
        textAlign: "center",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        borderRadius: 8
    },
    overlay: {
        display: "flex",
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        boxSizing: "border-box",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        textAlign: "center",
        color: theme.palette.primary.contrastText,
        borderRadius: 8,
        padding: theme.spacing(1),
    },
    cardContent: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        padding: theme.spacing(2),
        paddingTop: theme.spacing(4),
        textAlign: "left"
    },
    cardAction: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    img: {},
    paddingCardTitle: {},
    title: {},
    content: {},

}));

export const useRecipesStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    rootCenter: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    title: {
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6)
    },
    smallText: {
        paddingTop: theme.spacing(1),
    },
    carrusel: {
        height: 300,
        maxWidth: "100vw",
        overflow: "hidden",
        overflowX: "scroll",
        justifyContent: "flex-start",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4)
    }
}));

export const useReviewsStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: 72,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: theme.spacing(2)
    },
    item: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    img: {
        height: 40
    },
    googleRatingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        [theme.breakpoints.down("sm")]: {
            justifyContent: 'center',
        },
    },
    textRatingRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down("sm")]: {
            justifyContent: 'center',
        },
    }

}))