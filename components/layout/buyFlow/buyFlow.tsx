import React, { memo } from "react";
import { CssBaseline } from "@material-ui/core";
import { useFilterDrawer } from "@stores";
import { DrawerMenu } from "@molecules";
import { AppBarStepper } from "@organisms";
import { useStyles } from "./styles";
import { useLang } from "@hooks";

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

export const BuyFlowLayout = memo(({ children: Component, filterOptions }: BuyFlowLayoutProps) => {
    const classes = useStyles();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const [lang] = useLang("buyFlowLayout");

    const _toggleOpeningDrawer = () => {
        setDrawerOpen(!drawerIsOpen);
    };

    const _handleClickApplyFilters = (_filters) => {
        setFilters(_filters);
        _toggleOpeningDrawer();
    };

    const _filterOptions: IFilterOptions[] = [
        {
            title: lang.difficultLevel,
            items: [
                { label: lang.itemEasy, value: lang.itemEasy },
                { label: lang.itemMedium, value:  lang.itemMedium },
                { label:  lang.itemHard, value:  lang.itemHard },
            ],
        },
        {
            title: lang.timeOfCook,
            items: [
                { label:  lang.item15Min, value:  lang.item15Min},
                { label:  lang.item15To30, value:  lang.item15To30},
                { label:  lang.item30To60, value:  lang.item30To60},
                { label:  lang.itemUpperTo60, value:  lang.itemUpperTo60},
            ],
        },
    ];

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarStepper />
            <DrawerMenu
                open={drawerIsOpen}
                items={_filterOptions}
                selectedItems={filters}
                handleOnClose={() => setDrawerOpen(false)}
                handleOnClickApplyButton={_handleClickApplyFilters}
            />
            <main className={classes.content}>{Component}</main>
        </div>
    );
});
