import { Checkbox, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from "@material-ui/core";
import { useFilterDrawer } from "@stores";
import PropTypes from "prop-types";
import { useState } from "react";
import CustomButton from "../../atoms/customButton/customButton";
import useStyles from "./styles";
import { IFilter } from "@hooks";

export const DrawerMenu = ({
    open = false,
    items = [],
    selectedItems = [],
    handleOnClose = () => {},
    handleOnClickApplyButton = (e: any) => {},
    ...props
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const { storeFilters, setStoreFilters, toggleDrawer } = useFilterDrawer((state) => ({
        storeFilters: state.filters,
        setStoreFilters: state.setFilters,
        toggleDrawer: state.setDrawerOpen,
    }));
    const [filtersSelected, setFilters] = useState<IFilter[]>(storeFilters);

    const handleOnClick = (filter: IFilter) => {
        const isApplied = filtersSelected.some((f) => filter.isEqualToFilterValue(f.value) || filter.isEqual(f.value));
        if (isApplied) {
            let newFilterState = [];
            newFilterState = filtersSelected.filter((f) => !filter.isEqualToFilterValue(f.value) || !filter.isEqual(f.value));
            setFilters(newFilterState);
        } else {
            setFilters([...filtersSelected, filter]);
        }
    };

    const _handleOnClose = (x) => {
        handleOnClose();
    };

    const _handleOnClickApplyButton = () => {
        setStoreFilters([...filtersSelected]);
        setFilters([]);
        toggleDrawer(false);
    };

    return (
        <nav className={classes.drawer} aria-label="apply filters">
            <Drawer
                variant="temporary"
                anchor="left"
                open={open}
                onClose={(_, reason) => _handleOnClose(reason)}
                classes={{
                    paper: classes.drawerPaper,
                }}
                ModalProps={{ keepMounted: true }}
            >
                <div className={classes.drawerContentRoot}>
                    <Typography variant="h5" style={{ textAlign: "left" }}>
                        {props.filterTitle}
                    </Typography>
                    <List>
                        {items.map((filterPart, keyPartTitle) => (
                            <div key={keyPartTitle} style={{ marginTop: theme.spacing(3) }}>
                                <Typography variant="subtitle2" style={{ marginBottom: theme.spacing(1) }}>
                                    {filterPart.title}
                                </Typography>
                                {filterPart.items.map((filterItem, keyFilter) => (
                                    <ListItem key={keyFilter} dense button onClick={() => handleOnClick(filterItem)}>
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={filtersSelected.some(
                                                    (filter) =>
                                                        filter.isEqualToFilterValue(filterItem.value) || filter.isEqual(filterItem.value)
                                                )}
                                                tabIndex={-1}
                                                disableRipple
                                                inputProps={{ "aria-labelledby": filterItem.value }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText id={filterItem.value} primary={filterItem.label} />
                                    </ListItem>
                                ))}
                            </div>
                        ))}
                    </List>
                </div>
                <CustomButton text={props.applyFiltersBtnText} onClick={() => _handleOnClickApplyButton()} style={{ width: "100%" }} />
            </Drawer>
        </nav>
    );
};

DrawerMenu.propTypes = {
    open: PropTypes.bool,
    items: PropTypes.arrayOf(
        PropTypes.exact({
            title: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
                PropTypes.exact({
                    label: PropTypes.string.isRequired,
                    value: PropTypes.any.isRequired,
                })
            ),
        })
    ),
    selectedItems: PropTypes.arrayOf(PropTypes.string),
    handleOnClose: PropTypes.func.isRequired,
    handleOnClickApplyButton: PropTypes.func.isRequired,
};

export default DrawerMenu;
