// Utils & Config
import React, { memo } from "react";

// External components
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Image from "next/image";

// Icons & Images
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import PinterestIcon from "@material-ui/icons/Pinterest";
import YouTubeIcon from "@material-ui/icons/YouTube";
import { Link } from "@material-ui/core";
import { useStyles } from "./styles";
import { useLang } from '@hooks';


export const Footer = () => {
    const classes = useStyles();
    const { logoSection, paymentMethodsSection, root, footer, marg1 } = classes;
    const [lang] = useLang('footer');

    interface ILink {
        name: string;
        url: string;
    }

    interface FooterProps {
        links?: ILink[];
    }

    const _links: ILink[] = [
        {
            name: lang.links.recipes,
            url: "/recetas",
        },
        // {
        //     name: lang.links.bonoRegalo,
        //     url: "/bono-regalo",
        // },
        {
            name: lang.links.howItWorks,
            url: "/como-funciona",
        },
        {
            name: lang.links.faqs,
            url: "/preguntas-frecuentes",
        },
        // {
        //     name: lang.links.blog,
        //     url: "/blogs/recetas",
        // },
        {
            name: lang.links.legal,
            url: "/aviso-legal",
        },
    ];


    return (
        <div className={root}>
            <Grid container justify="space-between" className={footer}>
                <Grid item xs={12} md={3} className={logoSection}>
                    <Link href="/">
                        <Image src="/logo.png" width={174} height={60} alt="Lets cook now" />
                    </Link>
                    <Grid style={{ marginTop: "16px" }}>
                        <Link href="https://www.instagram.com/letscook.now/" target="_blank" rel="noreferrer noopener">
                            <InstagramIcon style={{ margin: "8px" }} />
                        </Link>
                        <Link href="https://www.facebook.com/Lets-cook-2399683106933532/" target="_blank" rel="noreferrer noopener">
                            <FacebookIcon style={{ margin: "8px" }} />
                        </Link>
                        <Link href="https://www.pinterest.es/letscooknowes/" target="_blank" rel="noreferrer noopener">
                            <PinterestIcon style={{ margin: "8px" }} />
                        </Link>
                        <Link href="https://www.youtube.com/channel/UCWmWuYmsvW5H2BWykUCAmZg" target="_blank" rel="noreferrer noopener">
                            <YouTubeIcon style={{ margin: "8px" }} />
                        </Link>
                    </Grid>
                </Grid>

                <Grid item xs={6} md={3}>
                    {/* <Typography variant="subtitle1" className={marg1}>
                        Menú
                    </Typography> */}

                    {_links.map((link, index) => (
                        <Link href={link.url} key={index} underline="none">
                            <Typography variant="body1" color="textSecondary">
                                {link.name}
                            </Typography>
                        </Link>
                    ))}
                </Grid>

                <Grid item xs={6} md={3}>
                    {/* <Typography variant="subtitle1" className={marg1}>
                        Soporte
                    </Typography> */}
                    <Link href="mailto:info@letscooknow.es" underline="none" target="_blank" rel="noreferrer noopener">
                        <Typography variant="body1" color="textSecondary">
                            info@letscooknow.es
                        </Typography>
                    </Link>
                    {/* <Link href="https://wa.me/34686312132" underline="none" target="_blank" rel="noreferrer noopener">
                        <Typography variant="body1" color="textSecondary">
                            +34 686 312 132
                        </Typography>
                    </Link> */}
                </Grid>

                <Grid item xs={6} md={3} className={paymentMethodsSection}>
                    {/* <Typography variant="subtitle1" className={marg1}>
                        Medios de pago
                    </Typography> */}
                    <Image src="/payment.png" width={548} height={181} alt="Pagos con tarjeta online" />
                </Grid>
            </Grid>

            <Grid item xs={12} className={footer}>
                <Typography variant="body2" style={{ fontSize: "13px" }}>
                    {lang.copyright}
                </Typography>
            </Grid>
        </div>
    );
};
