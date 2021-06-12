// Utils & Config
import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useRouter } from "next/router";
const langs = require("../../../lang").searchBar;

// External components
import InputAdornment from "@material-ui/core/InputAdornment";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";

// Icons & Images
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
    container: {
        margin: "auto",
        marginBottom: theme.spacing(8),
        [theme.breakpoints.down("md")]: {
            marginBottom: theme.spacing(5),
        },
    },
    padd2: {
        paddingBottom: theme.spacing(2),
    },
    align: {
        textAlign: "center",
    },
    searchBar: {
        borderRadius: "15px",
        backgroundColor: "white",
        boxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        webkitBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        mozBoxShadow: '0px 3px 16px 0px rgba(0,0,0,0.06)',
        // '& fieldset.MuiOutlinedInput-notchedOutline': {
        //     borderColor: 'transparent',
        // },
    }
}));

const SearchBar = (props) => {
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

SearchBar.propTypes = {
    searchValue: PropTypes.string.isRequired,
    setsearchValue: PropTypes.func.isRequired,
};
