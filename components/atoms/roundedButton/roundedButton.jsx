import PropTypes from 'prop-types';
import { ButtonBase, makeStyles, Typography, useTheme } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    loginButton: {
        minWidth: 150,
        padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
        borderRadius: 50,
        margin: `0 auto`,
    }
}));

const RoundedButton = ({ variant = "content", label, children: Component, ...props }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ButtonBase
            focusRipple
            className={classes.loginButton}
            focusRipple={true}
            {...props}
            style={{
                border: variant === "outline" ? "solid 1px gray" : "none",
                backgroundColor: variant === "content" ? theme.palette.primary.main : "transparent"
            }}
        >
            <div style={{ marginRight: 4 }} >
                {Component}
            </div>
            <Typography variant="button" style={{
                color: variant === "content" ? theme.palette.primary.contrastText : "inherit"
            }}>{label}</Typography>
        </ButtonBase >
    );
}

RoundedButton.propTypes = {
    vaariant: PropTypes.oneOf(["content", "flat", "outline"]),
    label: PropTypes.string
}

export default RoundedButton;