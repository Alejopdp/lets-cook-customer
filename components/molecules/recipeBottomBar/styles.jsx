import { makeStyles } from "@material-ui/core";
export const useStyles = makeStyles((theme) => ({
    appBar: {
        top: "auto",
        bottom: 0,
    },
    textCenter: {
        textAlign: "center",
    },
    paddingBottom: { paddingBottom: 16 },
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
        marginRight: theme.spacing(2),
    }
}));
export default useStyles;
