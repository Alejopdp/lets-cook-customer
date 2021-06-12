import { Checkbox, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CustomButton from "../../atoms/customButton/customButton";
import useStyles from "./styles";

export const DrawerMenu = ({ open = false, items = [], selectedItems=[],handleOnClose = () => {}, handleOnClickApplyButton = () => {} }) => {
    const classes = useStyles();
    const [filtersSelected, setFilters] = useState(selectedItems);

    const handleOnClick = (filter) => {
        const isApplied = filtersSelected.some((f) => filter === f);
        if (isApplied) {
            let newFilterState = [];
            newFilterState = filtersSelected.filter((f) => filter !== f);
            setFilters(newFilterState);
        } else {
            setFilters([...filtersSelected, filter]);
        }
    };

    const _handleOnClose = (x) => {
        setFilters(selectedItems)
        handleOnClose();
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
                    <div className={classes.headerTitle}>
                        <Typography variant="h5">Filtrar recetas</Typography>
                    </div>
                    <List>
                        {items.map((filterPart, keyPartTitle) => (
                            <div key={keyPartTitle}>
                                <Typography variant="subtitle1" className={classes.subtitle}>
                                    {filterPart.title}
                                </Typography>
                                {filterPart.items.map((filterItem, keyFilter) => (
                                    <ListItem
                                        key={keyFilter}
                                        dense
                                        button
                                        checked={filtersSelected.some((filter) => filter === filterItem.value)}
                                        onClick={() => handleOnClick(filterItem.value)}
                                    >
                                        <ListItemIcon>
                                            <Checkbox
                                                edge="start"
                                                checked={filtersSelected.some((filter) => filter === filterItem.value)}
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
                <div className={classes.bottonApply}>
                    <CustomButton text="Aplicar filtros" onClick={ () => handleOnClickApplyButton(filtersSelected)} />
                </div>
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
