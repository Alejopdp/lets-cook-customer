import { ButtonBase, makeStyles, Typography } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";
import { useLang } from "./../../../hooks";
const useStyles = makeStyles((theme) => ({
    loginButton: {
        width: "100%",
        padding: theme.spacing(1),
        borderRadius: 8,
        margin: `0 auto`,
    },
}));

const LoginButton = ({ border = false, ...props }) => {
    const classes = useStyles();
    const [lang] = useLang("loginButton");
    useEffect(() => {
        console.log('***->',lang)
    }, [])

    return (
        <ButtonBase
            focusRipple
            className={classes.loginButton}
            style={{
                border: border ? "solid 1px gray" : "none",
            }}
        >
            <PersonOutlineRounded style={{ marginRight: 4 }} />
            <Typography variant="button">{lang.singin}</Typography>
        </ButtonBase>
    );
};

export default LoginButton;
