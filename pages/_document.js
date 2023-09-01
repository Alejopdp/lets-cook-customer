import React from "react";
import Script from "next/script";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";
import theme from "../theme";

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="es">
                <Head>
                    {/* PWA primary color */}
                    <meta name="theme-color" content={theme.palette.primary.main} />
                    <script async src="/script/facebook.js"></script>
                    <noscript>
                        <img
                            height={1}
                            width={1}
                            style={{ display: "none" }}
                            src="https://www.facebook.com/tr?id=817476268618042&ev=PageView&noscript=1"
                            alt="facebook-pixel"
                        />
                    </noscript>
                    <script async src="/script/hotjar.js"></script>
                    <script async src="/script/ml.js"></script>
                    <script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/5350114.js"></script>

                    {/* <Script src="https://www.google-analytics.com/analytics.js" /> */}
                    {/* <script async src="/script/google.js"></script> */}
                    <meta name="p:domain_verify" content="cf716535d91b916766dee3945c922d08" />
                    {/* <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                        page_path: window.location.pathname,
                        });
                    `,
                        }}
                    /> */}
                    {/* <!-- Google Tag Manager --> */}
                    {/* <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        (function(w,d,s,l,i) {w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-5M7F3L5');`,
                        }}
                    /> */}
                    {/*<!-- End Google Tag Manager -->*/}
                </Head>
                <body>
                    {/* <!-- Google Tag Manager (noscript) --> */}
                    {/* <noscript>
                        <iframe
                            src="https://www.googletagmanager.com/ns.html?id=GTM-5M7F3L5"
                            height="0"
                            width="0"
                            style={{ display: "none", visibility: "hidden" }}
                        ></iframe>
                    </noscript> */}
                    {/* <!-- End Google Tag Manager (noscript) → */}
                    <Main />
                    <NextScript />
                    <script async type="text/javascript" src="//static.klaviyo.com/onsite/js/klaviyo.js?company_id=YqjdW7" />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
