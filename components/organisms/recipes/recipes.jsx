import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import classes from "./classesObject";

import SimpleRating from "../../molecules/starRating/starRating";

const Recipes = () => {
    const matches = useMediaQuery("(min-width:961px)");

    // matches > 378 (desktop view) -> false
    // matches < 378 (mobile view) -> true
    return (
        <>
            {/* <div className={classes.first}> */}
            <div className={matches ? classes.second : classes.mobile}>
                <div className={matches ? classes.third : classes.group5}>
                    <ArrowBackIcon />
                    <h1 className={classes.valueRecipes}>Valorar recetas</h1>
                </div>

                <div className={matches ? classes.pendingToValue : classes.pendingToValue2}>Recetas pendientes de valorar</div>

                <div className={matches ? classes.group1976 : classes.flexRow}>
                    {[...Array(20)].map((x, i) => {
                        return (
                            <div className={classes.group1018}>
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
                                            <SimpleRating />
                                        </div>
                                        <div className={classes.notValue}>NO VALORAR ESTA RECETA</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={matches ? classes.pendingToValue : classes.pendingToValue2}>Recetas valoradas</div>

                <div className={matches ? classes.group1976 : classes.flexRow}>
                    {[...Array(10)].map((x, i) => {
                        return (
                            <div className={classes.group1018}>
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
                                            <SimpleRating />
                                        </div>
                                        <div className={classes.notValue}>NO VALORAR ESTA RECETA</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* </div> */}
        </>
    );
};

export default Recipes;
