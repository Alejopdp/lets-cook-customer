// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

// External Components
import ModalWithoutActions from "../../atoms/modal/modalWithoutActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

const TermsAndConditionsModal = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ModalWithoutActions
            open={props.open}
            handleClose={props.handleClose}
            title="Términos y condiciones"
            fullScreen={true}
            maxWidth="sm"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        I. INFORMACIÓN GENERAL En cumplimiento con el deber de información dispuesto en la Ley 34/2002 de Servicios de la
                        Sociedad de la Información y el Comercio Electrónico (LSSI-CE) de 11 de julio, se facilitan a continuación los
                        siguientes datos de información general de este sitio web: La titularidad de este sitio web, www.letscooknow.es, (en
                        adelante, Sitio Web) la ostenta: LetsCook SL, provista de NIF: B67476051 e inscrita en: Registro Mercantil de
                        Barcelona con los siguientes datos registrales: Asiento 3356 del Diario 1313, hoja B537331, folio 115 del tomo 46986
                        del archivo, cuyo representante es: N. Johansson, y cuyos datos de contacto son: Dirección: Passeig Sant Joan 93,
                        1-2 (08009) Barcelona Email de contacto: info@letscooknow.es II. TÉRMINOS Y CONDICIONES GENERALES DE USO El objeto
                        de las condiciones: El Sitio Web El objeto de las presentes Condiciones Generales de Uso (en adelante, Condiciones)
                        es regular el acceso y la utilización del Sitio Web. A los efectos de las presentes Condiciones se entenderá como
                        Sitio Web: la apariencia externa de los interfaces de pantalla, tanto de forma estática como de forma dinámica, es
                        decir, el árbol de navegación; y todos los elementos integrados tanto en los interfaces de pantalla como en el árbol
                        de navegación (en adelante, Contenidos) y todos aquellos servicios o recursos en línea que en su caso ofrezca a los
                        Usuarios (en adelante, Servicios). LetsCook SL se reserva la facultad de modificar, en cualquier momento, y sin
                        aviso previo, la presentación y configuración del Sitio Web y de los Contenidos y Servicios que en él pudieran estar
                        incorporados. El Usuario reconoce y acepta que en cualquier momento LetsCook SL pueda interrumpir, desactivar y/o
                        cancelar cualquiera de estos elementos que se integran en el Sitio Web o el acceso a los mismos. El acceso al Sitio
                        Web por el Usuario tiene carácter libre y, por regla general, es gratuito sin que el Usuario tenga que proporcionar
                        una contraprestación para poder disfrutar de ello, salvo en lo relativo al coste de conexión a través de la red de
                        telecomunicaciones suministrada por el proveedor de acceso que hubiere contratado el Usuario. La utilización de
                        alguno de los Contenidos o Servicios del Sitio Web podrá hacerse mediante la suscripción o registro previo del
                        Usuario. El Usuario El acceso, la navegación y uso del Sitio Web, así como por los espacios habilitados para
                        interactuar entre los Usuarios, y el Usuario y LetsCook SL, como los comentarios y/o espacios de blogging, confiere
                        la condición de Usuario, por lo que se aceptan, desde que se inicia la navegación por el Sitio Web, todas las
                        Condiciones aquí establecidas, así como sus ulteriores modificaciones, sin perjuicio de la aplicación de la
                        correspondiente normativa legal de obligado cumplimiento según el caso. Dada la relevancia de lo anterior, se
                        recomienda al Usuario leerlas cada vez que visite el Sitio Web. El Sitio Web de LetsCook SL proporciona gran
                        diversidad de información, servicios y datos. El Usuario asume su responsabilidad para realizar un uso correcto del
                        Sitio Web. Esta responsabilidad se extenderá a: Un uso de la información, Contenidos y/o Servicios y datos ofrecidos
                        por LetsCook SL sin que sea contrario a lo dispuesto por las presentes Condiciones, la Ley, la moral o el orden
                        público, o que de cualquier otro modo puedan suponer lesión de los derechos de terceros o del mismo funcionamiento
                        del Sitio Web. La veracidad y licitud de las informaciones aportadas por el Usuario en los formularios extendidos
                        por LetsCook SL para el acceso a ciertos Contenidos o Servicios ofrecidos por el Sitio Web. En todo caso, el Usuario
                        notificará de forma inmediata a LetsCook SL acerca de cualquier hecho que permita el uso indebido de la información
                        registrada en dichos formularios, tales como, pero no sólo, el robo, extravío, o el acceso no autorizado a
                        identificadores y/o contraseñas, con el fin de proceder a su inmediata cancelación. LetsCook SL se reserva el
                        derecho de retirar todos aquellos comentarios y aportaciones que vulneren la ley, el respeto a la dignidad de la
                        persona, que sean discriminatorios, xenófobos, racistas, pornográficos, spamming, que atenten contra la juventud o
                        la infancia, el orden o la seguridad pública o que, a su juicio, no resultaran adecuados para su publicación. En
                        cualquier caso, LetsCook SL no será responsable de las opiniones vertidas por los Usuarios a través de comentarios u
                        otras herramientas de blogging o de participación que pueda haber. El mero acceso a este Sitio Web no supone
                        entablar ningún tipo de relación de carácter comercial entre LetsCook SL y el Usuario. El Usuario declara ser mayor
                        de edad y disponer de la capacidad jurídica suficiente para vincularse por las presentes Condiciones. Por lo tanto,
                        este Sitio Web de LetsCook SL no se dirige a menores de edad. LetsCook SL declina cualquier responsabilidad por el
                        incumplimiento de este requisito. El Sitio Web está dirigido principalmente a Usuarios residentes en España.
                        LetsCook SL no asegura que el Sitio Web cumpla con legislaciones de otros países, ya sea total o parcialmente. Si el
                        Usuario reside o tiene su domiciliado en otro lugar y decide acceder y/o navegar en el Sitio Web lo hará bajo su
                        propia responsabilidad, deberá asegurarse de que tal acceso y navegación cumple con la legislación local que le es
                        aplicable, no asumiendo LetsCook SL responsabilidad alguna que se pueda derivar de dicho acceso. III. ACCESO Y
                        NAVEGACIÓN EN EL SITIO WEB: EXCLUSIÓN DE GARANTÍAS Y RESPONSABILIDAD LetsCook SL no garantiza la continuidad,
                        disponibilidad y utilidad del Sitio Web, ni de los Contenidos o Servicios. LetsCook SL hará todo lo posible por el
                        buen funcionamiento del Sitio Web, sin embargo, no se responsabiliza ni garantiza que el acceso a este Sitio Web no
                        vaya a ser ininterrumpido o que esté libre de error. Tampoco se responsabiliza o garantiza que el contenido o
                        software al que pueda accederse a través de este Sitio Web, esté libre de error o cause un daño al sistema
                        informático (software y hardware) del Usuario. En ningún caso LetsCook SL será responsable por las pérdidas, daños o
                        perjuicios de cualquier tipo que surjan por el acceso, navegación y el uso del Sitio Web, incluyéndose, pero no
                        limitándose, a los ocasionados a los sistemas informáticos o los provocados por la introducción de virus. LetsCook
                        SL tampoco se hace responsable de los daños que pudiesen ocasionarse a los usuarios por un uso inadecuado de este
                        Sitio Web. En particular, no se hace responsable en modo alguno de las caídas, interrupciones, falta o defecto de
                        las telecomunicaciones que pudieran ocurrir. IV. POLÍTICA DE PRIVACIDAD Y PROTECCIÓN DE DATOS Respetando lo
                        establecido en la legislación vigente, LetsCook SL se compromete a adoptar las medidas técnicas y organizativas
                        necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos. Leyes que incorpora esta política
                        de privacidad Esta política de privacidad está adaptada a la normativa española y europea vigente en materia de
                        protección de datos personales en internet. En concreto, la misma respeta las siguientes normas: El Reglamento (UE)
                        2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas
                        físicas en lo que respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD). La Ley
                        Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales
                        (LOPD-GDD). El Real Decreto 1720/2007, de 21 de diciembre, por el que se aprueba el Reglamento de desarrollo de la
                        Ley Orgánica 15/1999, de 13 de diciembre, de Protección de Datos de Carácter Personal (RDLOPD). La Ley 34/2002, de
                        11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE). Identidad del
                        responsable del tratamiento de los datos personales El responsable del tratamiento de los datos personales recogidos
                        en LetsCook SL es: LetsCook SL, provista de NIF: B67476051 e inscrita en: Registro Mercantil de Barcelona con los
                        siguientes datos registrales: Asiento 3356 del Diario 1313, hoja B537331, folio 115 del tomo 46986 del archivo, cuyo
                        representante es: N. Johansson (en adelante, también Responsable del tratamiento). Sus datos de contacto son los
                        siguientes: Dirección: Passeig Sant Joan 93, 1-2 (08009) Barcelona Email de contacto: info@letscooknow.es Registro
                        de Datos de Carácter Personal En cumplimiento de lo establecido en el RGPD y la LOPD-GDD, le informamos que los
                        datos personales recabados por LetsCook SL mediante los formularios extendidos en sus páginas quedarán incorporados
                        y serán tratados en nuestro ficheros con el fin de poder facilitar, agilizar y cumplir los compromisos establecidos
                        entre LetsCook SL y el Usuario o el mantenimiento de la relación que se establezca en los formularios que este
                        rellene, o para atender una solicitud o consulta del mismo. Asimismo, de conformidad con lo previsto en el RGPD y la
                        LOPD-GDD, salvo que sea de aplicación la excepción prevista en el artículo 30.5 del RGPD, se mantiene un registro de
                        actividades de tratamiento que especifica, según sus finalidades, las actividades de tratamiento llevadas a cabo y
                        las demás circunstancias establecidas en el RGPD. Principios aplicables al tratamiento de los datos personales El
                        tratamiento de los datos personales del Usuario se someterá a los siguientes principios recogidos en el artículo 5
                        del RGPD: Principio de licitud, lealtad y transparencia: se requerirá en todo momento el consentimiento del Usuario
                        previa información completamente transparente de los fines para los cuales se recogen los datos personales.
                        Principio de limitación de la finalidad: los datos personales serán recogidos con fines determinados, explícitos y
                        legítimos. Principio de minimización de datos: los datos personales recogidos serán únicamente los estrictamente
                        necesarios en relación con los fines para los que son tratados. Principio de exactitud: los datos personales deben
                        ser exactos y estar siempre actualizados. Principio de limitación del plazo de conservación: los datos personales
                        solo serán mantenidos de forma que se permita la identificación del Usuario durante el tiempo necesario para los
                        fines de su tratamiento. Principio de integridad y confidencialidad: los datos personales serán tratados de manera
                        que se garantice su seguridad y confidencialidad. Principio de responsabilidad proactiva: el Responsable del
                        tratamiento será responsable de asegurar que los principios anteriores se cumplen. Categorías de datos personales
                        Las categorías de datos que se tratan en LetsCook SL son únicamente datos identificativos. En ningún caso, se tratan
                        categorías especiales de datos personales en el sentido del artículo 9 del RGPD. Base legal para el tratamiento de
                        los datos personales La base legal para el tratamiento de los datos personales es el consentimiento. LetsCook SL se
                        compromete a recabar el consentimiento expreso y verificable del Usuario para el tratamiento de sus datos personales
                        para uno o varios fines específicos. El Usuario tendrá derecho a retirar su consentimiento en cualquier momento.
                        Será tan fácil retirar el consentimiento como darlo. Como regla general, la retirada del consentimiento no
                        condicionará el uso del Sitio Web. En las ocasiones en las que el Usuario deba o pueda facilitar sus datos a través
                        de formularios para realizar consultas, solicitar información o por motivos relacionados con el contenido del Sitio
                        Web, se le informará en caso de que la cumplimentación de alguno de ellos sea obligatoria debido a que los mismos
                        sean imprescindibles para el correcto desarrollo de la operación realizada. Fines del tratamiento a que se destinan
                        los datos personales Los datos personales son recabados y gestionados por LetsCook SL con la finalidad de poder
                        facilitar, agilizar y cumplir los compromisos establecidos entre el Sitio Web y el Usuario o el mantenimiento de la
                        relación que se establezca en los formularios que este último rellene o para atender una solicitud o consulta.
                        Igualmente, los datos podrán ser utilizados con una finalidad comercial de personalización, operativa y estadística,
                        y actividades propias del objeto social de LetsCook SL, así como para la extracción, almacenamiento de datos y
                        estudios de marketing para adecuar el Contenido ofertado al Usuario, así como mejorar la calidad, funcionamiento y
                        navegación por el Sitio Web. En el momento en que se obtengan los datos personales, se informará al Usuario acerca
                        del fin o fines específicos del tratamiento a que se destinarán los datos personales; es decir, del uso o usos que
                        se dará a la información recopilada. Períodos de retención de los datos personales Los datos personales solo serán
                        retenidos durante el tiempo mínimo necesario para los fines de su tratamiento y, en todo caso, únicamente durante el
                        siguiente plazo: 5 años, o hasta que el Usuario solicite su supresión. En el momento en que se obtengan los datos
                        personales, se informará al Usuario acerca del plazo durante el cual se conservarán los datos personales o, cuando
                        eso no sea posible, los criterios utilizados para determinar este plazo. Destinatarios de los datos personales Los
                        datos personales del Usuario serán compartidos con los siguientes destinatarios o categorías de destinatarios:
                        GOOGLE IRELAND LIMITED con domicilio en Gordon House, Barrow Street, Dublin, Irlanda MAILERLITE con domicilio en J.
                        Basanavičiaus g. 15, Vilnius, Lithuania FACEBOOK IRELAND LIMITED con domicilio en 4 Grand Canal Square, Grand Canal
                        Harbour, Dublin, Irlanda En caso de que el Responsable del tratamiento tenga la intención de transferir datos
                        personales a un tercer país u organización internacional, en el momento en que se obtengan los datos personales, se
                        informará al Usuario acerca del tercer país u organización internacional al cual se tiene la intención de transferir
                        los datos, así como de la existencia o ausencia de una decisión de adecuación de la Comisión. Datos personales de
                        menores de edad Respetando lo establecido en los artículos 8 del RGPD y 13 del RDLOPD, solo los mayores de 14 años
                        podrán otorgar su consentimiento para el tratamiento de sus datos personales de forma lícita por LetsCook SL. Si se
                        trata de un menor de 14 años, será necesario el consentimiento de los padres o tutores para el tratamiento, y este
                        solo se considerará lícito en la medida en la que los mismos lo hayan autorizado. Secreto y seguridad de los datos
                        personales LetsCook SL se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de
                        seguridad adecuado al riesgo de los datos recogidos, de forma que se garantice la seguridad de los datos de carácter
                        personal y se evite la destrucción, pérdida o alteración accidental o ilícita de datos personales transmitidos,
                        conservados o tratados de otra forma, o la comunicación o acceso no autorizados a dichos datos. El Sitio Web cuenta
                        con un certificado SSL (Secure Socket Layer), que asegura que los datos personales se transmiten de forma segura y
                        confidencial, al ser la transmisión de los datos entre el servidor y el Usuario, y en retroalimentación, totalmente
                        cifrada o encriptada. Sin embargo, debido a que LetsCook SL no puede garantizar la inexpugnabilidad de internet ni
                        la ausencia total de hackers u otros que accedan de modo fraudulento a los datos personales, el Responsable del
                        tratamiento se compromete a comunicar al Usuario sin dilación indebida cuando ocurra una violación de la seguridad
                        de los datos personales que sea probable que entrañe un alto riesgo para los derechos y libertades de las personas
                        físicas. Siguiendo lo establecido en el artículo 4 del RGPD, se entiende por violación de la seguridad de los datos
                        personales toda violación de la seguridad que ocasione la destrucción, pérdida o alteración accidental o ilícita de
                        datos personales transmitidos, conservados o tratados de otra forma, o la comunicación o acceso no autorizados a
                        dichos datos. Los datos personales serán tratados como confidenciales por el Responsable del tratamiento, quien se
                        compromete a informar de y a garantizar por medio de una obligación legal o contractual que dicha confidencialidad
                        sea respetada por sus empleados, asociados, y toda persona a la cual le haga accesible la información. Derechos
                        derivados del tratamiento de los datos personales El Usuario tiene sobre LetsCook SL y podrá, por tanto, ejercer
                        frente al Responsable del tratamiento los siguientes derechos reconocidos en el RGPD: Derecho de acceso: Es el
                        derecho del Usuario a obtener confirmación de si LetsCook SL está tratando o no sus datos personales y, en caso
                        afirmativo, obtener información sobre sus datos concretos de carácter personal y del tratamiento que LetsCook SL
                        haya realizado o realice, así como, entre otra, de la información disponible sobre el origen de dichos datos y los
                        destinatarios de las comunicaciones realizadas o previstas de los mismos. Derecho de rectificación: Es el derecho
                        del Usuario a que se modifiquen sus datos personales que resulten ser inexactos o, teniendo en cuenta los fines del
                        tratamiento, incompletos. Derecho de supresión ("el derecho al olvido"): Es el derecho del Usuario, siempre que la
                        legislación vigente no establezca lo contrario, a obtener la supresión de sus datos personales cuando estos ya no
                        sean necesarios para los fines para los cuales fueron recogidos o tratados; el Usuario haya retirado su
                        consentimiento al tratamiento y este no cuente con otra base legal; el Usuario se oponga al tratamiento y no exista
                        otro motivo legítimo para continuar con el mismo; los datos personales hayan sido tratados ilícitamente; los datos
                        personales deban suprimirse en cumplimiento de una obligación legal; o los datos personales hayan sido obtenidos
                        producto de una oferta directa de servicios de la sociedad de la información a un menor de 14 años. Además de
                        suprimir los datos, el Responsable del tratamiento, teniendo en cuenta la tecnología disponible y el coste de su
                        aplicación, deberá adoptar medidas razonables para informar a los responsables que estén tratando los datos
                        personales de la solicitud del interesado de supresión de cualquier enlace a esos datos personales. Derecho a la
                        limitación del tratamiento: Es el derecho del Usuario a limitar el tratamiento de sus datos personales. El Usuario
                        tiene derecho a obtener la limitación del tratamiento cuando impugne la exactitud de sus datos personales; el
                        tratamiento sea ilícito; el Responsable del tratamiento ya no necesite los datos personales, pero el Usuario lo
                        necesite para hacer reclamaciones; y cuando el Usuario se haya opuesto al tratamiento. Derecho a la portabilidad de
                        los datos: En caso de que el tratamiento se efectúe por medios automatizados, el Usuario tendrá derecho a recibir
                        del Responsable del tratamiento sus datos personales en un formato estructurado, de uso común y lectura mecánica, y
                        a transmitirlos a otro responsable del tratamiento. Siempre que sea técnicamente posible, el Responsable del
                        tratamiento transmitirá directamente los datos a ese otro responsable. Derecho de oposición: Es el derecho del
                        Usuario a que no se lleve a cabo el tratamiento de sus datos de carácter personal o se cese el tratamiento de los
                        mismos por parte de LetsCook SL. Derecho a no ser a no ser objeto de una decisión basada únicamente en el
                        tratamiento automatizado, incluida la elaboración de perfiles: Es el derecho del Usuario a no ser objeto de una
                        decisión individualizada basada únicamente en el tratamiento automatizado de sus datos personales, incluida la
                        elaboración de perfiles, existente salvo que la legislación vigente establezca lo contrario. Así pues, el Usuario
                        podrá ejercitar sus derechos mediante comunicación escrita dirigida al Responsable del tratamiento con la referencia
                        "RGPD-www.letscooknow.es", especificando: Nombre, apellidos del Usuario y copia del DNI. En los casos en que se
                        admita la representación, será también necesaria la identificación por el mismo medio de la persona que representa
                        al Usuario, así como el documento acreditativo de la representación. La fotocopia del DNI podrá ser sustituida, por
                        cualquier otro medio válido en derecho que acredite la identidad. Petición con los motivos específicos de la
                        solicitud o información a la que se quiere acceder. Domicilio a efecto de notificaciones. Fecha y firma del
                        solicitante. Todo documento que acredite la petición que formula. Esta solicitud y todo otro documento adjunto podrá
                        enviarse a la siguiente dirección y/o correo electrónico: Dirección postal: Passeig Sant Joan 93, 1-2 Correo
                        electrónico: info@letscooknow.es Enlaces a sitios web de terceros El Sitio Web puede incluir hipervínculos o enlaces
                        que permiten acceder a páginas web de terceros distintos de LetsCook SL, y que por tanto no son operados por
                        LetsCook SL. Los titulares de dichos sitios web dispondrán de sus propias políticas de protección de datos, siendo
                        ellos mismos, en cada caso, responsables de sus propios ficheros y de sus propias prácticas de privacidad.
                        Reclamaciones ante la autoridad de control En caso de que el Usuario considere que existe un problema o infracción
                        de la normativa vigente en la forma en la que se están tratando sus datos personales, tendrá derecho a la tutela
                        judicial efectiva y a presentar una reclamación ante una autoridad de control, en particular, en el Estado en el que
                        tenga su residencia habitual, lugar de trabajo o lugar de la supuesta infracción. En el caso de España, la autoridad
                        de control es la Agencia Española de Protección de Datos (http://www.agpd.es). Aceptación y cambios en esta política
                        de privacidad Es necesario que el Usuario haya leído y esté conforme con las condiciones sobre la protección de
                        datos de carácter personal contenidas en esta Política de Privacidad, así como que acepte el tratamiento de sus
                        datos personales para que el Responsable del tratamiento pueda proceder al mismo en la forma, durante los plazos y
                        para las finalidades indicadas. El uso del Sitio Web implicará la aceptación de la Política de Privacidad del mismo.
                        LetsCook SL se reserva el derecho a modificar su Política de Privacidad, de acuerdo a su propio criterio, o motivado
                        por un cambio legislativo, jurisprudencial o doctrinal de la Agencia Española de Protección de Datos. Los cambios o
                        actualizaciones de esta Política de Privacidad no serán notificados de forma explícita al Usuario. Se recomienda al
                        Usuario consultar esta página de forma periódica para estar al tanto de los últimos cambios o actualizaciones. Esta
                        Política de Privacidad fue actualizada el día 2 de junio 2021 para adaptarse al Reglamento (UE) 2016/679 del
                        Parlamento Europeo y del Consejo, de 27 de abril de 2016, relativo a la protección de las personas físicas en lo que
                        respecta al tratamiento de datos personales y a la libre circulación de estos datos (RGPD) y a la Ley Orgánica
                        3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPD) V. POLÍTICA
                        DE COOKIES El acceso a este Sitio Web puede implicar la utilización de cookies. Las cookies son pequeñas cantidades
                        de información que se almacenan en el navegador utilizado por cada Usuario —en los distintos dispositivos que pueda
                        utilizar para navegar— para que el servidor recuerde cierta información que posteriormente y únicamente el servidor
                        que la implementó leerá. Las cookies facilitan la navegación, la hacen más amigable, y no dañan el dispositivo de
                        navegación. Las cookies son procedimientos automáticos de recogida de información relativa a las preferencias
                        determinadas por el Usuario durante su visita al Sitio Web con el fin de reconocerlo como Usuario, y personalizar su
                        experiencia y el uso del Sitio Web, y pueden también, por ejemplo, ayudar a identificar y resolver errores. La
                        información recabada a través de las cookies puede incluir la fecha y hora de visitas al Sitio Web, las páginas
                        visionadas, el tiempo que ha estado en el Sitio Web y los sitios visitados justo antes y después del mismo. Sin
                        embargo, ninguna cookie permite que esta misma pueda contactarse con el número de teléfono del Usuario o con
                        cualquier otro medio de contacto personal. Ninguna cookie puede extraer información del disco duro del Usuario o
                        robar información personal. La única manera de que la información privada del Usuario forme parte del archivo Cookie
                        es que el usuario dé personalmente esa información al servidor. Las cookies que permiten identificar a una persona
                        se consideran datos personales. Por tanto, a las mismas les será de aplicación la Política de Privacidad
                        anteriormente descrita. En este sentido, para la utilización de las mismas será necesario el consentimiento del
                        Usuario. Este consentimiento será comunicado, en base a una elección auténtica, ofrecido mediante una decisión
                        afirmativa y positiva, antes del tratamiento inicial, removible y documentado. Cookies propias Son aquellas cookies
                        que son enviadas al ordenador o dispositivo del Usuario y gestionadas exclusivamente por LetsCook SL para el mejor
                        funcionamiento del Sitio Web. La información que se recaba se emplea para mejorar la calidad del Sitio Web y su
                        Contenido y su experiencia como Usuario. Estas cookies permiten reconocer al Usuario como visitante recurrente del
                        Sitio Web y adaptar el contenido para ofrecerle contenidos que se ajusten a sus preferencias. Cookies de terceros
                        Son cookies utilizadas y gestionadas por entidades externas que proporcionan a LetsCook SL servicios solicitados por
                        este mismo para mejorar el Sitio Web y la experiencia del usuario al navegar en el Sitio Web. Los principales
                        objetivos para los que se utilizan cookies de terceros son la obtención de estadísticas de accesos y analizar la
                        información de la navegación, es decir, cómo interactúa el Usuario con el Sitio Web. La información que se obtiene
                        se refiere, por ejemplo, al número de páginas visitadas, el idioma, el lugar a la que la dirección IP desde el que
                        accede el Usuario, el número de Usuarios que acceden, la frecuencia y reincidencia de las visitas, el tiempo de
                        visita, el navegador que usan, el operador o tipo de dispositivo desde el que se realiza la visita. Esta información
                        se utiliza para mejorar el Sitio Web, y detectar nuevas necesidades para ofrecer a los Usuarios un Contenido y/o
                        servicio de óptima calidad. En todo caso, la información se recopila de forma anónima y se elaboran informes de
                        tendencias del Sitio Web sin identificar a usuarios individuales. Puede obtener más información sobre las cookies,
                        la información sobre la privacidad, o consultar la descripción del tipo de cookies que se utiliza, sus principales
                        características, periodo de expiración, etc. en el siguiente(s) enlace(s): Google Analytics:
                        https://analytics.google.com/analytics/web/provision/#/provision La(s) entidad(es) encargada(s) del suministro de
                        cookies podrá(n) ceder esta información a terceros, siempre y cuando lo exija la ley o sea un tercero el que procese
                        esta información para dichas entidades. Cookies de redes sociales LetsCook SL incorpora plugins de redes sociales,
                        que permiten acceder a las mismas a partir del Sitio Web. Por esta razón, las cookies de redes sociales pueden
                        almacenarse en el navegador del Usuario. Los titulares de dichas redes sociales disponen de sus propias políticas de
                        protección de datos y de cookies, siendo ellos mismos, en cada caso, responsables de sus propios ficheros y de sus
                        propias prácticas de privacidad. El Usuario debe referirse a las mismas para informarse acerca de dichas cookies y,
                        en su caso, del tratamiento de sus datos personales. Únicamente a título informativo se indican a continuación los
                        enlaces en los que se pueden consultar dichas políticas de privacidad y/o de cookies: Facebook:
                        https://www.facebook.com/policies/cookies/ Twitter: https://twitter.com/es/privacy Instagram:
                        https://help.instagram.com/1896641480634370?ref=ig Youtube: https://policies.google.com/privacy?hl=es-419&gl=mx
                        Google+: https://policies.google.com/technologies/cookies?hl=es Pinterest:
                        https://policy.pinterest.com/es/privacy-policy LinkedIn: https://www.linkedin.com/legal/cookie-policy?trk=hp-cookies
                        Deshabilitar, rechazar y eliminar cookies El Usuario puede deshabilitar, rechazar y eliminar las cookies —total o
                        parcialmente— instaladas en su dispositivo mediante la configuración de su navegador (entre los que se encuentran,
                        por ejemplo, Chrome, Firefox, Safari, Explorer). En este sentido, los procedimientos para rechazar y eliminar las
                        cookies pueden diferir de un navegador de Internet a otro. En consecuencia, el Usuario debe acudir a las
                        instrucciones facilitadas por el propio navegador de Internet que esté utilizando. En el supuesto de que rechace el
                        uso de cookies —total o parcialmente— podrá seguir usando el Sitio Web, si bien podrá tener limitada la utilización
                        de algunas de las prestaciones del mismo. Cambios en la Política de Cookies Es posible que la Política de Cookies
                        del Sitio Web cambie o se actualice, por ello es recomendable que el Usuario revise esta política cada vez que
                        acceda al Sitio Web con el objetivo de estar adecuadamente informado sobre cómo y para qué usamos las cookies. VI.
                        POLÍTICA DE ENLACES Se informa que el Sitio Web de LetsCook SL pone o puede poner a disposición de los Usuarios
                        medios de enlace (como, entre otros, links, banners, botones), directorios y motores de búsqueda que permiten a los
                        Usuarios acceder a sitios web pertenecientes y/o gestionados por terceros. La instalación de estos enlaces,
                        directorios y motores de búsqueda en el Sitio Web tiene por objeto facilitar a los Usuarios la búsqueda de y acceso
                        a la información disponible en Internet, sin que pueda considerarse una sugerencia, recomendación o invitación para
                        la visita de los mismos. LetsCook SL no ofrece ni comercializa por sí ni por medio de terceros los productos y/o
                        servicios disponibles en dichos sitios enlazados. Asimismo, tampoco garantizará la disponibilidad técnica,
                        exactitud, veracidad, validez o legalidad de sitios ajenos a su propiedad a los que se pueda acceder por medio de
                        los enlaces. LetsCook SL en ningún caso revisará o controlará el contenido de otros sitios web, así como tampoco
                        aprueba, examina ni hace propios los productos y servicios, contenidos, archivos y cualquier otro material existente
                        en los referidos sitios enlazados. LetsCook SL no asume ninguna responsabilidad por los daños y perjuicios que
                        pudieran producirse por el acceso, uso, calidad o licitud de los contenidos, comunicaciones, opiniones, productos y
                        servicios de los sitios web no gestionados por LetsCook SL y que sean enlazados en este Sitio Web. El Usuario o
                        tercero que realice un hipervínculo desde una página web de otro, distinto, sitio web al Sitio Web de LetsCook SL
                        deberá saber que: No se permite la reproducción —total o parcialmente— de ninguno de los Contenidos y/o Servicios
                        del Sitio Web sin autorización expresa de LetsCook SL. No se permite tampoco ninguna manifestación falsa, inexacta o
                        incorrecta sobre el Sitio Web de LetsCook SL, ni sobre los Contenidos y/o Servicios del mismo. A excepción del
                        hipervínculo, el sitio web en el que se establezca dicho hiperenlace no contendrá ningún elemento, de este Sitio
                        Web, protegido como propiedad intelectual por el ordenamiento jurídico español, salvo autorización expresa de
                        LetsCook SL. El establecimiento del hipervínculo no implicará la existencia de relaciones entre LetsCook SL y el
                        titular del sitio web desde el cual se realice, ni el conocimiento y aceptación de LetsCook SL de los contenidos,
                        servicios y/o actividades ofrecidos en dicho sitio web, y viceversa. VII. PROPIEDAD INTELECTUAL E INDUSTRIAL
                        LetsCook SL por sí o como parte cesionaria, es titular de todos los derechos de propiedad intelectual e industrial
                        del Sitio Web, así como de los elementos contenidos en el mismo (a título enunciativo y no exhaustivo, imágenes,
                        sonido, audio, vídeo, software o textos, marcas o logotipos, combinaciones de colores, estructura y diseño,
                        selección de materiales usados, programas de ordenador necesarios para su funcionamiento, acceso y uso, etc.).
                        Serán, por consiguiente, obras protegidas como propiedad intelectual por el ordenamiento jurídico español, siéndoles
                        aplicables tanto la normativa española y comunitaria en este campo, como los tratados internacionales relativos a la
                        materia y suscritos por España. Todos los derechos reservados. En virtud de lo dispuesto en la Ley de Propiedad
                        Intelectual, quedan expresamente prohibidas la reproducción, la distribución y la comunicación pública, incluida su
                        modalidad de puesta a disposición, de la totalidad o parte de los contenidos de esta página web, con fines
                        comerciales, en cualquier soporte y por cualquier medio técnico, sin la autorización de LetsCook SL. El Usuario se
                        compromete a respetar los derechos de propiedad intelectual e industrial de LetsCook SL. Podrá visualizar los
                        elementos del Sitio Web o incluso imprimirlos, copiarlos y almacenarlos en el disco duro de su ordenador o en
                        cualquier otro soporte físico siempre y cuando sea, exclusivamente, para su uso personal. El Usuario, sin embargo,
                        no podrá suprimir, alterar, o manipular cualquier dispositivo de protección o sistema de seguridad que estuviera
                        instalado en el Sitio Web. En caso de que el Usuario o tercero considere que cualquiera de los Contenidos del Sitio
                        Web suponga una violación de los derechos de protección de la propiedad intelectual, deberá comunicarlo
                        inmediatamente a LetsCook SL a través de los datos de contacto del apartado de INFORMACIÓN GENERAL de este Aviso
                        Legal y Condiciones Generales de Uso. VIII. ACCIONES LEGALES, LEGISLACIÓN APLICABLE Y JURISDICCIÓN LetsCook SL se
                        reserva la facultad de presentar las acciones civiles o penales que considere necesarias por la utilización indebida
                        del Sitio Web y Contenidos, o por el incumplimiento de las presentes Condiciones. La relación entre el Usuario y
                        LetsCook SL se regirá por la normativa vigente y de aplicación en el territorio español. De surgir cualquier
                        controversia en relación a la interpretación y/o a la aplicación de estas Condiciones las partes someterán sus
                        conflictos a la jurisdicción ordinaria sometiéndose a los jueces y tribunales que correspondan conforme a derecho.
                        Ultima modificación: 2 de junio 2021
                    </Typography>
                </Grid>
            </Grid>
        </ModalWithoutActions>
    );
};

export default TermsAndConditionsModal;
