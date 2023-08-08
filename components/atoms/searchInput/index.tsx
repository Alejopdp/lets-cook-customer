// Utils & Config
import React from "react";
import { useRouter } from "next/router";

// External components
import { InputAdornment, OutlinedInput, FormControl, Grid } from "@material-ui/core";

// Icons & Images
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from "./styles";
import { SearchBarProps } from "./interfaces";

export const SearchInput = (props: SearchBarProps) => {
    const classes = useStyles();

    const handleChange = (e) => {
        props.setsearchValue(e.target.value);
    };

    return (
            <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                    className={classes.searchBar}
                    value={props.searchValue}
                    onChange={handleChange}
                    placeholder={props.placeholder}
                    fullWidth
                    // classes={{
                    //     notchedOutline: classes.notchedOutline, // Agrega esta línea
                    //     focused: classes.focused, // Agrega esta línea
                    // }}
            
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon className="searchIcon" color="primary" />
                        </InputAdornment>
                    }
                />
            </FormControl>
    );
};

export default SearchInput;
