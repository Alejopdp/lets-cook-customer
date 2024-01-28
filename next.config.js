const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const ContentSecurityPolicy = `default-src 'self'; script-src 'report-sample' 'self' 'unsafe-eval' 'unsafe-inline' https://app.mailerlite.com  https://www.gtm.js  https://identitytoolkit.googleapis.com https://apis.google.com https://ws.hotjar.com/api/v2 http://js-na1.hs-scripts.com https://connect.facebook.net https://googleads.g.doubleclick.net https://js-na1.hs-scripts.com https://js.hs-analytics.net https://js.hs-banner.com https://js.stripe.com https://js.usemessages.com https://maps.googleapis.com https://script.hotjar.com https://static-tracking.klaviyo.com https://static.hotjar.com https://static.klaviyo.com http://static.klaviyo.com https://static.mailerlite.com https://vercel.live https://www.google-analytics.com https://www.googletagmanager.com https://cdnjs.cloudflare.com https://assets.calendly.com https://js.hsforms.net https://js.hsleadflows.net; style-src 'unsafe-inline' 'self' https://static.mailerlite.com https://assets.calendly.com; object-src 'none'; base-uri 'self'; connect-src 'self' https://www.googleapis.com https://securetoken.googleapis.com/ https://identitytoolkit.googleapis.com http://localhost:3000 http://localhost:3001 https://api.hubspot.com https://api.letscooknow.es https://api.staging.letscooknow.es https://content.hotjar.io https://in.hotjar.com https://maps.googleapis.com https://region1.analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://www.google-analytics.com wss://wsp24.hotjar.com https://forms.hsforms.com https://api.hscollectedforms.com; font-src 'self' https://script.hotjar.com; frame-src 'self' https://td.doubleclick.net https://auth.letscooknow.es http://localhost:3000 http://auth.letscooknow.es https://letscook-001.firebaseapp.com/ https://app.hubspot.com https://js.stripe.com https://www.facebook.com https://static.mailerlite.com https://assets.calendly.com; img-src 'self' data: https://lets-cook-assets.s3.eu-west-3.amazonaws.com https://lets-cook-blog-assets.s3.eu-west-3.amazonaws.com https://lh3.googleusercontent.com https://track.hubspot.com https://www.facebook.com https://www.google-analytics.com https://www.google.com https://www.google.es https://www.googletagmanager.com; manifest-src 'self'; media-src 'self'; report-uri https://643c2f5df1e3671a2913697f.endpoint.csper.io/?v=1; worker-src 'none';`;

const securityHeaders = [
    {
        key: "Content-Security-Policy",
        value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
    },
    // {
    //     key: "X-DNS-Prefetch-Control",
    //     value: "on",
    // },
    // {
    //     key: "Strict-Transport-Security",
    //     value: "max-age=31536000; includeSubDomains; preload",
    // },
    // {
    //     key: "X-Content-Type-Options",
    //     value: "nosniff",
    // },
    // {
    //     key: "X-XSS-Protection",
    //     value: "1; mode=block",
    // },
    // {
    //     key: "Referrer-Policy",
    //     value: "same-origin",
    // },
];

