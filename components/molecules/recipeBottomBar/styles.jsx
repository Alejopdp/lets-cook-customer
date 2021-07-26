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
    }
}));
export default useStyles;
