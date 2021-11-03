const { i18n } = require("./next-i18next.config");
// const routes = require("./lang/routes/routes");

// next.config.js
module.exports = {
    i18n,
    images: {
        domains: ["localhost", "cdn.shopify.com", "lets-cook-assets.s3.eu-west-3.amazonaws.com", "images.unsplash.com", "www.facebook.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "/en/adicionales",
    //             destination: "/en/adicionales-[EN]",
    //             locale: false,
    //         },
    //         {
    //             source: "/ca/adicionales",
    //             destination: "/ca/adicionales-[CA]",
    //             locale: false,
    //         },
    //         {
    //             source: "/en/aviso-legal",
    //             destination: "/en/aviso-legal-[EN]",
    //             locale: false,
    //         },
    //         {
    //             source: "/ca/aviso-legal",
    //             destination: "/ca/aviso-legal-[CA]",
    //             locale: false,
    //         },
    //         { source: "/en/blogs", destination: "/en/blogs", locale: false },
    //         { source: "/ca/blogs", destination: "/ca/blogs", locale: false },
    //         { source: "/en/bono-regalo", destination: "/en/bono-regalo-[EN]", locale: false },
    //         { source: "/ca/bono-regalo", destination: "/ca/bono-regalo-[CA]", locale: false },
    //         { source: "/en/canjear-bono-regalo-en", destination: "/en/canjear-bono-regalo", locale: false },
    //         { source: "/ca/canjear-bono-regalo-ca", destination: "/ca/canjear-bono-regalo", locale: false },
    //         { source: "/en/como-funciona-en", destination: "/en/como-funciona", locale: false },
    //         { source: "/ca/como-funciona-ca", destination: "/ca/como-funciona", locale: false },
    //         { source: `/en${routes.configuracion.en}`, destination: "/en/configuracion", locale: false },
    //         { source: `/ca${routes.configuracion.ca}`, destination: "/ca/configuracion", locale: false },
    //         { source: "/en/detalle-del-plan-en", destination: "/en/detalle-del-plan", locale: false },
    //         { source: "/ca/detalle-del-plan-ca", destination: "/ca/detalle-del-plan", locale: false },
    //         { source: "/en/elegir-recetas-en", destination: "/en/elegir-recetas", locale: false },
    //         { source: "/ca/elegir-recetas-ca", destination: "/ca/elegir-recetas", locale: false },
    //         { source: "/en/historial-pagos-en", destination: "/en/historial-pagos", locale: false },
    //         { source: "/ca/historial-pagos-ca", destination: "/ca/historial-pagos", locale: false },
    //         { source: "/en/iniciar-sesion-en", destination: "/en/iniciar-sesion", locale: false },
    //         { source: "/ca/iniciar-sesion-ca", destination: "/ca/iniciar-sesion", locale: false },
    //         { source: "/en/perfil-en", destination: "/en/perfil", locale: false },
    //         { source: "/ca/perfil-ca", destination: "/ca/perfil", locale: false },
    //         { source: "/en/planes-en", destination: "/en/planes", locale: false },
    //         { source: "/ca/planes-ca", destination: "/ca/planes", locale: false },
    //         { source: "/en/preguntas-frecuentes-en", destination: "/en/preguntas-frecuentes", locale: false },
    //         { source: "/ca/preguntas-frecuentes-ca", destination: "/ca/preguntas-frecuentes", locale: false },
    //         { source: "/en/recetas-en", destination: "/en/recetas", locale: false },
    //         { source: "/ca/recetas-ca", destination: "/ca/recetas", locale: false },
    //         { source: "/en/recetas-grid-en", destination: "/en/recetas-grid", locale: false },
    //         { source: "/ca/recetas-grid-ca", destination: "/ca/recetas-grid", locale: false },
    //         { source: "/en/recuperar-contrasena-en", destination: "/en/recuperar-contrasena", locale: false },
    //         { source: "/ca/recuperar-contrasena-ca", destination: "/ca/recuperar-contrasena", locale: false },
    //         { source: "/en/registrarme-en", destination: "/en/registrarme", locale: false },
    //         { source: "/ca/registrarme-ca", destination: "/ca/registrarme", locale: false },
    //     ];
    // },
};
