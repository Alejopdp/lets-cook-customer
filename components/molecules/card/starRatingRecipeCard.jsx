import React from "react";

import SimpleRating from "../starRating/starRating";

const classes = {
    group1018: "group1018",
    group1005: "group1005",
    group1009: "group1009",
    group1531: "group1531",

    recipeTitle: "recipeTitle proximanova-16px",
    p: "p opensans-14px",
    delivered: "opensans-14px-2",
    date: "opensans-14px-3",
    overlapGroup: "overlapGroup",
    notValue: "text1 proximanova-13px",
};

const RatedRecipeCard = ({ handleClickOpenRecipeModal, rated }) => {
    return (
        <>
            <div className={classes.group1018} key={Math.random()}>
                <div>
                    <img
                        className={classes.group1005}
                        src="https://live.mrf.io/statics/i/ps/www.cocinacaserayfacil.net/wp-content/uploads/2020/03/Recetas-faciles-de-cocinar-y-sobrevivir-en-casa-al-coronavirus_2.jpg?width=1200&enable=upscale"
                        alt=""
                    />
                </div>
                <div className={classes.group1009}>
                    <div className={classes.recipeTitle}>Salmón con quinoa</div>
                    <p className={classes.p}>
                        <span className={classes.delivered}>Entregado 1 vez</span>
                        <span className={classes.date}> (ultima entrega el 1-7 mayo)</span>
                    </p>
                    <div className={classes.overlapGroup}>
                        <div className={classes.group1531}>
                            <SimpleRating handleClickOpenRecipeModal={handleClickOpenRecipeModal} />
                        </div>
                        {rated ? null : <div className={classes.notValue}>NO VALORAR ESTA RECETA</div>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default RatedRecipeCard;