const nextConfig = {
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
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: securityHeaders,
            },
        ];
    },
    async rewrites() {
        return [
            { source: "/__/auth/:path*", destination: "https://letscook-001.firebaseapp.com/__/auth/:path*" },
            { source: "/en/profile", destination: "/en/perfil", locale: false },
            { source: "/ca/perfil", destination: "/ca/perfil", locale: false },

            { source: "/en/wallet", destination: "/en/monedero", locale: false },
            { source: "/ca/moneder", destination: "/ca/monedero", locale: false },

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
                destination: "/planes?planSlug=plan-gourmet&    personas=2&recetas=3",
                permanent: true,
            },

            { source: "/", destination: "https://letscook.es", permanent: true, basePath: false },
            { source: "/como-funciona", destination: "https://letscook.es/como-funciona/", permanent: true, basePath: false },
            { source: "/blog", destination: "https://letscook.es/blog/", permanent: true, basePath: false },
            { source: "/blogs/cocina", destination: "https://letscook.es/blog/", permanent: true, basePath: false },
            { source: "/blogs/noticias", destination: "https://letscook.es/blog/", permanent: true, basePath: false },
            { source: "/blogs/recetas", destination: "https://letscook.es/blog/", permanent: true, basePath: false },
            {
                source: "/blogs/cocina/bechamel-vegana-aprende-a-hacer-esta-receta-facil",
                destination: "https://letscook.es/bechamel-vegana-aprende-a-hacer-esta-receta-facil/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/bistec-encebollado-aprende-a-hacer-esta-receta-let-s-cook",
                destination: "https://letscook.es/bistec-encebollado-aprende-a-hacer-esta-receta-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/como-hacer-salmon-marinado",
                destination: "https://letscook.es/como-hacer-salmon-marinado/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/estofado-de-pollo-aprende-a-hacer-esta-receta-facil",
                destination: "https://letscook.es/estofado-de-pollo-aprende-a-hacer-esta-receta-facil/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-arroz-con-pollo",
                destination: "https://letscook.es/receta-de-arroz-con-pollo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-arroz-con-secreto-iberico",
                destination: "https://letscook.es/receta-de-arroz-con-secreto-iberico/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-bistec-con-arroz",
                destination: "https://letscook.es/receta-de-bistec-con-arroz/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-bistec-de-ternera-a-la-plancha",
                destination: "https://letscook.es/receta-de-bistec-de-ternera-a-la-plancha/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-bistec-empanado",
                destination: "https://letscook.es/receta-de-bistec-empanado/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-bistec-en-tiras",
                destination: "https://letscook.es/receta-de-bistec-en-tiras/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-boniato-al-horno",
                destination: "https://letscook.es/receta-de-boniato-al-horno/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-carne-de-ternera-con-verduras-al-estilo-chino",
                destination: "https://letscook.es/receta-de-carne-de-ternera-con-verduras-al-estilo-chino/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-croquetas-veganas",
                destination: "https://letscook.es/receta-de-croquetas-veganas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-croquetas-vegetarianas",
                destination: "https://letscook.es/receta-de-croquetas-vegetarianas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-ensalada-con-salmon-ahumado",
                destination: "https://letscook.es/receta-de-ensalada-con-salmon-ahumado/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-fajitas-de-carne-picada-y-verduras",
                destination: "https://letscook.es/receta-de-fajitas-de-carne-picada-y-verduras/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-fajitas-de-cerdo",
                destination: "https://letscook.es/receta-de-fajitas-de-cerdo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-garbanzos-con-espinacas",
                destination: "https://letscook.es/receta-de-garbanzos-con-espinacas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-hummus-de-lentejas",
                destination: "https://letscook.es/receta-de-hummus-de-lentejas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-macarrones-vegetarianos",
                destination: "https://letscook.es/receta-de-macarrones-vegetarianos/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-poke-vegetariano",
                destination: "https://letscook.es/receta-de-poke-vegetariano/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-pollo-a-la-naranja",
                destination: "https://letscook.es/receta-de-pollo-a-la-naranja/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-pollo-con-almendras",
                destination: "https://letscook.es/receta-de-pollo-con-almendras/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-pollo-con-esparragos",
                destination: "https://letscook.es/receta-de-pollo-con-esparragos/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-presa-iberica-guisada-con-patatas",
                destination: "https://letscook.es/receta-de-presa-iberica-guisada-con-patatas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-quesadillas-veganas",
                destination: "https://letscook.es/receta-de-quesadillas-veganas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-quinoa-con-salmon",
                destination: "https://letscook.es/receta-de-quinoa-con-salmon/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-ramen-vegano",
                destination: "https://letscook.es/receta-de-ramen-vegano/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-salmon-a-la-plancha",
                destination: "https://letscook.es/receta-de-salmon-a-la-plancha/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-salmon-ahumado",
                destination: "https://letscook.es/receta-de-salmon-ahumado/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-salmon-al-horno-con-limon",
                destination: "https://letscook.es/receta-de-salmon-al-horno-con-limon/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-salmon-con-salsa-de-tomate",
                destination: "https://letscook.es/receta-de-salmon-con-salsa-de-tomate/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-salmon-teriyaki",
                destination: "https://letscook.es/receta-de-salmon-teriyaki/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-secreto-de-cerdo-al-horno-con-patatas",
                destination: "https://letscook.es/receta-de-secreto-de-cerdo-al-horno-con-patatas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-secreto-iberico-a-la-plancha",
                destination: "https://letscook.es/receta-de-secreto-iberico-a-la-plancha/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-shoyu-ramen",
                destination: "https://letscook.es/receta-de-shoyu-ramen/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-solomillo-a-la-pimienta",
                destination: "https://letscook.es/receta-de-solomillo-a-la-pimienta/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-solomillo-de-cerdo-con-pure-de-manzana",
                destination: "https://letscook.es/receta-de-solomillo-de-cerdo-con-pure-de-manzana/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-solomillo-de-cerdo-en-salsa",
                destination: "https://letscook.es/receta-de-solomillo-de-cerdo-en-salsa/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-solomillo-glaseado",
                destination: "https://letscook.es/receta-de-solomillo-glaseado/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-tacos-de-ternera",
                destination: "https://letscook.es/receta-de-tacos-de-ternera/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-tacos-vegetarianos",
                destination: "https://letscook.es/receta-de-tacos-vegetarianos/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-tartar-de-salmon-y-aguacate",
                destination: "https://letscook.es/receta-de-tartar-de-salmon-y-aguacate/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-tortitas-de-calabacin-al-horno",
                destination: "https://letscook.es/receta-de-tortitas-de-calabacin-al-horno/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-wok-de-verduras-y-pollo",
                destination: "https://letscook.es/receta-de-wok-de-verduras-y-pollo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-yakisoba-con-ternera",
                destination: "https://letscook.es/receta-de-yakisoba-con-ternera/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/receta-de-yakisoba-pollo",
                destination: "https://letscook.es/receta-de-yakisoba-de-pollo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/salmon-al-horno-a-la-naranja",
                destination: "https://letscook.es/salmon-al-horno-a-la-naranja/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/salmon-al-horno-una-receta-facil-de-cocinar",
                destination: "https://letscook.es/salmon-al-horno-una-receta-facil-de-cocinar/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/solomillo-de-cerdo-al-horno-aprende-como-hacer-esta-receta",
                destination: "https://letscook.es/solomillo-de-cerdo-al-horno-aprende-como-hacer-esta-receta/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/fonts/avenirNextLtPro/AvenirNextLTPro-Regular.otf",
                destination: "https://letscook.es/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/fonts/avenirNextLtPro/AvenirNextLTPro-Bold.otf",
                destination: "https://letscook.es/",
                permanent: true,
                basePath: false,
            },
            { source: "/blogs/recetas/tagged/meal-prep", destination: "https://letscook.es/meal-prep/", permanent: true, basePath: false },
            {
                source: "/blogs/recetas/tagged/meal-kit-delivery-barcelona",
                destination: "https://letscook.es/meal-kit-delivery-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio",
                destination: "https://letscook.es/comida-a-domicilio/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/5-recetas-rapidas-y-sencillas-de-comida-asiatica",
                destination: "https://letscook.es/5-recetas-de-comida-asiatica-rapidas-y-sencillas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/searching-for-hellofresh-in-barcelona-let-s-cook-is-your-answer",
                destination: "https://letscook.es/en/searching-for-hellofresh-in-barcelona-letscook-is-your-answer/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/pollo-tikka-masala",
                destination: "https://letscook.es/receta-pollo-tikka-masala-con-arroz-por-laura-ciurans/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/meal-kit-delivery-spain",
                destination: "https://letscook.es/meal-kit-delivery-espana/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/quienes-somos",
                destination: "https://letscook.es/sobre-nosotros/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/productos-y-recetas",
                destination: "https://letscook.es/productos-y-recetas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-a-domicilio",
                destination: "https://letscook.es/recetas-a-domicilio/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/blue-apron",
                destination: "https://letscook.es/blue-apron/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/blue-apron-barcelona",
                destination: "https://letscook.es/blue-apron-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/blue-apron-spain",
                destination: "https://letscook.es/en/blue-apron-spain/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/hello-fresh",
                destination: "https://letscook.es/hello-fresh/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/hello-fresh-barcelona",
                destination: "https://letscook.es/hello-fresh-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/hello-fresh-spain",
                destination: "https://letscook.es/en/hello-fresh-spain/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/meal-kit-bercelona",
                destination: "https://letscook.es/kits-de-recetas-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/receive-a-10-discount-in-your-first-week-with-lets-cook",
                destination: "https://letscook.es/en/receive-a-15e-discount-your-first-week-with-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/favicon.png",
                destination: "https://letscook.es/wp-content/uploads/2023/11/Capa_1-3.png",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-asiatica",
                destination: "https://letscook.es/comida-asiatica/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/pollo-tikka-masala-con-arroz-por-laura-ciurans-nutricion-consciente",
                destination: "https://letscook.es/receta-pollo-tikka-masala-con-arroz-por-laura-ciurans/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/guia-de-reciclaje-de-let-s-cook",
                destination: "https://letscook.es/guia-de-reciclaje-de-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/meal-kit-delivery",
                destination: "https://letscook.es/meal-kit-delivery/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/meal-kit-spain",
                destination: "https://letscook.es/meal-kit-espana/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-saludables-para-cenar",
                destination: "https://letscook.es/recetas-saludables-para-cenar/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/meal-kit",
                destination: "https://letscook.es/en/meal-kits/",
                permanent: true,
                basePath: false,
            },
            { source: "/blogs/recetas", destination: "https://letscook.es/blog/", permanent: true, basePath: false },
            {
                source: "/blogs/noticias/nos-unimos-al-movimiento-zero-waste",
                destination: "https://letscook.es/nos-unimos-al-movimiento-zero-waste/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/fonts/avenirNextLtPro/AvenirNextLTPro-Medium.otf",
                destination: "https://letscook.es/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-saludables",
                destination: "https://letscook.es/recetas-saludables/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/la-comida-casera-a-domicilio-y-sus-colores",
                destination: "https://letscook.es/la-comida-casera-a-domicilio-y-sus-colores/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-asiaticas",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-con-bistec",
                destination: "https://letscook.es/recetas-con-bistec/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-con-salmon",
                destination: "https://letscook.es/recetas-con-salmon/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-con-salmon-ahumado",
                destination: "https://letscook.es/recetas-con-salmon-ahumado/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-con-solomillo",
                destination: "https://letscook.es/recetas-con-solomillo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-de-pollo",
                destination: "https://letscook.es/recetas-de-pollo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-mexicanas",
                destination: "https://letscook.es/recetas-mexicanas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/encuentra-tu-menu-semanal-a-domicilio-sin-lactosa-en-let-s-cook",
                destination: "https://letscook.es/encuentra-tu-menu-semanal-a-domicilio-sin-lactosa/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-secreto-iberico",
                destination: "https://letscook.es/recetas-secreto-iberico/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-veganas",
                destination: "https://letscook.es/recetas-veganas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-vegetarianas",
                destination: "https://letscook.es/recetas-vegetarianas/",
                permanent: true,
                basePath: false,
            },
            { source: "/blogs/cocina", destination: "https://letscook.es/blog/", permanent: true, basePath: false },
            {
                source: "/blogs/recetas/tagged/blue-apron-espana",
                destination: "https://letscook.es/blue-apron-espana/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/hello-fresh-espana",
                destination: "https://letscook.es/hello-fresh-espana/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/omparativa-del-gasto-en-comida-supermercado-vs-lets-cook",
                destination: "https://letscook.es/comparativa-del-gasto-en-comida-supermercado-vs-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/food-delivery-barcelona",
                destination: "https://letscook.es/food-delivery-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/el-boom-de-los-meal-kits-en-el-panorama-poscoronavirus",
                destination: "https://letscook.es/el-boom-de-los-meal-kits-en-el-panorama-poscoronavirus/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/ensaladas-deliciosas",
                destination: "https://letscook.es/ensaladas-deliciosas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/meal-prep-barcelona",
                destination: "https://letscook.es/meal-prep/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/cuanto-cuesta-realmente-un-kit-de-comida-a-domicilio",
                destination: "https://letscook.es/cuanto-cuesta-realmente-un-kit-de-recetas-a-domicilio/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/llegaremos-a-ver-blue-apron-en-barcelona-las-inciertas-perspectivas-de-un-gigante-del-sector",
                destination: "https://letscook.es/llegaremos-a-ver-blue-apron-en-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/el-top-5-de-empresas-de-meal-kits-en-el-mundo",
                destination: "https://letscook.es/el-top-5-de-empresas-de-meal-kits-en-el-mundo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/la-mejor-alternativa-a-hello-fresh-en-barcelona-se-llama-let-s-cook",
                destination: "https://letscook.es/la-mejor-alternativa-a-hellofresh-en-barcelona-se-llama-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/eixample-pedralbes-esplugues-y-mas-alla-el-reparto-a-domicilio-de-meal-kits-en-barcelona",
                destination:
                    "https://letscook.es/eixample-pedralbes-esplugues-y-mas-alla-el-reparto-a-domicilio-de-meal-kits-en-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-badalona",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-barcelona",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-castelldefels",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-eixample",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-esplugues",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-gava",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-pedralbes",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-sant-cugat",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/los-sabores-de-las-especias",
                destination: "https://letscook.es/los-sabores-de-las-especias/",
                permanent: true,
                basePath: false,
            },
            { source: "/recetas", destination: "https://letscook.es/blog/", permanent: true, basePath: false },
            {
                source: "/blogs/cocina/tagged/recetas-mexicanas",
                destination: "https://letscook.es/recetas-mexicanas/",
                permanent: true,
                basePath: false,
            },
            { source: "/en", destination: "https://letscook.es/en/", permanent: true, basePath: false },
            { source: "/ca", destination: "https://letscook.es/ca/", permanent: true, basePath: false },
            { source: "/preguntas-frecuentes", destination: "https://letscook.es/preguntas-frecuentes/", permanent: true, basePath: false },
            { source: "/es", destination: "https://letscook.es/", permanent: true, basePath: false },
            {
                source: "/blogs/recetas/tagged/pad-thai",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/receta-saludable",
                destination: "https://letscook.es/recetas-saludables/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/receive-a-15-discount-in-your-first-week-with-lets-cook",
                destination: "https://letscook.es/en/receive-a-15e-discount-your-first-week-with-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/kits-de-recetas-a-domicilio-descubre-una-nueva-forma-de-cocinar-en-casa",
                destination: "https://letscook.es/kits-de-recetas-a-domicilio-descubre-una-nueva-forma-de-cocinar-en-casa/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/receta-comida-asiatica.atom",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/tagged/recetas-con-bistec",
                destination: "https://letscook.es/recetas-con-bistec/",
                permanent: true,
                basePath: false,
            },
            { source: "/en/faqs", destination: "https://letscook.es/en/faqs/", permanent: true, basePath: false },
            {
                source: "/blogs/noticias/cocina-con-let-s-cook-tipos-de-corte-de-verduras",
                destination: "https://letscook.es/cocina-con-letscook-tipos-de-corte-de-verduras/",
                permanent: true,
                basePath: false,
            },
            { source: "/bono-regalo", destination: "https://landing.letscooknow.es/bonoregalo", permanent: true, basePath: false },
            {
                source: "/blogs/noticias/por-que-elegir-los-meal-kits-de-let-s-cook",
                destination: "https://letscook.es/por-que-elegir-los-meal-kits-de-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/cocina-de-proximidad-ingredientes-locales-y-atencion-personalizada",
                destination: "https://letscook.es/cocina-de-proximidad-ingredientes-locales-y-atencion-personalizada/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-saludables-para-cenar.atom",
                destination: "https://letscook.es/recetas-saludables-para-cenar/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/will-Blue-Apron-come-to-Barcelona",
                destination: "https://letscook.es/en/will-blue-apron-come-to-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/tagged/recetas-secreto-iberico",
                destination: "https://letscook.es/recetas-secreto-iberico/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/bistec-al-romero",
                destination: "https://letscook.es/recetas-con-bistec/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/kit-de-iniciacion-al-veganismo",
                destination: "https://letscook.es/recetas-veganas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/comida-vegana-a-domicilio-descubre-las-deliciosas-opciones-de-lets-cook",
                destination: "https://letscook.es/comida-vegana-a-domicilio-descubre-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/tagged/recetas-de-pollo",
                destination: "https://letscook.es/recetas-de-pollo/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/tagged/recetas-vegetarianas",
                destination: "https://letscook.es/recetas-vegetarianas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/rollitos-de-verano",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/abordando-el-desperdicio-de-alimentos-en-espana-con-los-kits-para-cocinar-de-let-s-cook",
                destination: "https://letscook.es/abordando-el-desperdicio-de-alimentos-con-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/receta-pad-thai",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/noticias/hablan-de-nosotros-let-s-cook-en-los-medios-y-opiniones-destacadas",
                destination: "https://letscook.es/hablan-de-nosotros-letscook-en-los-medios/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilo",
                destination: "https://letscook.es/comida-a-domicilio/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/receta-pure-de-coliflor",
                destination: "https://letscook.es/recetas-saludables/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilio-casteldefels",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-vegana-online",
                destination: "https://letscook.es/recetas-veganas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/meal-kit-barcelona",
                destination: "https://letscook.es/kits-de-recetas-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-a-domicilo-eixample",
                destination: "https://letscook.es/comida-a-domicilio-barcelona/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/receta-comida-asiatica",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/tagged/recetas-con-salmon-ahumado",
                destination: "https://letscook.es/receta-de-salmon-ahumado/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-con-kale",
                destination: "https://letscook.es/recetas-saludables/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/rollitos-vietnamitas",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/garam-masala",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/cocina/tagged/recetas-asiaticas",
                destination: "https://letscook.es/recetas-asiaticas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/recetas-con-kale-superalimento",
                destination: "https://letscook.es/recetas-saludables/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/tagged/comida-vegana-oni",
                destination: "https://letscook.es/recetas-veganas/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/recetas/comparativa-del-gasto-en-comida-supermercado-vs-lets-cook",
                destination: "https://letscook.es/comparativa-del-gasto-en-comida-supermercado-vs-letscook/",
                permanent: true,
                basePath: false,
            },
            {
                source: "/blogs/:slug*",
                destination: "https://letscook.es/blog",
                permanent: true,
                basePath: false,
            },
        ];
    },
};

// next.config.js
module.exports = withBundleAnalyzer(nextConfig);

// Injected content via Sentry wizard below

const { withSentryConfig } = require("@sentry/nextjs");

module.exports = withSentryConfig(
    module.exports,
    {
        silent: true,
        org: "lets-cook-now",
        project: "customer-frontend",
    },
    {
        // Upload a larger set of source maps for prettier stack traces (increases build time)
        widenClientFileUpload: true,

        // Transpiles SDK to be compatible with IE11 (increases bundle size)
        transpileClientSDK: true,

        // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
        tunnelRoute: "/monitoring",

        // Hides source maps from generated client bundles
        hideSourceMaps: true,

        // Automatically tree-shake Sentry logger statements to reduce bundle size
        disableLogger: true,
    }
);
