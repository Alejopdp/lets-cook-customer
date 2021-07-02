// Utils & Config
import React from "react";
import { useRouter } from "next/router";
import {searchBar as langs} from "@lang";

// External components
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import SearchIcon from "@material-ui/icons/Search";
import { useStyles } from './styles';
import { SearchBarProps } from './interfaces';

export const SearchBar = (props: SearchBarProps) => {
    const classes = useStyles();
    const router = useRouter();
    const lang = langs[router.locale];

    const handleChange = (e) => {
        props.setsearchValue(e.target.value);
    };

    return (
        <Grid classes={{ root: classes.container }} item xs={12} md={8}>
            <FormControl variant="outlined" fullWidth>
                <OutlinedInput
                    className={classes.searchBar}
                    value={props.searchValue}
                    onChange={handleChange}
                    placeholder={lang.placeholder}
                    fullWidth
                    startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon className="searchIcon" color="error" />
                        </InputAdornment>
                    }
                />
            </FormControl>
        </Grid>
    );
};

export default SearchBar;