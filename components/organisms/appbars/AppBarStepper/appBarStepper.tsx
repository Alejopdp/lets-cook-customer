import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { AppBar, Toolbar } from "@material-ui/core";
import { StepperBuy, LangSelector } from "@molecules";
import { useAuthStore } from "@stores";
import { useStyles } from "./styles";
import { useLang } from "@hooks";

interface Step {
    label: string;
    icon: string;
    state: "active" | "inactive";
}

export const AppBarStepper = () => {
    const [lang] = useLang("appBarStepper");
    console.log("LANG: ", lang);

    const steps: Step[] = useMemo(
        () => [
            { label: lang.steps.selectPlan, icon: "/icons/appbar/img-header-select-plan.svg", state: "active" },
            { label: lang.steps.signUp, icon: "/icons/appbar/img-header-register.svg", state: "inactive" },
            { label: lang.steps.checkout, icon: "/icons/appbar/img-header-checkout.svg", state: "inactive" },
            { label: lang.steps.chooseRecipes, icon: "/icons/appbar/img-header-select-recipes.svg", state: "inactive" },
        ],
        [lang]
    );

    const loggedInSteps: Step[] = useMemo(
        () => [
            { label: lang.steps.selectPlan, icon: "/icons/appbar/img-header-select-plan.svg", state: "active" },
            { label: lang.steps.signUp, icon: "/icons/appbar/img-header-register.svg", state: "inactive" },
            { label: lang.steps.checkout, icon: "/icons/appbar/img-header-checkout.svg", state: "inactive" },
            { label: lang.steps.chooseRecipes, icon: "/icons/appbar/img-header-select-recipes.svg", state: "inactive" },
        ],
        [lang]
    );

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    const showLoggedInSteps = useMemo(() => {
        return isAuthenticated;
    }, []);

    const classes = useStyles();

    return (
        <AppBar position="fixed" color="default" className={classes.navbarClass}>
            <Toolbar>
                <div className={classes.logo}>
                    <Link href="/">
                        <Image src="/logo.png" width={115} height={40} alt="lets-cook-logo" className={classes.cursorPointer} />
                    </Link>
                </div>
                <StepperBuy smDowmHide steps={showLoggedInSteps ? loggedInSteps : steps} />
                <LangSelector />
            </Toolbar>
            <StepperBuy smUpHide steps={showLoggedInSteps ? loggedInSteps : steps} />
        </AppBar>
    );
};
