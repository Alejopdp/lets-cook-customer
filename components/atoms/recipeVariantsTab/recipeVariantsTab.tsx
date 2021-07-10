import React, { memo } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            {/* <AppBar position="static"> */}
            <Tabs value={value} onChange={handleChange} aria-label="ingredients tabs" scrollButtons="auto" variant="scrollable">
                {props.variants.map((variant, index) => (
                    <Tab key={index} label={variant} {...a11yProps(index)} />
                ))}
            </Tabs>
            {/* </AppBar> */}
            {props.ingredientsLists.map((list, index) => (
                <TabPanel value={value} index={index} id={"tab-panel"}>
                    {list}
                </TabPanel>
            ))}
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
