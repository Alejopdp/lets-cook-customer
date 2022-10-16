import { skipPlanModal, swapPlanModal, planRecoverModal } from "../../lang";

export const perfil = {
    es: {
        greeting: "Hola",
        paymentHistoryBtnText: "Historial de pedidos",
        settingsBtnText: "Configuración",
        myPlansTitle: "Mis planes",
        newPlanBtnText: "Nuevo plan",
        myAdditionalsTitle: "Mis adicionales",
        additionalsBtnText: "Nuevo adicional",
        plansEmptyStateTitle: "¡Bienvenid@! Aún no tienes planes",
        plansEmptyStateSubtitleFirstPart: "¿Qué estás esperando para convertirte en un verdadero chef?",
        withCodeEmptyState: " Con el código",
        plansEmptyStateSubtitleSecondPart: "te regalamos 5€ en tu primer semana",
        additionalsEmptyStateTitle: "Aún no tienes adicionales",
        additionalsEmptyStateSubtitle: "¿Te gustaría sumar un adicional en tu entrega de la próxima semana?",
        chooseRecipesActionBox: {
            btnText: "Elegir recetas",
        },
        rateRecipesActionBox: {
            btnText: "Valorar recetas",
            text: "Tienes recetas pendientes de valorar. ¡Tu opinión nos ayuda a mejorar!",
        },
        referalActionBox: {
            text: "Invita a tus amigos a probar Let's cook con 10€ de descuento en su primera semana utilizando el código",
            miniText: "Tendrás 10€ de descuento por cada amigo que se apunte.",
        },
        planProfileCard: {
            seeDetailsBtnText: "Ver detalle",
            repeatPurchaseBtnText: "Volver a pedir",
            nextShippingDateText: "Próxima entrega",
            frequencyText: "Entrega",
        },
        skipPlanModal: skipPlanModal.es,
        swapPlanModal: swapPlanModal.es,
        planRecoverModal: planRecoverModal.es,
        snackbars: {
            success: {
                skippedWeeks: "La/s semana/s han sido saltadas correctamente",
                swapedPlan: "Plan cambiado con éxito",
                reorderedPlan: "Pedido correctamente realizado",
            },
            error: {
                skippedWeeks: "Error al saltar la/s semana/s",
                unexpected: "Ha ocurrido un error inesperado, por favor intente nuevamente",
            },
        },
    },
    en: {
        greeting: "Hello",
        paymentHistoryBtnText: "Payment history",
        settingsBtnText: "Settings",
        myPlansTitle: "My plans",
        newPlanBtnText: "New plan",
        myAdditionalsTitle: "My additional products",
        additionalsBtnText: "New additional product",
        plansEmptyStateTitle: "You don’t have any plans yet",
        additionalsEmptyStateSubtitle: "Would you like to add an extra to your delivery next week?",
        plansEmptyStateSubtitleFirstPart: "What are you waiting for to become a real chef?",
        withCodeEmptyState: " With the code",
        plansEmptyStateSubtitleSecondPart: "we give you 5€ in your first week",
        additionalsEmptyStateTitle: "You don’t have any additional products yet",
        chooseRecipesActionBox: {
            btnText: "Choose recipes",
        },
        rateRecipesActionBox: {
            btnText: "Rate recipes",
            text: "You have recipes pending evaluation. Your opinions help us improve!",
        },
        referalActionBox: {
            text: "Invite your friends to try Let's cook with a 10€ discount on their first week using the code",
            miniText: "You will have 10€ discount for each friend who signs up.",
        },
        planProfileCard: {
            seeDetailsBtnText: "See details",
            repeatPurchaseBtnText: "Order again",
            nextShippingDateText: "Next delivery",
            frequencyText: "Delivery",
        },
        skipPlanModal: skipPlanModal.en,
        swapPlanModal: swapPlanModal.en,
        planRecoverModal: planRecoverModal.en,
        snackbars: {
            success: {
                skippedWeeks: "Weeks successfully skipped",
                swapedPlan: "Plan successfully swaped",
                reorderedPlan: "Plan successfully reordered",
            },
            error: {
                skippedWeeks: "An error has ocurred",
                unexpected: "An error has ocurred",
            },
        },
    },
    ca: {
        greeting: "Hola",
        paymentHistoryBtnText: "Historial de pagaments",
        settingsBtnText: "Configuració",
        myPlansTitle: "Els meus plans",
        newPlanBtnText: "Nou pla",
        myAdditionalsTitle: "Els meus addicionales",
        additionalsBtnText: "Nou addicional",
        plansEmptyStateTitle: "Encara no tens plans",
        additionalsEmptyStateTitle: "Encara no tens addicionals",
        additionalsEmptyStateSubtitle: "¿Te gustaría sumar un adicional en tu entrega de la próxima semana?",
        plansEmptyStateSubtitleFirstPart: "¿Qué estás esperando para convertirte en un verdadero chef?",
        withCodeEmptyState: " Con el código",
        plansEmptyStateSubtitleSecondPart: "te regalamos 5€ en tu primer semana",
        chooseRecipesActionBox: {
            btnText: "Triar receptes",
        },
        rateRecipesActionBox: {
            btnText: "Valorar receptes",
            text: "Tens receptes pendents de valorar. La teva opinió ens ajuda a millorar!",
        },
        referalActionBox: {
            text: "Convida els teus amics a provar Let's cook amb 10€ de descompte en la primera setmana utilitzant el codi",
            miniText: "Tindràs 10€ de descompte per cada amic que s'hi apunti.",
        },
        planProfileCard: {
            seeDetailsBtnText: "Veure detall",
            repeatPurchaseBtnText: "Tornar a demanar",
            nextShippingDateText: "Proper lliurament",
            frequencyText: "Lliurament",
        },
        skipPlanModal: skipPlanModal.ca,
        swapPlanModal: swapPlanModal.ca,
        planRecoverModal: planRecoverModal.ca,
        snackbars: {
            success: {
                skippedWeeks: "Setmanes omeses correctament",
                swapedPlan: "El pla s'ha intercanviat correctament",
                reorderedPlan: "El pla s'ha reordenat correctament",
            },
            error: {
                skippedWeeks: "S'ha produït un error",
                unexpected: "S'ha produït un error",
            },
        },
    },
};
