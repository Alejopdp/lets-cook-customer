import React from "react";
import PropTypes from "prop-types";
import dynamic from "next/dynamic";
import { Routes, localeRoutes } from "lang/routes/routes";
import { useRouter } from "next/router";

const Adicionales = dynamic(() => import("../../pagesComponents/adicionales/index"));
const ConfigurationPage = dynamic(() => import("../../pagesComponents/configuracion/index"));
const BlogPage = dynamic(() => import("../../pagesComponents/blogs/recetas/[slug]"));
const BonoRegaloPage = dynamic(() => import("../../pagesComponents/bono-regalo/index"));
const CanjearBonoRegaloPage = dynamic(() => import("../../pagesComponents/canjear-bono-regalo/index"));
const DetalleDelPlanPage = dynamic(() => import("../../pagesComponents/detalle-del-plan/[subscriptionId]"));
const ElegirRecetas = dynamic(() => import("../../pagesComponents/elegir-recetas/[orderId]"));
const HistorialPagos = dynamic(() => import("../../pagesComponents/historial-pagos/index"));
const IniciarSesionPage = dynamic(() => import("../../pagesComponents/iniciar-sesion/index"));
const ProfilePage = dynamic(() => import("../../pagesComponents/perfil/index"));
const PlanesPage = dynamic(() => import("../../pagesComponents/planes/[slug]"));
const PreguntasFrecuentesPage = dynamic(() => import("../../pagesComponents/preguntas-frecuentes/index"));
const RecetasPage = dynamic(() => import("../../pagesComponents/recetas/index"));
const RecetasGridPage = dynamic(() => import("../../pagesComponents/recetas-grid/[id]"));
const RecoverPasswordPage = dynamic(() => import("../../pagesComponents/recuperar-contrasena/index"));
const SignUpPage = dynamic(() => import("../../pagesComponents/registrarme/index"));
const RateRecipesPage = dynamic(() => import("pagesComponents/valorar-recetas/valorarRecetas"));
const ComoFunciona = dynamic(() => import("pagesComponents/como-funciona/index"));
const AvisoLegal = dynamic(() => import("pagesComponents/aviso-legal/index"));

const Pages = (props) => {
    const router = useRouter();

    const getSectionComponent = (path) => {
        switch (path) {
            case localeRoutes[router.locale][Routes["aviso-legal"]]:
                return <AvisoLegal />;
            case localeRoutes[router.locale][Routes.blogs]:
                return <BlogPage />;
            case localeRoutes[router.locale][Routes["bono-regalo"]]:
                return <BonoRegaloPage />;
            case localeRoutes[router.locale][Routes["canjear-bono-regalo"]]:
                return <CanjearBonoRegaloPage />;
            case localeRoutes[router.locale][Routes["como-funciona"]]:
                return <ComoFunciona />;
            case localeRoutes[router.locale][Routes["detalle-del-plan"]]:
                return <DetalleDelPlanPage />;
            case localeRoutes[router.locale][Routes["elegir-recetas"]]:
                return <ElegirRecetas />;
            case localeRoutes[router.locale][Routes["historial-pagos"]]:
                return <HistorialPagos />;
            case localeRoutes[router.locale][Routes["iniciar-sesion"]]:
                return <IniciarSesionPage />;
            case localeRoutes[router.locale][Routes.perfil]:
                return <ProfilePage />;
            case localeRoutes[router.locale][Routes.planes]:
                return <PlanesPage />;
            case localeRoutes[router.locale][Routes["valorar-recetas"]]:
                return <RateRecipesPage />;

            case localeRoutes[router.locale][Routes["preguntas-frecuentes"]]:
                return <PreguntasFrecuentesPage />;

            case localeRoutes[router.locale][Routes["menu-semanal"]]:
                return <RecetasPage />;

            case localeRoutes[router.locale][Routes["valorar-recetas"]]:
                return <RecetasGridPage />;

            case localeRoutes[router.locale][Routes["recuperar-contrasena"]]:
                return <RecoverPasswordPage />;

            case localeRoutes[router.locale][Routes.registrarme]:
                return <SignUpPage />;

            case localeRoutes[router.locale][Routes.configuracion]:
                return <ConfigurationPage />;

            case localeRoutes[router.locale][Routes.adicionales]:
                return <Adicionales />;

            case "https://en.letscooknow.es/": // TO DO: Redirect from DNS
                router.push("/en");
                return <></>;

            default:
                if (!!path && path !== "/") {
                    router.push("/404");
                }
                return <></>;
        }
    };

    return props.hasError ? <></> : getSectionComponent(`/${router.query.slug?.join("/") || ""}`);
};

Pages.propTypes = {};

export default Pages;
