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
import { useStyles } from './styles';

interface ILink {
    name: string;
    url: string;
}

interface FooterProps {
    links?: ILink[]
}

const _links: ILink[] = [
    {
        name: "Recetas",
        url: "/recetas",
    },
    {
        name: "Bono regalo",
        url: "/",
    },
    {
        name: "¿Cómo funciona?",
        url: "/como-funciona",
    },
    {
        name: "Preguntas frecuentes",
        url: "/preguntas-frecuentes",
    },
    {
        name: "Blog",
        url: "/blogs/recetas",
    },
    {
        name: "Aviso legal",
        url: "/aviso-legal",
    },
];

export const Footer = memo(({ links = _links }: FooterProps) => {
    const classes = useStyles();
    const { root, footer, marg1 } = classes;

    return (
        <div className={root}>
            <Grid container justify="space-between" className={footer}>
                <Grid item>
                    <Link href='/'>
                        <Image src="/logo.png" width={174} height={60} />
                    </Link>
                    <Grid style={{ marginTop: '16px' }}>
                        <InstagramIcon
                            // fontSize="medium"
                            style={{ margin: "8px" }}
                        />
                        <FacebookIcon
                            // fontSize="medium"
                            style={{ margin: "8px" }}
                        />
                        <PinterestIcon
                            // fontSize="medium"
                            style={{ margin: "8px" }}
                        />
                        <YouTubeIcon
                            // fontSize="medium"
                            style={{ margin: "8px" }}
                        />
                    </Grid>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1" className={marg1}>
                        Menú
                    </Typography>

                    {links.map((link, index) => (
                        <Link href={link.url} key={index}>
                            <Typography variant="body1" color="textSecondary">
                                {link.name}
                            </Typography>
                        </Link>
                    ))}
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1" className={marg1}>
                        Soporte
                    </Typography>

                    <Typography variant="body1">info@letscooknow.es</Typography>
                    <Typography variant="body1">+34 686 312 132</Typography>
                </Grid>

                <Grid item>
                    <Typography variant="subtitle1" className={marg1}>
                        Medios de pago
                    </Typography>

                    <Image src="/payment.png" width={300} height={160} />
                </Grid>
            </Grid>

            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
                className={footer}
            >
                <Typography variant="body2" style={{ fontSize: '13px' }}>
                    Let's Cook 2021 - Todos los derechos reservados
                </Typography>
                <Image src="/enisa.png" width={50} height={100} />
            </Grid>
        </div>
    );
});
