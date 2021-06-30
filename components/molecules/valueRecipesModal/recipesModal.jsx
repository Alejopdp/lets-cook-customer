// Utils & Config
import React from "react";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

// External Components
import Modal from "../../atoms/modal/modal";

const classes = {
    // desktop
    container: "container-modal",
    desktop: "blog-page-19 screen-1",
    calificarReceta: "text-modal-1 proximanova-modal-24",
    food: "food",
    food1: "food-1 proximanova-modal-16",
    textDesktop: "text-modal-2 opensans-14px",
    openSans14v2: "opensans-14px-2",
    openSans14v3: "opensans-14px-3",
    textarea: "text-modal-3 proximanova-dove-gray-16px group1687 border-1px-celeste",
    textCalificarReceta: "text-modal-4 proximanova-modal-18",

    group1960: "group1690",
    group174: "group714",
    group1685: "group1685",
    group1686: "group1686",
    group1688: "group1688",
    group964: "group964",
    //mobile
    mobile: "mobile-modal screen-1",
    calificarRecetaMobile: "calificar-receta proximanova-modal-24",
    textMobile: "text5 opensans-14px",
    textCalificarRecetaMobie: "calificar-receta-1 proximanova-modal-18",

    group853: "group-853",
    group2019: "group2019",
};

const RecipesModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Modal
            open={props.open}
            handleClose={props.handleClose}
            handlePrimaryButtonClick={props.handlePrimaryButtonClick}
            fullScreen={fullScreen}
        >
            <div className={classes.container}>
                <div className={fullScreen ? classes.mobile : classes.desktop}>
                    <div className={classes.group1960}>
                        <div className={fullScreen ? classes.group853 : classes.group174}>
                            <div className={fullScreen ? classes.calificarRecetaMobile : classes.calificarReceta}>Calificar Receta</div>
                        </div>
                        <div className={fullScreen ? classes.group2019 : null}>
                            <div className={classes.group1685}>
                                <img
                                    className={classes.food}
                                    src="https://anima-uploads.s3.amazonaws.com/projects/60d5d15a28772f7944010212/releases/60d796d941e2212c658d3f7d/img/salmo-n-con-quinoa-8@1x.png"
                                    alt=""
                                />
                                <div className={classes.group1686}>
                                    <div className={classes.food1}>Salmón con quinoa</div>
                                    <p className={fullScreen ? classes.textMobile : classes.textDesktop}>
                                        <span className={classes.openSans14v2}>Entregado 1 vez</span>
                                        <span className={classes.openSans14v3}>(ultima entrega el 1-7 mayo)</span>
                                    </p>
                                </div>
                            </div>
                            <div className={classes.group1688}>{/* ACA VAN LAS ESTRELLAS */}</div>

                            <textarea
                                className={classes.textarea}
                                placeholder="Ingrese aqui sus comentarios sobre la receta (opcional)"
                                rows="4"
                            />

                            <button className={classes.group964}>
                                <div className={fullScreen ? classes.textCalificarRecetaMobie : classes.textCalificarReceta}>
                                    CALIFICAR RECETA
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RecipesModal;
