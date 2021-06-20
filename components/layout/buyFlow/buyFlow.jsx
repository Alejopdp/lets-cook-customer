import { AppBar, Link, CssBaseline, Toolbar } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";

import DrawerMenu from "../../molecules/drawerFilters/drawer";
import { StepperBuy } from "../../molecules/stepperBuy";
import LangSelector from "../../molecules/langSelector/langSelector";

import { useStyles } from "./styles";
import { useBuyFlow, useFilterDrawer } from "../../../stores/buyflow";

export const BuyFlowLayout = ({ children: Component }) => {
    const filterOptions = [
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

    const steps = [
        { label: "Seleccionar plan", icon: "/icons/appbar/img-header-select-plan.svg", state: "active" },
        { label: "Registrarse", icon: "/icons/appbar/img-header-register.svg", state: "inactive" },
        { label: "Checkout", icon: "/icons/appbar/img-header-checkout.svg", state: "inactive" },
        { label: "Elegir recetas", icon: "/icons/appbar/img-header-select-recipes.svg", state: "inactive" },
    ];

    const classes = useStyles();
    const router = useRouter();
    const { drawerIsOpen, filters, setDrawerOpen, setFilters } = useFilterDrawer((state) => state);
    const { showRegister, setRegisterState: toggleRegister } = useBuyFlow(({ setRegisterState, showRegister }) => ({
        setRegisterState,
        showRegister,
    }));

    const _toggleOpeningDrawer = () => {
        setDrawerOpen(!drawerIsOpen);
    };

    const _handleOnChangeLang = ({ label: locale }) => {
        router.push(router.asPath, router.asPath, { locale });
    };

    const _handleClickApplyFilters = (_filters) => {
        setFilters(_filters);
        _toggleOpeningDrawer();
        console.log("Filtros aplicados: ", filters);
    };

    const AppBarContent = () => (
        <AppBar position="fixed" color="default" className={classes.navbarClass}>
            <Toolbar>
                <div className={classes.logo}>
                    <Link href="/">
                        <Image src="/logo.png" width={131} height={37} />
                    </Link>
                </div>
                <StepperBuy smDowmHide steps={steps} />
                {/* TODO: REMOVE!! ONLY IS DEMO TO HIDE OR SHOW REGISTER HEADER */}
                <button
                    onClick={() => toggleRegister(!showRegister)}
                    style={{
                        color: "lightblue",
                        backgroundColor: "transparent",
                        border: "none",
                    }}
                >
                    {showRegister ? "Ocultar Registrarse" : "Mostrar Registrarse"}
                </button>
                {/* END DEMO BUTTON */}
                <LangSelector onChangeLang={_handleOnChangeLang} />
            </Toolbar>
            <StepperBuy smUpHide steps={steps} />
        </AppBar>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBarContent />
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
};

export default BuyFlowLayout;
