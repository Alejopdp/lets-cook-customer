import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
    appBar: {
        top: "auto",
        bottom: 0,
        backgroundColor: theme.palette.background.paper
    },
    textCenter: {
        textAlign: "center",
    },
    paddingBottom: {
        paddingTop: '16px',
        paddingBottom: '16px',
    },
    recipeSelectedRoot: {
        borderRadius: 4,
        width: 64,
        height: 64,
        marginRight: theme.spacing(2)
    },
    recipeSelectedMock: {
        backgroundColor: theme.palette.grey[500]
    },
    recipeSelected: {
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    },
    marginRight: {
        marginRight: theme.spacing(1),
    },
    gridCta: {
        [theme.breakpoints.down('xs')]: {
            width: '100%'
        },
    },
    recipesQtySelected: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
        },
    },
    gridRecipesQty: {
        [theme.breakpoints.down('xs')]: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2)
        },
    },
    generalContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        [theme.breakpoints.down('xs')]: {
            flexDirection: 'column',
        },
    },
    boxContainer: {
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
        },
    }
}));

export default useStyles;