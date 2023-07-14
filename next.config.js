const { i18n } = require("./next-i18next.config");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

const ContentSecurityPolicy = `default-src 'self'; script-src 'report-sample' 'self' 'unsafe-eval' 'unsafe-inline' https://identitytoolkit.googleapis.com https://apis.google.com https://ws.hotjar.com/api/v2 http://js-na1.hs-scripts.com https://connect.facebook.net https://googleads.g.doubleclick.net https://js-na1.hs-scripts.com https://js.hs-analytics.net https://js.hs-banner.com https://js.stripe.com https://js.usemessages.com https://maps.googleapis.com https://script.hotjar.com https://static-tracking.klaviyo.com https://static.hotjar.com https://static.klaviyo.com http://static.klaviyo.com https://static.mailerlite.com https://vercel.live https://www.google-analytics.com https://www.googletagmanager.com https://cdnjs.cloudflare.com https://assets.calendly.com https://js.hsforms.net https://js.hsleadflows.net; style-src 'unsafe-inline' 'self' https://static.mailerlite.com https://assets.calendly.com; object-src 'none'; base-uri 'self'; connect-src 'self' https://securetoken.googleapis.com/ https://identitytoolkit.googleapis.com https://identitytoolkit.googleapis.com http://localhost:3001 https://api.hubspot.com https://api.letscooknow.es https://api.staging.letscooknow.es https://content.hotjar.io https://in.hotjar.com https://maps.googleapis.com https://region1.analytics.google.com https://region1.google-analytics.com https://stats.g.doubleclick.net https://www.google-analytics.com wss://wsp24.hotjar.com https://forms.hsforms.com https://api.hscollectedforms.com; font-src 'self' https://script.hotjar.com; frame-src 'self' https://auth.letscooknow.es http://auth.letscooknow.es https://letscook-001.firebaseapp.com/ https://app.hubspot.com https://js.stripe.com https://www.facebook.com https://static.mailerlite.com https://assets.calendly.com; img-src 'self' data: https://lets-cook-assets.s3.eu-west-3.amazonaws.com https://lets-cook-blog-assets.s3.eu-west-3.amazonaws.com https://lh3.googleusercontent.com https://track.hubspot.com https://www.facebook.com https://www.google-analytics.com https://www.google.com https://www.google.es https://www.googletagmanager.com; manifest-src 'self'; media-src 'self'; report-uri https://643c2f5df1e3671a2913697f.endpoint.csper.io/?v=1; worker-src 'none';`;

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
            {source: "/__/auth/:path*", destination: "https://letscook-001.firebaseapp.com/__/auth/:path*"},
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
                destination: "/planes?planSlug=plan-gourmet&    personas=2&recetas=3",
                permanent: true,
            },
        ];
    },
}

// next.config.js
module.exports = withBundleAnalyzer(nextConfig)


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
