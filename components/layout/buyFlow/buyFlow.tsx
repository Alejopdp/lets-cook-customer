import React, { memo } from "react";
import { CssBaseline } from "@material-ui/core";
import { useFilterDrawer } from "@stores";
import { DrawerMenu } from "@molecules";
import { AppBarStepper } from "@organisms";
import { useStyles } from "./styles";

interface IFilter {
    label: string;
    value: string;
}

interface IFilterOptions {
    title: string;
    items: IFilter[];
}

interface BuyFlowLayoutProps {
    children: React.ReactNode;
    filterOptions?: IFilterOptions[];
}

const _filterOptions: IFilterOptions[] = [
    {
        title: "Nivel de dificultad",
        items: [
            { label: "Fácil", value: "Fácil" },
            { label: "Medio", value: "Medio" },
            { label: "Dificil", value: "Dificil" },
        ],
    },
    {
        title: "Tiempo de preparación",
        items: [
            { label: "Menos de 15 minutos", value: "Menos de 15 minutos" },
            { label: "Entre 15 y 30 minutos", value: "Entre 15 y 30 minutos" },
            { label: "Entre 30 y 60 minutos", value: "Entre 30 y 60 minutos" },
            { label: "Más de 60 minutos", value: "Más de 60 minutos" },
        ],
    },
];

export const BuyFlowLayout = memo(({ children: Component, filterOptions = _filterOptions }: BuyFlowLayoutProps) => {
    const classes = useStyles();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);

    const _toggleOpeningDrawer = () => {
        setDrawerOpen(!drawerIsOpen);
    };

    const _handleClickApplyFilters = (_filters) => {
        setFilters(_filters);
        _toggleOpeningDrawer();
        console.log("Filtros aplicados: ", filters);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarStepper />
            <DrawerMenu
                open={drawerIsOpen}
                items={filterOptions}
                selectedItems={filters}
                handleOnClose={() => setDrawerOpen(false)}
                handleOnClickApplyButton={_handleClickApplyFilters}
            />
            <main className={classes.content}>{Component}</main>
        </div>
    );
});
