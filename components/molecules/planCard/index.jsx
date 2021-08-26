import React from 'react'
import { Typography, useTheme } from '@material-ui/core/';
import { RoundedButton } from '@atoms';
import { useRouter } from 'next/router';
import { usePlansStyles as useStyles } from "./styles";
import * as ga from '../../../helpers/ga'


const PlanCard = props => {
    const { push: navigateTo, locale } = useRouter();
    const theme = useTheme();
    const classes = useStyles();

    const goToPlans = () => {
        ga.event({
            action: "clic en lo quiero",
            params: {
                event_category: 'homepage',
                event_label: props.card.slug
            }
        })
        navigateTo({
            pathname: "/planes/[slug]",
            query: {
                slug: props.card.slug,
                personas: props.card.variants[0] ?.numberOfPersons || "",
                recetas: props.card.variants[0] ?.numberOfRecipes || "",
            }
        })
    }

    return (
        <div key={props.index} className={classes.card} style={{ backgroundImage: `url(${props.card.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', ...props.style }}>
            <div className={classes.overlay} >
                <div className={classes.cardContent}>
                    <Typography
                        style={{ textAlign: 'left', marginBottom: theme.spacing(1) }}
                        variant="h5"
                        color="initial">{props.card.name}</Typography>
                    <Typography
                        style={{ textAlign: 'left' }}
                        variant="body2"
                        color="initial">{props.card.description}</Typography>
                </div>
                <div className={classes.cardAction}>
                    <RoundedButton label="¡LO QUIERO!" style={{ width: '100%', minWidth: '1px', padding: '8px' }} onClick={goToPlans} />
                </div>
            </div>
        </div>
    )
}
export default PlanCard;


