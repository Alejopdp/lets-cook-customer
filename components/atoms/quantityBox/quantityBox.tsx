// Utils & Config
import useStyles from "./styles";
import clsx from "clsx";

// External components
import Typography from "@material-ui/core/Typography";
import { QuantityBoxProps } from './interfaces';

export const QuantityBox = (props: QuantityBoxProps) => {
    const ID = `${Math.random() * Date.now()}`;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                id={props.label + props.name +'-id-1000'}
                type="radio"
                name={props.name || props.value || props.label || ID}
                value={props.value}
                checked={props.state}
                onChange={() => props.onChange(props.value)}
                className={classes.hidden}
            />
            <label
                htmlFor={props.label + props.name + '-id-1000'}
                className={clsx(classes.box, {
                    [classes.checkedBox]: props.state,
                })}
            >
                <Typography variant="subtitle1" color={props.state ? "primary" : "initial"}>
                    {props.label}
                </Typography>
            </label>
        </div>
    );
};

export default QuantityBox;
