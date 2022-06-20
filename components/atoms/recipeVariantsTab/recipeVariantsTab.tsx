import React, { memo, useMemo } from "react";
import { Tabs, Typography, Tab, Box, useTheme } from "@material-ui/core";
import { useStyles } from "./styles";
import { RecipeVariantsTabProps, TabPanelProps } from "./interfaces";

export const TabPanel = memo((props: TabPanelProps) => {
    const { children, value, index, ...other } = props;
    const theme = useTheme();

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box style={{ padding: `${theme.spacing(2)}px 12px` }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
});

export const RecipeVariantsTab = memo((props: RecipeVariantsTabProps) => {
    const classes = useStyles();
    const [selectedVariant, setselectedVariant] = React.useState(0);

    const handleChange = (value) => {
        setselectedVariant(value);
    };

    const ingredients = useMemo(() => {
        return props.variants[selectedVariant].ingredients.join(", ");
    }, [selectedVariant]);

    return (
        <div className={classes.root}>
            {/* <AppBar position="static"> */}
            <Tabs
                classes={{ indicator: classes.indicator }}
                value={selectedVariant}
                onChange={(e, value) => handleChange(value)}
                aria-label="ingredients tabs"
                scrollButtons="auto"
                variant="scrollable"
            >
                {props.variants.map((variant, index) => (
                    <Tab
                        classes={{ root: classes.tabRoot, selected: classes.selected, wrapper: classes.tabWrapper }}
                        key={index}
                        label={`OPCIÓN ${variant.restriction.label}`}
                        value={variant.id}
                        {...a11yProps(index)}
                    />
                ))}
            </Tabs>
            {/* </AppBar> */}
            <Typography variant="body2">{ingredients}</Typography>
        </div>
    );
});

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default RecipeVariantsTab;
