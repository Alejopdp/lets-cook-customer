import React from 'react'
import { Typography, useTheme } from '@material-ui/core/';
import { RoundedButton } from '@atoms';
import { useRouter } from 'next/router';
import { usePlansStyles as useStyles } from "./styles";


const PlanCard = props => {
    const { push: navigateTo, locale } = useRouter();
    const theme = useTheme();
    const classes = useStyles();
    console.log('props.card', props.card)
    return (
        <div key={props.index} className={classes.card} style={{ backgroundImage: `url(${props.card.imageUrl})`, ...props.style }}>
            <div className={classes.overlay} >
                <div className={classes.cardContent}>
                    <Typography
                        style={{ textAlign: 'left', marginBottom: theme.spacing(1) }}
                        variant="subtitle1"
                        color="initial">{props.card.name}</Typography>
                    <Typography
                        style={{ textAlign: 'left' }}
                        variant="body2"
                        color="initial">{props.card.description}</Typography>
                </div>
                <div className={classes.cardAction}>
                    <RoundedButton label="¡QUIERO ESTE PLAN!" style={{ width: '100%', minWidth: '1px', padding: '8px' }} onClick={() => navigateTo({
                        pathname: "/planes/[slug]",
                        query: {
                            slug: props.card.slug,
                            personas: props.card.variants[0] ?.numberOfPersons || "",
                            recetas: props.card.variants[0] ?.numberOfRecipes || "",
                        }
                    })} />
                </div>
            </div>
        </div>
    )
}
export default PlanCard;


