import PropTypes from 'prop-types';
import { ButtonBase, makeStyles, Typography, useTheme } from "@material-ui/core";
import { PersonOutlineRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 64,
        height: 64,
        // padding: theme.spacing(1),
        borderRadius: "50%",    }
}));

const CircularBotton = ({ variant = "content", label, children: Component, ...props }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ButtonBase
            focusRipple
            className={classes.root}
            focusRipple={true}
            {...props}
            style={{
                border: variant === "outline" ? "solid 1px gray" : "none",
                backgroundColor: variant === "content" ? theme.palette.primary.contrastText : "transparent"
            }}
        >
            <div style={{ margin: `0 auto` }} >
                {Component}
            </div>
            {/* <Typography variant="button" style={{
                color: variant === "content" ? theme.palette.primary.contrastText : "inherit"
            }}>{label}</Typography> */}
        </ButtonBase >
    );
}

CircularBotton.propTypes = {
    vaariant: PropTypes.oneOf(["content", "flat", "outline"]),
    label: PropTypes.string
}

export default CircularBotton;