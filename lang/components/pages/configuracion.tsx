export const configuracion = {
    es: {
        title: "Configuración de la cuenta",
        userInfoDetail: {
            // Success messages
            addPaymentMethod: { success: "La forma de pago se ha guardado correctamente" },
            updateDefaultPaymentMethod: { success: "La forma de pago se ha modificado correctamente" },
            updatePersonalDataSubmit: { success: "Datos modificados correctamente" },
            shippingAddressSubmit: { success: "Datos modificados correctamente" },
            billingDataSubmit: { success: "Datos modificados correctamente" },
            // Forms
            personalData: {
                title: "Datos personales",
                updateBtnLabel: "MODIFICAR DATOS PERSONALES",
                fullName: "Nombre completo",
                phone1: "Teléfono (1) (WhatsApp)",
                phone2: "Teléfono (2)",
                birthDateValue: "Fecha de nacimiento",
                preferredLanguage: "Idioma de preferencia",
            },
            shippingAddress: {
                title: "Dirección de entrega",
                updateBtnLabel: "MODIFICAR DIRECCION DE ENTREGA",
                name: "Dirección de entrega",
                details: "Piso / puerta / aclaraciones",
                preferredShippingHour: "Horario de entrega preferido",
            },
            billingData: {
                title: "Datos de facturación",
                updateBtnLabel: "MODIFICAR DATOS DE FACTURACIÓN",
                addressName: "Dirección de entrega",
                details: "Piso / puerta / aclaraciones",
                customerName: "Nombre completo",
                identification: "DNI/NIE/CIF",
            },
            paymentMethod: {
                title: "Forma de pago",
                updateBtnLabel: "MODIFICAR método DE PAGO",
                card: "Tarjeta",
                expirationDate: "Vencimiento",
            },
            customerInfo: {
                title: "Datos de la cuenta",
                updateBtnLabel: "MODIFICAR DATOS DE CUENTA",
                email: "Correo electrónico",
                password: "Contraseña",
            },
            // Modals
            emailModal: {
                primaryButtonText: "MODIFICAR CORREO ELECTRÓNICO",
                secondaryButtonText: "CANCELAR",
                title: "Modificar correo electrónico",
                newEmail: "Nuevo correo electrónico",
            },
            passwordModal: {
                primaryButtonText: "MODIFICAR CONTRASEÑA",
                secondaryButtonText: "CANCELAR",
                title: "Modificar contraseña",
                newPassword: "Nueva contraseña",
                repeatNewPassword: "Repita su nueva contraseña",
                helperText: "La contraseña debe tener al menos 8 caracteres, 1 minúscula, 1 mayúscula y 1 número",
            },
            personalDataModal: {
                primaryButtonText: "MODIFICAR DATOS PERSONALES",
                secondaryButtonText: "CANCELAR",
                title: "Modificar datos personales",
                name: "Nombre",
                lastName: "Apellido",
                phone1: "Teléfono (1) (WhatsApp)",
                phone2: "Teléfono (2)",
                birthDate: "Fecha de nacimiento",
            },
            billingAddressModal: {
                primaryButtonText: "MODIFICAR DATOS DE FACTURACIÓN",
                secondaryButtonText: "CANCELAR",
                title: "Modificar datos de facturación",
                details: "Piso / puerta / aclaraciones",
                customerName: "Nombre completo",
                identification: "DNI/NIE/CIF",
            },
            deliveryAddressModal: {
                primaryButtonText: "MODIFICAR DIRECCION DE ENTREGA",
                secondaryButtonText: "CANCELAR",
                title: "Modificar dirección de entrega",
                details: "Piso / puerta / aclaraciones",
                helperText: "La dirección de entrega se modificará en todos los planes activos",
                preferredHour: "Seleccionar el horario de entrega preferido",
            },
            paymentMethodModal: {
                primaryButtonText: "MODIFICAR forma DE PAGO",
                secondaryButtonText: "CANCELAR",
                title: "Modificar forma de pago",
                mySavedCards: "Mis tarjetas guardadas",
                addNewPaymentMethod: "Añadir nueva forma de pago",
                helperText: "La forma de pago se modificará en todos los planes activos",
            },
        },
    },
    en: {
        title: "Account settings",
        userInfoDetail: {
            // Success messages
            addPaymentMethod: { success: "The payment method has been added successfully" },
            updateDefaultPaymentMethod: { success: "Payment method updated successfully" },
            updatePersonalDataSubmit: { success: "Personal information updated successfully" },
            shippingAddressSubmit: { success: "Shipping address updated successfully" },
            billingDataSubmit: { success: "Billing address updated successfully" },
            // Forms
            personalData: {
                title: "Personal information",
                updateBtnLabel: "CHANGE PERSONAL INFORMATION",
                fullName: "First and last name",
                phone1: "Phone number (1)",
                phone2: "Phone number (2)",
                birthDateValue: "Date of birth",
                preferredLanguage: "Preferred language",
            },
            shippingAddress: {
                title: "Delivery address",
                updateBtnLabel: "MODIFY DELIVERY ADDRESS",
                name: "Delivery address",
                details: "Apartment / Door / Comments",
                preferredShippingHour: "Preferred delivery time slot",
            },
            billingData: {
                title: "Billing address",
                updateBtnLabel: "MODIFY BILLING ADDRESS",
                addressName: "Address",
                details: "Aparment / door / comments",
                customerName: "First and last name",
                identification: "DNI/NIE/CIF",
            },
            paymentMethod: {
                title: "Payment method",
                updateBtnLabel: "MODIFY PAYMENT METHOD",
                card: "Card details",
                expirationDate: "Expiration date",
            },
            customerInfo: {
                title: "Account information",
                updateBtnLabel: "MODIFY ACCOUNT INFORMATION",
                email: "E-mail",
                password: "Password",
            },
            // Modals
            emailModal: {
                primaryButtonText: "MODIFY E-MAIL ADDRESS",
                secondaryButtonText: "CANCEL",
                title: "Modify e-mail address",
                newEmail: "New e-mail address",
            },
            passwordModal: {
                primaryButtonText: "MODIFY PASSWORD",
                secondaryButtonText: "CANCEL",
                title: "Modify e-mail address",
                newPassword: "New password",
                repeatNewPassword: "Repeat your new password",
                helperText: "The password should be at least 8 characters with 1 lowercase, 1 uppercase and 1 number",
            },
            personalDataModal: {
                primaryButtonText: "MODIFY PERSONAL INFORMATION",
                secondaryButtonText: "CANCEL",
                title: "Modify personal information",
                name: "Name",
                lastName: "Last name",
                phone1: "Phone (1)",
                phone2: "Phone (2)",
                birthDate: "Date of birth",
            },
            billingAddressModal: {
                primaryButtonText: "MODIFY BILLING ADDRESS",
                secondaryButtonText: "CANCEL",
                title: "Modify billing address",
                details: "Apartment / door / comments",
                customerName: "First and last name",
                identification: "DNI/NIE/CIF",
            },
            deliveryAddressModal: {
                primaryButtonText: "MODIFY DELIVERY ADDRESS",
                secondaryButtonText: "CANCEL",
                title: "Modify delivery address",
                details: "Apartment / door / comments",
                helperText: "The delivery address will be modified in all active plans",
                preferredHour: "Preferred delivery time slot",
            },
            paymentMethodModal: {
                primaryButtonText: "MODIFY PAYMENT METHOD",
                secondaryButtonText: "CANCEL",
                title: "Modify payment method",
                mySavedCards: "My saved credit cards",
                addNewPaymentMethod: "Enter new payment method",
                helperText: "The payment method will be modified in all active plans",
            },
        },
    },
    ca: {
        title: "Configuració del compte",
        userInfoDetail: {
            // Success messages
            addPaymentMethod: { success: "El mètode de pagament s’ha afegit  correctament" },
            updateDefaultPaymentMethod: { success: "El mètode de pagament s’ha modificat correctament" },
            updatePersonalDataSubmit: { success: "Dades modificades correctament" },
            shippingAddressSubmit: { success: "Dades modificades correctament" },
            billingDataSubmit: { success: "Dades modificades correctament" },
            // Forms
            personalData: {
                title: "Dades personals",
                updateBtnLabel: "MODIFICAR DADES PERSONALS",
                fullName: "Nom complert",
                phone1: "TelÃ©fono (1)",
                phone2: "TelÃ©fono (2)",
                birthDateValue: "Data de naixament",
                preferredLanguage: "Idioma de preferència",
            },
            shippingAddress: {
                title: "Adreça de lliurament",
                updateBtnLabel: "MODIFICAR ADREÇA DE LLIURAMENT",
                name: "Adreça de lliurament",
                details: "Pis / porta / aclariments",
                preferredShippingHour: "Horari preferent de lliurament",
            },
            billingData: {
                title: "Dades de facturació",
                updateBtnLabel: "MODIFICAR DADES DE FACTURACIÓ",
                addressName: "Direcció de lliurament",
                details: "Pis / porta / aclaraiments",
                customerName: "Nom complert",
                identification: "DNI/NIE/CIF",
            },
            paymentMethod: {
                title: "Mètode de pagament",
                updateBtnLabel: "MODIFICAR MÈTODE DE PAGAMENT",
                card: "Targeta",
                expirationDate: "Venciment",
            },
            customerInfo: {
                title: "Dades del compte",
                updateBtnLabel: "MODIFICAR DADES DEL COMPTE",

                email: "Correu electrònic",
                password: "Contrasenya",
            },
            // Modals
            emailModal: {
                primaryButtonText: "MODIFICAR CORREU ELECTRÒNIC",
                secondaryButtonText: "CANCEL·LAR",
                title: "Modificar correu electrònic",
                newEmail: "Nou correu electrònic",
            },
            passwordModal: {
                primaryButtonText: "MODIFICAR CONTRASENYA",
                secondaryButtonText: "CANCEL·LAR",
                title: "Modificar correu electrònic",
                newPassword: "Nova contrasenya",
                repeatNewPassword: "Repeteixi la seva nova contrasenya",
                helperText: "La contrasenya ha de tenir almenys 8 caracters, 1  minúscula, 1 majúscula i 1 número",
            },
            personalDataModal: {
                primaryButtonText: "MODIFICAR DADES PERSONALS",
                secondaryButtonText: "CANCEL·LAR",
                title: "Modificar dades personals",
                name: "Nom",
                lastName: "Cognom",
                phone1: "Telèfon (1)",
                phone2: "Telèfon (2)",
                birthDate: "Data de naixement",
            },
            billingAddressModal: {
                primaryButtonText: "MODIFICAR ADREÇA DE FACTURACIÓ",
                secondaryButtonText: "CANCEL·LAR",
                title: "Modificar adreça de facturació",
                details: "Pis / porta / aclariments",
                customerName: "Nom complert",
                identification: "DNI/NIE/CIF",
            },
            deliveryAddressModal: {
                primaryButtonText: "MODIFICAR ADREÇA DE LLIURAMENT",
                secondaryButtonText: "CANCEL·LAR",
                title: "Modificar adreça de lliurament",
                details: "Pis / porta / aclariments",
                helperText: "L’adreça de lliurament es modificarà en tots els plans actius",
                preferredHour: "Horari preferent de lliurament",
            },
            paymentMethodModal: {
                primaryButtonText: "MODIFICAR MÈTODE DE PAGAMENT",
                secondaryButtonText: "CANCEL·LAR",
                title: "Modificar mètode de pagament",
                mySavedCards: "Les meves targetes guardades",
                addNewPaymentMethod: "Afegir nou mètode de pagament",
                helperText: "El mètode de pagament es modificarà en tots els plans actius",
            },
        },
    },
};
