import React from 'react'
import { Typography, useTheme } from '@material-ui/core/';
import { RoundedButton } from '@atoms';
import { useRouter } from 'next/router';
import { usePlansStyles as useStyles } from "./styles";


const PlanCard = props => {
    const { push: navigateTo } = useRouter();
    const theme = useTheme();
    const classes = useStyles();

    return (
        <div key={props.index} className={classes.card} style={{ backgroundImage: `url(${classes.img})`, ...props.style }}>
            <div className={classes.overlay} >
                <div className={classes.cardContent}>
                    <Typography
                        className={classes.paddingCardTitle}
                        variant="subtitle1"
                        color="initial">{props.name}</Typography>
                    <Typography
                        variant="body2"
                        color="initial">{props.description}</Typography>
                </div>
                <div className={classes.cardAction}>
                    <RoundedButton label="¡QUIERO ESTE PLAN!" onClick={() => navigateTo({
                        pathname: "/planes/[slug]",
                        query: {
                            slug: props.slug,
                            personas: 2,
                            recetas: 2
                        }
                    })} />
                </div>
            </div>
        </div>
    )
}

export default PlanCard;


