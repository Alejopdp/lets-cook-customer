import React, { memo } from "react";
import { CssBaseline } from "@material-ui/core";
import { useFilterDrawer } from "@stores";
import { DrawerMenu } from "@molecules";
import { AppBarStepper } from "@organisms";
import { useStyles } from "./styles";
import { useLang } from "@hooks";
import Head from "next/head";
import * as ga from "../../../helpers/ga";
import { useRecipesFilters } from "@hooks";

interface BuyFlowLayoutProps {
    children: React.ReactNode;
    isInitializing: boolean;
}

export const BuyFlowLayout = memo(({ children: Component, isInitializing }: BuyFlowLayoutProps) => {
    const classes = useStyles();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const [lang] = useLang("buyFlowLayout");
    const [_filterOptions] = useRecipesFilters();

    const _toggleOpeningDrawer = () => {
        setDrawerOpen(!drawerIsOpen);
    };

    const _handleClickApplyFilters = (_filters) => {
        setFilters(_filters);
        _toggleOpeningDrawer();
    };

    return (
        <>
            <Head>
                <title>Planes semanales - LetsCook: Productos frescos y recetas</title>
                <meta
                    name="description"
                    content="Tenemos planes para todas las necesidades. Descubre el tuyo desde 4,5 €/ración. Envío gratis en Barcelona y pueblos cercanos"
                />
                <meta property="og:site_name" content="Planes semanales - LetsCook: Productos frescos y recetas" />
                <meta property="og:image" content="https://i.ibb.co/s31H9Lz/logo-Letscook.jpg" />
                <meta property="og:title" content="LetsCook: Productos frescos y recetas" />
                <meta
                    property="og:description"
                    content="Tenemos planes para todas las necesidades. Descubre el tuyo desde 4,5 €/ración. Envío gratis en Barcelona y pueblos cercanos"
                />
                <meta property="og:url" content="https://letscooknow.es/planes" />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="LetsCook: Productos frescos y recetas" />
                <meta
                    name="twitter:description"
                    content="Tenemos planes para todas las necesidades. Descubre el tuyo desde 4,5 €/ración. Envío gratis en Barcelona y pueblos cercanos"
                />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className={classes.root}>
                <CssBaseline />
                <AppBarStepper />
                {drawerIsOpen && (
                    <DrawerMenu
                        open={drawerIsOpen}
                        items={_filterOptions}
                        selectedItems={filters}
                        handleOnClose={() => setDrawerOpen(false)}
                        handleOnClickApplyButton={_handleClickApplyFilters}
                        filterTitle={lang.filterTitle}
                        applyFiltersBtnText={lang.applyFiltersBtnText}
                    />
                )}
                {!isInitializing && <main className={classes.content}>{Component}</main>}
            </div>
        </>
    );
});
