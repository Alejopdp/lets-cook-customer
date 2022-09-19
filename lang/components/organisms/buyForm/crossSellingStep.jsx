import { productosAdicionales } from "../faqsSection";

export const crossSellingStep = {
    es: {
        title: {
            recipesChosen: "¡Enhorabuena! Guardamos tu elección.",
            withoutRecipes: "¡Enhorabuena! Muchas gracias por tu compra",
        },
        subtitle: "Ya puedes ir encendiendo los fogones. ¿Te gustaría disfrutar un adicional con tu plan?",
        purchaseBtnText: "Pagar adicionales",
        goToProfileBtnText: "Ir a mi perfil",
        faqs: {
            title: "Preguntas frecuentes",
            subtitle: "¿Necesitas ayuda? Revisa nuestras preguntas frecuentes o consulta en nuestro chat",
            accordions: productosAdicionales.es.accordions,
        },
        snackbars: {
            success: {},
            error: {
                paymentMethodAuthentication: "Error al autenticar el método de pago",
                paymentCompletion: "Error al completar el pago",
            },
        },
    },
    en: {
        title: {
            recipesChosen: "Thank you! We have saved your selection.",
            withoutRecipes: "Thank you for your order!",
        },
        subtitle: "Now you can start heating up your stoves. Would you like to enjoy an additional product with your plan?",
        purchaseBtnText: "Pay additional products",
        goToProfileBtnText: "Go to my profile",
        faqs: {
            title: "Frequently asked questions",
            subtitle: "Do you need help? Check our frequently asked questions or ask us in our live chat",
            accordions: productosAdicionales.es.accordions,
        },
        snackbars: {
            success: {},
            error: {
                paymentMethodAuthentication: "Error authenticating payment method",
                paymentCompletion: "Error completing payment",
            },
        },
    },
    ca: {
        title: {
            recipesChosen: "Enhorabona! Registrem la teva elecció.",
            withoutRecipes: "Enhorabona! Moltes gràcies per la teva compra",
        },
        subtitle: "Ja pots anar encenent els fogons. T’agradaria gaudir d’un addicional amb el teu pla?",
        purchaseBtnText: "Pagar addicionals",
        goToProfileBtnText: "Anar al meu perfil",
        faqs: {
            title: "Preguntes freqüents",
            subtitle: "Necessites ajuda? Revisa les nostres preguntes freqüents o consulta en el nostre xat",
            accordions: productosAdicionales.es.accordions,
        },
        snackbars: {
            success: {},
            error: {
                paymentMethodAuthentication: "Error en autenticar el mètode de pagament",
                paymentCompletion: "Error en completar el pagament",
            },
        },
    },
};
