import React, { memo, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { AppBar, Toolbar } from "@material-ui/core";

import { StepperBuy, LangSelector } from "@molecules";
import { useAuthStore, useBuyFlow } from "@stores";
import { useStyles } from "./styles";

interface Step {
    label: string;
    icon: string;
    state: "active" | "inactive";
}

interface AppBarStepperProps {
    steps?: Step[];
}

const _steps: Step[] = [
    { label: "Seleccionar plan", icon: "/icons/appbar/img-header-select-plan.svg", state: "active" },
    { label: "Registrarse", icon: "/icons/appbar/img-header-register.svg", state: "inactive" },
    { label: "Checkout", icon: "/icons/appbar/img-header-checkout.svg", state: "inactive" },
    { label: "Elegir recetas", icon: "/icons/appbar/img-header-select-recipes.svg", state: "inactive" },
];

const loggedInSteps: Step[] = [
    { label: "Seleccionar plan", icon: "/icons/appbar/img-header-select-plan.svg", state: "active" },
    { label: "Checkout", icon: "/icons/appbar/img-header-checkout.svg", state: "inactive" },
    { label: "Elegir recetas", icon: "/icons/appbar/img-header-select-recipes.svg", state: "inactive" },
];

export const AppBarStepper = ({ steps = _steps }: AppBarStepperProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { showRegister, setRegisterState: toggleRegister } = useBuyFlow(({ setRegisterState, showRegister }) => ({
        setRegisterState,
        showRegister,
    }));

    // useEffect(() => {
    //     console.log("STEPPER: ", isAuthenticated);
    //     if (isAuthenticated) {
    //         toggleRegister(false);
    //     }
    // }, []);
    const classes = useStyles();

    return (
        <AppBar position="fixed" color="default" className={classes.navbarClass}>
            <Toolbar>
                <div className={classes.logo}>
                    <Image src="/logo.png" width={115} height={40} />
                </div>
                <StepperBuy smDowmHide steps={steps} />
                <LangSelector />
            </Toolbar>
            <StepperBuy smUpHide steps={isAuthenticated ? loggedInSteps : steps} />
        </AppBar>
    );
};
