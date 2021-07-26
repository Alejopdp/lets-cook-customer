import React, { memo, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";

import { AppBar, Toolbar } from "@material-ui/core";

import { StepperBuy, LangSelector } from "@molecules";
import { useAuthStore, useBuyFlow } from "@stores";
import { useStyles } from "./styles";
import { useLang } from "@hooks";

interface Step {
    label: string;
    icon: string;
    state: "active" | "inactive";
}

interface AppBarStepperProps {
    steps?: Step[];
}

export const AppBarStepper = (props: AppBarStepperProps) => {
    const [lang] = useLang('appBarStepper');
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const { showRegister, setRegisterState: toggleRegister } = useBuyFlow(({ setRegisterState, showRegister }) => ({
        setRegisterState,
        showRegister,
    }));

    const steps: Step[] = [
        { label: lang.selectPlan, icon: "/icons/appbar/img-header-select-plan.svg", state: "active" },
        { label: lang.register, icon: "/icons/appbar/img-header-register.svg", state: "inactive" },
        { label: lang.checkout, icon: "/icons/appbar/img-header-checkout.svg", state: "inactive" },
        { label: lang.choiseRecipe, icon: "/icons/appbar/img-header-select-recipes.svg", state: "inactive" },
    ];

    const classes = useStyles();

    return (
        <AppBar position="fixed" color="default" className={classes.navbarClass}>
            <Toolbar>
                <div className={classes.logo}>
                    <a href="/">
                        <Image src="/logo.png" width={115} height={40} />
                    </a>
                </div>
                <StepperBuy smDowmHide steps={steps} />
                <LangSelector />
            </Toolbar>
            <StepperBuy smUpHide steps={steps} />
        </AppBar>
    );
};
