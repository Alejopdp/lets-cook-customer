// Utils & Config
import useStyles from "./styles";
import clsx from "clsx";

// External components
import { Typography } from "@material-ui/core";
import { QuantityBoxProps } from "./interfaces";

export const QuantityBox = (props: QuantityBoxProps) => {
    const ID = `${Math.random() * Date.now()}`;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                id={props.idForHtml}
                type="radio"
                name={props.name || props.value || props.label || ID}
                value={props.value}
                checked={props.state}
                onChange={() => props.onChange(props.value)}
                className={classes.hidden}
            />
            <label
                htmlFor={props.idForHtml}
                className={clsx(props.size === "sm" ? classes.boxSmall : classes.box, {
                    [classes.checkedBox]: props.state,
                })}
            >
                <Typography
                    variant="subtitle1"
                    color={props.state ? "primary" : "textPrimary"}
                    style={{ fontSize: props.size === "sm" ? 12 : 16 }}
                >
                    {props.label}
                </Typography>
            </label>
        </div>
    );
};

export default QuantityBox;
