const { i18n } = require("./next-i18next.config");
// const { Routes, localeRoutes } = require("./lang/routes/routes");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

// next.config.js
module.exports = withBundleAnalyzer({
    i18n,
    images: {
        domains: [
            "localhost",
            "cdn.shopify.com",
            "lets-cook-assets.s3.eu-west-3.amazonaws.com",
            "images.unsplash.com",
            "www.facebook.com",
            "lets-cook-blog-assets.s3.eu-west-3.amazonaws.com",
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        // Warning: Dangerously allow production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
    },
    async rewrites() {
        return [
            {
                source: "/en/faqs",
                destination: "/en/preguntas-frecuentes",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/en${localeRoutes["en"][Routes["recetas"]]}`,
                source: `/en/recipes`,
                destination: "/en/recetas",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/ca${localeRoutes["ca"][Routes["recetas"]]}`,
                source: `/ca/receptes`,
                destination: "/ca/recetas",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/en${localeRoutes["en"][Routes["noticias"]]}`,
                source: `/en/news`,
                destination: "/en/noticias",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/ca${localeRoutes["ca"][Routes["noticias"]]}`,
                source: `/ca/noticies`,
                destination: "/ca/noticias",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/en${localeRoutes["en"][Routes["blog-cocina"]]}`,
                source: `/en/blog-cocina`,
                destination: "/en/blog-cocina",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/ca${localeRoutes["ca"][Routes["blog-cocina"]]}`,
                source: `/ca/blog-cocina`,
                destination: "/ca/blog-cocina",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/en${localeRoutes["en"][Routes["aviso-legal"]]}`,
                source: `/en/legal-notice`,
                destination: "/en/aviso-legal",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                // source: `/ca${localeRoutes["ca"][Routes["aviso-legal"]]}`,
                source: `/ca/avis-legal`,
                destination: "/ca/aviso-legal",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
        ];
    },
    async redirects() {
        return [
            {
                source: "/a/l/en",
                destination: "/en",
                permanent: false,
            },
            // {
            //     source: "/?lang=en", // Cant catch param} "/?lang=en": // Cant catch param,
            //     destination: "/",
            //     permanent: true,
            // },
            { source: "/account/login", destination: "/es/iniciar-sesisón", permanent: true },
            { source: "/collections/frontpage", destination: "/es/menu-semanal", permanent: true },
            { source: "/pages/preguntas-frecuentes", destination: "/en/como-funciona", permanent: true },
            { source: "/pages/planes-semanales", destination: "/planes?planSlug=plan-familiar&personas=3&recetas=3", permanent: true },
            // { source: "https://ca.letscooknow.es/", destination: "/ca", permanent: true },
            { source: "/account/login", destination: "/en/profile", permanent: true },
            { source: "/cart", destination: "/", permanent: true },
            { source: "/pages/recipe-submitted", destination: "/", permanent: true }, // TO DO: Cant catch param} "/pages/recipe-submitted?product_id=3169772503140": // TO DO: Cant catch par, permanent: trueam,
            { source: "/pages/subscriptions-list", destination: "/iniciar-sesion", permanent: true },
            { source: "/pages/preguntas-frecuentes", destination: "/preguntas-frecuentes", permanent: true },
            { source: "/account", destination: "/en/profile", permanent: true },
            { source: "/products/plan-gourmet", destination: "/planes?planSlug=plan-gourmet&personas=2&recetas=3", permanent: true },
            { source: "/pages/como-funciona", destination: "/en/how-does-it-work", permanent: true },
            {
                source: "/collections/planes-de-suscripcion/products/plan-gourmet",
                destination: "/planes?planSlug=plan-gourmet&personas=2&recetas=3",
                permanent: true,
            },
            { source: "/products/plan-ahorro", destination: "/planes?planSlug=plan-ahorro&recetas=3&personas=2", permanent: true },
            { source: "/tools/recurring/login", destination: "/log-in", permanent: true },
            {
                source: "/collections/plan-semanal-vegetariano",
                destination: "/planes?planSlug=plan-vegetariano&recetas=3&personas=2",
                permanent: true,
            },
            {
                source: "/products/plan-vegetariano",
                destination: "/planes?planSlug=plan-vegetariano&recetas=3&personas=2",
                permanent: true,
            },
            { source: "/pages/recipe-submitted", destination: "/perfil", permanent: true },
            { source: "/pages/preguntas-frecuentes-faq", destination: "/preguntas-frecuentes", permanent: true },
            { source: "/collections/adicionales", destination: "/adicionales", permanent: true },
            {
                source: "/collections/planes-de-suscripcion/products/plan-semanal-familiar",
                destination: "/planes?planSlug=plan-familiar&personas=3&recetas=3",
                permanent: true,
            },
            { source: "/products/adicional-desayunos-saludables", destination: "/adicionales", permanent: true },
            {
                source: "/collections/planes-de-suscripcion/products/plan-ahorro",
                destination: "/planes?planSlug=plan-ahorro&recetas=3&personas=2",
                permanent: true,
            },
            { source: "/account/register", destination: "/sign-up", permanent: true },
            {
                source: "/collections/planes-de-suscripcion/products/plan-vegetariano",
                destination: "/planes?planSlug=plan-vegetariano&recetas=3&personas=2",
                permanent: true,
            },
            { source: "/pages/recipe-submitted", destination: "/iniciar-sesion", permanent: true },
            { source: "/products/bono-regalo", destination: "/bono-regalo", permanent: true },
            {
                source: "/a/l/en/pages/planes-semanales",
                destination: "/planes?planSlug=plan-familiar&personas=3&recetas=3",
                permanent: true,
            },
            {
                source: "/products/plan-semanal-familiar",
                destination: "/planes?planSlug=plan-familiar&personas=3&recetas=3",
                permanent: true,
            },
            { source: "/a/l/en/pages/preguntas-frecuentes", destination: "/en/faqs", permanent: true },
            { source: "/pages/condiciones-generales-de-contratacion", destination: "/aviso-legal", permanent: true },
            {
                source: "/products/plan-gourmet",
                destination: "/planes?planSlug=plan-gourmet&personas=2&recetas=3",
                permanent: true,
            },
            { source: "/products/plan-gourmet", destination: "/planes?planSlug=plan-gourmet&personas=2&recetas=3", permanent: true },
            { source: "/pages/aviso-legal-y-condiciones-generales-de-uso-del-sitio-web", destination: "/aviso-legal", permanent: true },
            { source: "/collections/all", destination: "/menu-semanal", permanent: true },
            { source: "/plan-vegano", destination: "/planes?planSlug=plan-vegano&recetas=3&personas=2", permanent: true },
            {
                source: "/collections/planes-de-suscripcion/products/plan-gourmet",
                destination: "/planes?planSlug=plan-gourmet&personas=2&recetas=3",
                permanent: true,
            },
            {
                source: "/collections/planes-de-suscripcion/products/plan-semanal-vegano",
                destination: "/planes?planSlug=plan-vegano&recetas=3&personas=2",
                permanent: true,
            },
            {
                source: "/collections/planes-de-suscripcion/products/plan-ahorro",
                destination: "/planes?planSlug=plan-ahorro&recetas=3&personas=2",
                permanent: true,
            },
            {
                source: "/collections/planes-de-suscripcion/products/plan-ahorro",
                destination: "/planes?planSlug=plan-ahorro&recetas=3&personas=2",
                permanent: true,
            },
            {
                source: "/collections/planes-de-suscripcion/products/plan-gourmet",
                destination: "/planes?planSlug=plan-gourmet&personas=2&recetas=3",
                permanent: true,
            },
        ];
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
});
