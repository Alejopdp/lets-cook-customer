// next.config.js
module.exports = {
    i18n: {
        // These are all the locales you want to support in
        // your application
        locales: ["en", "es"],
        // This is the default locale you want to be used when visiting
        // a non-locale prefixed path e.g. `/hello`
        defaultLocale: "es",
    },
    images: {
        domains: ["localhost", "cdn.shopify.com"],
    },
    // IT'S DEPRECATED
    // publicRuntimeConfig: {
    //   // Will be available on both server and client
    //   staticFolder: '/static',
    // },
};
