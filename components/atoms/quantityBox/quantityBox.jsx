// Utils & Config
import useStyles from "./styles";
import clsx from "clsx";
import PropTypes from "prop-types";

// External components
import Typography from "@material-ui/core/Typography";

const QuantityBox = ({ name, label = "", value = "", state = false, onChange }) => {
    const ID = Math.random() * Date.now();
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <input
                id={label + name +'-id-1000'}
                type="radio"
                name={name || value || label || ID}
                value={value}
                checked={state}
                onChange={() => onChange(value)}
                className={classes.hidden}
            />
            <label
                htmlFor={label + name + '-id-1000'}
                className={clsx(classes.box, {
                    [classes.checkedBox]: state,
                })}
            >
                <Typography variant="subtitle1" color={state ? "primary" : "initial"}>
                    {label}
                </Typography>
            </label>
        </div>
    );
};

QuantityBox.propTypes = {
    label: PropTypes.string.isRequired,
    state: PropTypes.bool.isRequired,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
};

QuantityBox.defaultProps = {
    name: "",
    label: "",
    value: "",
    state: false,
};

export default QuantityBox;
