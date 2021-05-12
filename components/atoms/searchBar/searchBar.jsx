// Utils & Config
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// External components
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    padd2: {
        paddingBottom: theme.spacing(2),
    },
    align: {
        textAlign: "center",
    },
    searchBar: {
        borderRadius: "15px",
        backgroundColor: "white",
        width: "60vw",
    },
}));

const SearchBar = () => {
    const classes = useStyles();

    return (
        <Grid container direction="column" alignItems="center" className={clsx(classes.padd2, classes.align)}>
            <Grid item xs={12} sm={12}>
                <FormControl variant="outlined">
                    <OutlinedInput
                        className={classes.searchBar}
                        placeholder="Buscar preguntas..."
                        startAdornment={
                            <InputAdornment position="start">
                                <SearchIcon className="searchIcon" color="error" />
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default SearchBar;
