const { i18n } = require("./next-i18next.config");
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
            { source: "/en/profile", destination: "/en/perfil", locale: false },
            { source: "/ca/perfil", destination: "/ca/perfil", locale: false },

            { source: "/en/share-with-a-friend", destination: "/en/bono-regalo", locale: false },
            { source: "/ca/bo-regal", destination: "/ca/bono-regalo", locale: false },

            { source: "/en/redeem-voucher", destination: "/en/canjear-bono-regalo", locale: false },
            { source: "/ca/bescanviar-bo-regal", destination: "/ca/canjear-bono-regalo", locale: false },

            { source: "/en/how-does-it-work", destination: "/en/como-funciona", locale: false },
            { source: "/ca/com-funciona", destination: "/ca/como-funciona", locale: false },

            { source: "/en/config", destination: "/en/configuracion", locale: false },
            { source: "/ca/configuracio", destination: "/ca/configuracion", locale: false },

            { source: "/en/plans-details/:subscriptionId", destination: "/en/detalle-del-plan/:subscriptionId", locale: false },
            { source: "/ca/detall-del-pla/:subscriptionId", destination: "/ca/detalle-del-plan/:subscriptionId", locale: false },

            { source: "/en/choose-recipes/:orderId", destination: "/en/elegir-recetas/:orderId", locale: false },
            { source: "/ca/triar-receptes/:orderId", destination: "/ca/elegir-recetas/:orderId", locale: false },

            { source: "/en/payments-history", destination: "/en/historial-pagos", locale: false },
            { source: "/ca/historial-pagaments", destination: "/ca/historial-pagos", locale: false },

            { source: "/en/log-in", destination: "/en/iniciar-sesion", locale: false },
            { source: "/ca/iniciar-sessio", destination: "/ca/iniciar-sesion", locale: false },

            { source: "/en/plans", destination: "/en/planes", locale: false },
            { source: "/ca/plans", destination: "/ca/planes", locale: false },

            { source: "/en/weekly-menu", destination: "/en/menu-semanal", locale: false },
            { source: "/ca/menu-setmanal", destination: "/ca/menu-semanal", locale: false },

            { source: "/en/recover-password", destination: "/en/recuperar-contrasena", locale: false },
            { source: "/ca/recuperar-contrasenya", destination: "/ca/recuperar-contrasena", locale: false },

            { source: "/en/sign-in", destination: "/en/registrarme", locale: false },
            { source: "/ca/registrar-me", destination: "/ca/registrarme", locale: false },

            { source: "/en/additionals", destination: "/en/adicionales", locale: false },
            { source: "/ca/addicionals", destination: "/ca/adicionales", locale: false },

            { source: "/en/rate-recipes/:customerId", destination: "/en/valorar-recetas/:customerId", locale: false },
            { source: "/ca/valorar-receptes/:customerId", destination: "/ca/valorar-recetas/:customerId", locale: false },

            {
                source: "/en/faqs",
                destination: "/en/preguntas-frecuentes",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },

            {
                source: "/ca/preguntes-frequents",
                destination: "/ca/preguntas-frecuentes",
                locale: false,
            },
            {
                source: `/en/recipes`,
                destination: "/en/recetas",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                source: `/ca/receptes`,
                destination: "/ca/recetas",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                source: `/en/news`,
                destination: "/en/noticias",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                source: `/ca/noticies`,
                destination: "/ca/noticias",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                source: `/en/blog-cocina`,
                destination: "/en/blog-cocina",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                source: `/ca/blog-cocina`,
                destination: "/ca/blog-cocina",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
                source: `/en/legal-notice`,
                destination: "/en/aviso-legal",
                locale: false, // Use `locale: false` so that the prefix matches the desired locale correctly
            },
            {
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
});
