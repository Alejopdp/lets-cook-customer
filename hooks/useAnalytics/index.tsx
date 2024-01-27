import * as ga from "../../helpers/ga";

const useAnalytics = () => {
    const trackLoginClick = (source: string) => {
        // ga.event({
        //     action: "clic en ingresar",
        //     params: {
        //         event_category: `ingresar - ${source}`,
        //         event_label: "ingresar",
        //     },
        // });
    };

    const trackSignUpClick = (source: string) => {
        // ga.event({
        //     action: "clic en registrate aqui",
        //     params: {
        //         event_category: `ingresar - ${source}`,
        //         event_label: "aun no tienes cuenta",
        //     },
        // });
    };

    const trackForgotPasswordClick = (source: string) => {
        // ga.event({
        //     action: "clic en olvide mi contrasena",
        //     params: {
        //         event_category: `ingresar - ${source}`,
        //         event_label: "olvide mi contrasena",
        //     },
        // });
    };

    const trackBuyflowLogin = () => {
        // ga.event({
        //     action: "clic en iniciar sesion",
        //     params: {
        //         event_category: `registrarse - buyflow`,
        //         event_label: "ya tienes cuenta",
        //     },
        // });
    };

    const trackBuyFlowForgotPassword = () => {
        // ga.event({
        //     action: "clic en olvide mi contrasena",
        //     params: {
        //         event_category: `ingresar - buyflow`,
        //         event_label: "olvide mi contrasena",
        //     },
        // });
    };

    const trackBuyFlowSignUp = () => {
        // ga.event({
        //     action: "clic en registrate aqui",
        //     params: {
        //         event_category: `ingresar - buyflow`,
        //         event_label: "aun no tienes cuenta",
        //     },
        // });
    };

    const trackBuyFlowSignUpForgotPassword = () => {
        // ga.event({
        //     action: "clic en registrate aqui",
        //     params: {
        //         event_category: `recupero de contrasena - buyflow`,
        //         event_label: "aun no tienes cuenta",
        //     },
        // });
    };

    const trackChooseRecipesClick = (recipeName: string, source: "elegir recetas" | "recetas page") => {
        // ga.event({
        //     action: "clic en recetas",
        //     params: {
        //         event_category: source,
        //         event_label: recipeName.toLowerCase(),
        //     },
        // });
    };

    const trackRecoverPasswordClick = (source: string) => {
        // ga.event({
        //     action: "clic en recuperar contrasena",
        //     params: {
        //         event_category: `recupero de contrasena - ${source}`,
        //         event_label: "ingreso de email",
        //     },
        // });
    };
    const trackRecoverPasswordInput = (source: string) => {
        // ga.event({
        //     action: "clic en continuar",
        //     params: {
        //         event_category: `recupero de contrasena - ${source}`,
        //         event_label: "ingreso del codigo",
        //     },
        // });
    };

    const trackNewPasswordCodeInput = (source: string) => {
        // ga.event({
        //     action: "clic en continuar",
        //     params: {
        //         event_category: `recupero de contrasena - ${source}`,
        //         event_label: "ingreso de nueva contrasena",
        //     },
        // });
    };

    const trackViewPlansAtHomepageClick = () => {
        // ga.event({
        //     action: "clic en descubre mas",
        //     params: {
        //         event_category: "homepage",
        //         event_label: "beneficios lets cook",
        //     },
        // });
    };

    const trackCallToActionClickAtHomepage = (page?: string) => {
        // ga.event({
        //     action: "clic en me interesa",
        //     params: {
        //         event_category: page ?? "undefined page",
        //         event_label: "call to action",
        //     },
        // });
    };

    const trackHomepageBannerViewPlansclick = () => {
        // ga.event({
        //     action: "clic en ver planes",
        //     params: {
        //         event_category: "homepage",
        //         event_label: "banner principal",
        //     },
        // });
    };

    const trackSignUpEmailInput = (source: string) => {
        // ga.event({
        //     action: "clic en continuar",
        //     params: {
        //         event_category: `registrarse - ${source}`,
        //         event_label: "correo electrónico",
        //     },
        // });
    };

    const trackSignUpPasswordInput = (source: string) => {
        // ga.event({
        //     action: "clic en registrarme",
        //     params: {
        //         event_category: `registrarse - ${source}`,
        //         event_label: "ingrese su contrasena",
        //     },
        // });
    };

    const trackAlreadyHaveAccountClick = (source: string) => {
        // ga.event({
        //     action: "clic en iniciar sesion",
        //     params: {
        //         event_category: `registrarse - ${source}`,
        //         event_label: "ya tienes cuenta",
        //     },
        // });
    };
    return {
        trackLoginClick,
        trackSignUpClick,
        trackBuyFlowForgotPassword,
        trackBuyFlowSignUp,
        trackBuyflowLogin,
        trackBuyFlowSignUpForgotPassword,
        trackForgotPasswordClick,
        trackChooseRecipesClick,
        trackRecoverPasswordClick,
        trackRecoverPasswordInput,
        trackNewPasswordCodeInput,
        trackViewPlansAtHomepageClick,
        trackCallToActionClickAtHomepage,
        trackHomepageBannerViewPlansclick,
        trackSignUpEmailInput,
        trackSignUpPasswordInput,
        trackAlreadyHaveAccountClick,
    };
};

export default useAnalytics;
