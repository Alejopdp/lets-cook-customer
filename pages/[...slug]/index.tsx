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
import ComoFunciona from "pagesComponents/como-funciona/index";
import AvisoLegal from "pagesComponents/aviso-legal/index";

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

            case "https://en.letscooknow.es/": // TO DO: Redirect from DNS
                router.push("/en");
                return <></>;

            // case "/a/l/en":
            //     router.push("/", undefined, { locale: "en" });
            //     return <></>;

            // case "/?lang=en": // Cant catch param
            //     router.push("/", undefined, { locale: "en" });
            //     return <></>;

            // case "/account/login":
            //     router.push(localeRoutes["es"][Routes["iniciar-sesion"]], undefined, { locale: "es" });
            //     return <></>;

            // case "/collections/frontpage":
            //     router.push(localeRoutes["es"][Routes.recetas], undefined, { locale: "es" });
            //     return <></>;

            // case "/pages/preguntas-frecuentes?lang=en":
            //     router.push(localeRoutes["en"][Routes["como-funciona"]], undefined, { locale: "en" });
            //     return <></>;

            // case "/pages/planes-semanales":
            //     router.push("/planes?planSlug=plan-familiar&personas=3&recetas=3");
            //     return <></>;

            // case "https://ca.letscooknow.es/": // TO DO: Use DNS redirections
            //     router.push("/ca");
            //     return <></>;

            // case "/account/login?return_url=/account": // TO DO: Cant catch param, redirect from pagesComponents if query
            //     router.push(localeRoutes["en"][Routes.perfil], undefined, { locale: "en" });
            //     return <></>;

            // case "/cart":
            //     router.push("/");
            //     return <></>;

            // case "/pages/recipe-submitted?product_id=3169772503140": // TO DO: Cant catch param
            //     router.push("/");
            //     return <></>;

            // case "/pages/subscriptions-list":
            //     router.push(localeRoutes["es"][Routes["iniciar-sesion"]], undefined, { locale: "es" });
            //     return <></>;

            // case "/pages/preguntas-frecuentes":
            //     router.push(localeRoutes["es"][Routes["preguntas-frecuentes"]], undefined, { locale: "es" });
            //     return <></>;

            // case "/account":
            //     router.push(localeRoutes["en"][Routes.perfil], undefined, { locale: "en" });
            //     return <></>;

            // case "/products/plan-gourmet":
            //     router.push("/planes?planSlug=plan-gourmet&personas=2&recetas=3");
            //     return <></>;

            // case "/pages/como-funciona":
            //     router.push(localeRoutes["en"][Routes["como-funciona"]], undefined, { locale: "en" }); // TO DO: Tira error
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-gourmet":
            //     router.push("/planes?planSlug=plan-gourmet&personas=2&recetas=3");
            //     return <></>;

            // case "/products/plan-ahorro":
            //     router.push("/planes?planSlug=plan-ahorro&recetas=3&personas=2");
            //     return <></>;

            // case "/tools/recurring/login":
            //     router.push(localeRoutes["en"][Routes["iniciar-sesion"]], undefined, { locale: "en" });
            //     return <></>;

            // case "/collections/plan-semanal-vegetariano":
            //     router.push("/planes?planSlug=plan-vegetariano&recetas=3&personas=2");
            //     return <></>;

            // case "/products/plan-vegetariano":
            //     router.push("/planes?planSlug=plan-vegetariano&recetas=3&personas=2");
            //     return <></>;

            // case "/pages/recipe-submitted?product_id=3169657585764": // TO DO: QUery patam
            //     router.push(localeRoutes["es"][Routes.perfil], undefined, { locale: "es" });
            //     return <></>;

            // case "/pages/preguntas-frecuentes-faq":
            //     router.push(localeRoutes["es"][Routes["preguntas-frecuentes"]], undefined, { locale: "es" });
            //     return <></>;

            // case "/collections/adicionales":
            //     router.push(localeRoutes["es"][Routes.adicionales], undefined, { locale: "es" });
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-semanal-familiar":
            //     router.push("/planes?planSlug=plan-familiar&personas=3&recetas=3");
            //     return <></>;

            // case "/products/adicional-desayunos-saludables":
            //     router.push(localeRoutes["es"][Routes.adicionales], undefined, { locale: "es" });
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-ahorro":
            //     router.push("/planes?planSlug=plan-ahorro&recetas=3&personas=2");
            //     return <></>;

            // case "/account/register":
            //     router.push(localeRoutes["en"][Routes.registrarme], undefined, { locale: "en" });
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-vegetariano":
            //     router.push("/planes?planSlug=plan-vegetariano&recetas=3&personas=2");
            //     return <></>;

            // case "/pages/recipe-submitted?product_id=5506177171609": // TO DO: Query param
            //     router.push(localeRoutes["es"][Routes["iniciar-sesion"]], undefined, { locale: "es" });
            //     return <></>;

            // case "/products/bono-regalo":
            //     router.push(localeRoutes["es"][Routes["bono-regalo"]], undefined, { locale: "es" });
            //     return <></>;

            // case "/a/l/en/pages/planes-semanales":
            //     router.push("/planes?planSlug=plan-familiar&personas=3&recetas=3");
            //     return <></>;

            // case "/products/plan-semanal-familiar":
            //     router.push("/planes?planSlug=plan-familiar&personas=3&recetas=3");
            //     return <></>;

            // case "/a/l/en/pages/preguntas-frecuentes":
            //     router.push(localeRoutes["en"][Routes["preguntas-frecuentes"]], undefined, { locale: "en" });
            //     return <></>;

            // case "https://en.letscooknow.es/pages/preguntas-frecuentes": // TO DO: Dns redirection
            //     router.push("/en/faqs");
            //     return <></>;

            // case "/pages/condiciones-generales-de-contratacion":
            //     router.push(localeRoutes["es"][Routes["aviso-legal"]], undefined, { locale: "es" });
            //     return <></>;

            // case "/products/plan-gourmet?variant=27290791247972": // TO DO: Query param
            //     router.push("/planes?planSlug=plan-gourmet&personas=2&recetas=3");
            //     return <></>;

            // case "/products/plan-gourmet":
            //     router.push("/planes?planSlug=plan-gourmet&personas=2&recetas=3");
            //     return <></>;

            // case "/pages/aviso-legal-y-condiciones-generales-de-uso-del-sitio-web":
            //     router.push(localeRoutes["es"][Routes["aviso-legal"]], undefined, { locale: "es" });
            //     return <></>;

            // // case "/challenge":
            // //     router.push("410");
            // //     return <></>;

            // case "https://ca.letscooknow.es/pages/planes-semanales": // TO DO: DNS Redirefction
            //     router.push("/ca/plans?planSlug=plan-familiar&personas=3&recetas=3");
            //     return <></>;

            // case "https://en.letscooknow.es/pages/planes-semanales": // TO DO: DNS Redirefction
            //     router.push("/en/plans?planSlug=plan-familiar&personas=3&recetas=3");
            //     return <></>;

            // case "/collections/all":
            //     router.push(localeRoutes["es"][Routes.recetas], undefined, { locale: "es" });
            //     return <></>;

            // case "/plan-vegano":
            //     router.push("/planes?planSlug=plan-vegano&recetas=3&personas=2");
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-gourmet?variant=27290791247972":
            //     router.push("/planes?planSlug=plan-gourmet&personas=2&recetas=3");
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-semanal-vegano":
            //     router.push("/planes?planSlug=plan-vegano&recetas=3&personas=2");
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-ahorro?variant=25991289798756":
            //     router.push("/planes?planSlug=plan-ahorro&recetas=3&personas=2");
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-ahorro?variant=25991289864292":
            //     router.push("/planes?planSlug=plan-ahorro&recetas=3&personas=2");
            //     return <></>;

            // case "/collections/planes-de-suscripcion/products/plan-gourmet?variant=25997667106916":
            //     router.push("/planes?planSlug=plan-gourmet&personas=2&recetas=3");
            //     return <></>;

            // case "/?no_redirect=true":
            //     router.push("ult:");
            //     return <></>;
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
