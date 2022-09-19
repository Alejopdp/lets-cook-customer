import { ButtonBase, useTheme } from "@material-ui/core";
import { useStyles } from "./styles";
import { CircularBottonProps } from "./interfaces";

export const CircularBotton = (props: CircularBottonProps) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ButtonBase
            className={classes.root}
            focusRipple
            {...props}
            style={{
                border: props.variant === "outline" ? "solid 1px gray" : "none",
                backgroundColor: props.variant === "content" ? theme.palette.primary.contrastText : "transparent",
            }}
        >
            <div style={{ margin: `0 auto` }}>{props.children}</div>
        </ButtonBase>
    );
};

export default CircularBotton;
