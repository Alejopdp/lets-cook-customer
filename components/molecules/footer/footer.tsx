// Utils & Config
import React, { useMemo } from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";

// Icons & Images
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import PinterestIcon from "@material-ui/icons/Pinterest";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Box, Link, useTheme } from "@material-ui/core";
import NextLink from "next/link";
import { useStyles } from "./styles";
import { useLang } from "@hooks";
import { localeRoutes, Routes } from "lang/routes/routes";
import { useRouter } from "next/router";

export const Footer = () => {
    const classes = useStyles();
    const { logoSection, paymentMethodsSection, root, footer } = classes;
    const [lang] = useLang("footer");
    const router = useRouter();
    const theme = useTheme();

    interface ILink {
        name: string;
        url: string;
    }

    interface FooterProps {
        links?: ILink[];
    }

    const _links: ILink[] = useMemo(
        () => [
            {
                name: lang.links.recipes,
                url: localeRoutes[router.locale][Routes["menu-semanal"]],
            },
            // {
            //     name: lang.links.bonoRegalo,
            //     url: "/bono-regalo",
            // },
            {
                name: lang.links.howItWorks,
                url: localeRoutes[router.locale][Routes["como-funciona"]],
            },
            {
                name: lang.links.faqs,
                url: localeRoutes[router.locale][Routes["preguntas-frecuentes"]],
            },
            {
                name: lang.links.blog,
                url: "/blog",
            },
            {
                name: lang.links.legal,
                url: localeRoutes[router.locale][Routes["aviso-legal"]],
            },
        ],
        [router.locale]
    );

    return (
        <div className={root} style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.background.default }}>
            <Grid container justifyContent="space-between" className={footer}>
                <Grid item xs={12} md={3} className={logoSection}>
                    <Grid style={{ marginTop: "16px" }}>
                        <Link href="https://www.instagram.com/letscook.es/" target="_blank" rel="noreferrer noopener">
                            <InstagramIcon style={{ margin: "8px", color: theme.palette.text.secondary }} />
                        </Link>
                        <Link href="https://www.facebook.com/Lets-cook-2399683106933532/" target="_blank" rel="noreferrer noopener">
                            <FacebookIcon style={{ margin: "8px", color: theme.palette.text.secondary }} />
                        </Link>
                        <Link href="https://www.pinterest.es/letscooknowes/" target="_blank" rel="noreferrer noopener">
                            <PinterestIcon style={{ margin: "8px", color: theme.palette.text.secondary }} />
                        </Link>
                        <Link href="https://www.youtube.com/channel/UCWmWuYmsvW5H2BWykUCAmZg" target="_blank" rel="noreferrer noopener">
                            <YouTubeIcon style={{ margin: "8px", color: theme.palette.text.secondary }} />
                        </Link>
                    </Grid>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Box display={"flex"} flexDirection={"column"} fontSize={16}>
                        {_links.map((link, index) => (
                            <NextLink href={link.url} key={index}>
                                {link.name}
                            </NextLink>
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={6} md={3}>
                    <Link
                        href="mailto:info@letscooknow.es"
                        underline="none"
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{ fontSize: 16 }}
                        color="textSecondary"
                    >
                        info@letscooknow.es
                    </Link>
                </Grid>

                <Grid item xs={12} md={3} className={paymentMethodsSection}>
                    <Image unoptimized src="/payments.png" width={367} height={181} alt="Pagos con tarjeta online" />
                </Grid>
            </Grid>
            <Grid item xs={12} className={footer} style={{ display: "flex", justifyContent: "center" }}>
                <Image unoptimized src="/LogoLetsCookR.png" width={1414} height={276} alt="LetsCookR" />
            </Grid>

            <Grid item xs={12} className={footer} style={{ display: "flex", justifyContent: "center" }}>
                <Image unoptimized src="/logos-enisa.png" width={1184} height={200} alt="Enisa" />
            </Grid>
            <Grid item xs={12} className={footer}>
                <Typography variant="body2" style={{ fontSize: "13px" }}>
                    LetsCook {new Date().getFullYear()} © - {lang.copyright}
                </Typography>
            </Grid>
        </div>
    );
};
