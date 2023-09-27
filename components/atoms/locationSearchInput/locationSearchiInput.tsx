import React from "react";
import PropTypes from "prop-types";
import { TextField, Grid, Typography, makeStyles } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { LocationSearchInputProps } from "./intertfaces";
import { locationSearchInput as langs } from "@lang";
import { useRouter } from "next/router";

function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement("script");
    script.setAttribute("async", "");
    script.setAttribute("id", id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
    root: {
        "& label.MuiFormLabel-root": {
            fontSize: "16px",
        },
        "& div.MuiInputBase-root": {
            borderRadius: "8px",
            fontSize: "16px",
            paddingRight: "0px",
        },
    },
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
    autocompleteRoot: {
        width: "100%",
    },

    endAdornment: {
        display: "none",
    },
}));

const LocationSearchInput = (props: LocationSearchInputProps) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);
    const router = useRouter();
    const lang = langs[router.locale];

    if (typeof window !== "undefined" && !loaded.current) {
        if (!document.querySelector("#google-maps")) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&components=country:sp&strictbounds=true&libraries=places`,
                document.querySelector("head"),
                "google-maps"
            );
        }

        loaded.current = true;
    }

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current.getPlacePredictions(
                    {
                        ...request,
                        componentRestrictions: {
                            country: process.env.NEXT_PUBLIC_FRONTEND_DOMAIN !== "letscooknow.es" ? ["es", "pt"] : "es",
                        },
                    },
                    callback
                );
            }, 200),
        []
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current && window.google!) {
            autocompleteService.current = new window.google!.maps.places.AutocompleteService();
        }
        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === "") {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [props.value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google-map-demo"
            classes={{ endAdornment: classes.endAdornment, root: classes.autocompleteRoot }}
            fullWidth
            getOptionLabel={(option) => (typeof option === "string" ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            // autoComplete
            includeInputInList
            filterSelectedOptions
            value={props.value}
            disabled={props.disabled}
            noOptionsText={!!props.value ? lang.autoCompleteHintNotFound : lang.autoCompleteHint}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
                props.handleChange(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => {
                const inputProps = params.inputProps;
                inputProps.autoComplete = "no";

                return (
                    <TextField
                        {...params}
                        type="text"
                        name={props.name}
                        classes={{ root: classes.root }}
                        label={props.label}
                        variant="outlined"
                        fullWidth
                        disabled={props.disabled}
                        autoComplete="no"
                        inputProps={inputProps}
                    />
                );
            }}
            renderOption={(option) => {
                var matches;
                var parts;
                if (option) {
                    matches = option.structured_formatting.main_text_matched_substrings;
                    parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length])
                    );
                }

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts?.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option?.structured_formatting.secondary_text || ""}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
};

LocationSearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    handleChange: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default LocationSearchInput;
