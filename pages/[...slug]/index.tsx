import React from "react";
import PropTypes from "prop-types";
import { Routes, localeRoutes } from "lang/routes/routes";
import { useRouter } from "next/router";
import Adicionales from "../../pagesComponents/adicionales/index";
import ConfigurationPage from "../../pagesComponents/configuracion/index";
import BlogPage from "../../pagesComponents/blogs/recetas/[slug]";
import BonoRegaloPage from "../../pagesComponents/bono-regalo/index";
import CanjearBonoRegaloPage from "../../pagesComponents/canjear-bono-regalo/index";
import DetalleDelPlanPage from "../../pagesComponents/detalle-del-plan/[subscriptionId]";
import ElegirRecetas from "../../pagesComponents/elegir-recetas/[orderId]";
import HistorialPagos from "../../pagesComponents/historial-pagos/index";
import IniciarSesionPage from "../../pagesComponents/iniciar-sesion/index";
import ProfilePage from "../../pagesComponents/perfil/index";
import PlanesPage from "../../pagesComponents/planes/[slug]";
import PreguntasFrecuentesPage from "../../pagesComponents/preguntas-frecuentes/index";
import RecetasPage from "../../pagesComponents/recetas/index";
import RecetasGridPage from "../../pagesComponents/recetas-grid/[id]";
import RecoverPasswordPage from "../../pagesComponents/recuperar-contrasena/index";
import SignUpPage from "../../pagesComponents/registrarme/index";
import RateRecipesPage from "pagesComponents/valorar-recetas/valorarRecetas";

const Pages = (props) => {
    const router = useRouter();

    const getSectionComponent = (path) => {
        switch (path) {
            case localeRoutes[router.locale][Routes.blogs]:
                return <BlogPage />;

            case localeRoutes[router.locale][Routes["bono-regalo"]]:
                return <BonoRegaloPage />;
            case localeRoutes[router.locale][Routes["canjear-bono-regalo"]]:
                return <CanjearBonoRegaloPage />;
            case localeRoutes[router.locale][Routes["como-funciona"]]:
                return <CanjearBonoRegaloPage />;

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

            case localeRoutes[router.locale][Routes.recetas]:
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

            default:
                router.push("/404");
                return <></>;
        }
    };

    return props.hasError ? <></> : getSectionComponent(`/${router.query.slug?.join("/") || ""}`);
};

Pages.propTypes = {};

export default Pages;
