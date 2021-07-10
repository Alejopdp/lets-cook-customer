import { memo } from "react";

import Link from "next/link";
import Image from "next/image";

import { AppBar, Toolbar } from "@material-ui/core";

import { StepperBuy, LangSelector  } from "@molecules";
import { useBuyFlow } from "@stores";
import { useStyles } from "./styles";

interface Step {
    label: string;
    icon: string;
    state: 'active' | 'inactive'
}

interface AppBarStepperProps {
    steps?: Step[]
}

const _steps: Step[] = [
    { label: "Seleccionar plan", icon: "/icons/appbar/img-header-select-plan.svg", state: "active" },
    { label: "Registrarse", icon: "/icons/appbar/img-header-register.svg", state: "inactive" },
    { label: "Checkout", icon: "/icons/appbar/img-header-checkout.svg", state: "inactive" },
    { label: "Elegir recetas", icon: "/icons/appbar/img-header-select-recipes.svg", state: "inactive" },
];

export const AppBarStepper = memo(({ steps = _steps }: AppBarStepperProps) => {

    const { showRegister, setRegisterState: toggleRegister } = useBuyFlow(({ setRegisterState, showRegister }) => ({
        setRegisterState,
        showRegister,
    }));

    const classes = useStyles();

    return (<AppBar position="fixed" color="default" className={classes.navbarClass}>
        <Toolbar>
            <div className={classes.logo}>
                <a href="/">
                    <Image src="/logo.png" width={131} height={37} />
                </a>
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
            <LangSelector/>
        </Toolbar>
        <StepperBuy smUpHide steps={steps} />
    </AppBar>
    );
})