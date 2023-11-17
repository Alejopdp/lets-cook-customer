// Utils & Config
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";

// External Components
import ModalWithoutActions from "../../atoms/modal/modalWithoutActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({}));

const PurchaseConditionsModal = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ModalWithoutActions
            open={props.open}
            handleClose={props.handleClose}
            title="Condiciones generales de venta"
            fullScreen={true}
            maxWidth="sm"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="body2" color="textSecondary">
                        1. INFORMACIÓN GENERAL La titularidad de este sitio web, www.letscooknow.es, (en adelante Sitio Web) la ostenta:
                        LetsCook SL, provista de NIF: B67476051 e inscrita en: Registro Mercantil de Barcelona; y cuyos datos registrales
                        son: Asiento 3356 del Diario 1313, hoja B537331, folio 115 del tomo 46986 del archivo, y cuyos datos de contacto
                        son: Dirección: Passeig Sant Joan 93 1º 2ª (08009) Barcelona Email de contacto: info@letscooknow.es Este documento
                        (así como todo otro documento que aquí se mencionen) regula las condiciones por las que se rige el uso de este Sitio
                        Web (www.letscooknow.es) y la compra o adquisición de productos y/o servicios en el mismo (en adelante,
                        Condiciones). A efectos de estas Condiciones se entiende que la actividad que LetsCook desarrolla a través del Sitio
                        Web comprende: El término producto se refiere a planes semanales de kits para cocinar (recetas con todos los
                        ingredientes necesarias para preparar la misma) con su modalidad de entrega y todos sus productos adicionales como
                        pueden ser kits de desayuno/brunch, vino o surtido de fruta, el término cliente significa cualquier empresa,
                        asociación o individuo que entre en un contrato para la compra de productos de Let’s cook SL. Si alguna parte de los
                        términos debe ser declarada inválida o inejecutable por un tribunal u otra autoridad competente, entonces el resto
                        no se verá afectado. Let’s cook tomará los pagos de forma periódica (“pagos recurrentes”) con respecto a los
                        productos. PRIMER PAGO El primer pago se realiza en el momento de suscribirse a un plan semanal. PAGOS RECURRENTES
                        El cliente habilitará los pagos recurrentes al inicio del contrato y continuará realizándolos de forma automática
                        cada sábado a lo largo del período en el que mantiene su plan semanal activo. Si el pago no está autorizado o la
                        tarjeta caduca, Let’s cook enviará al cliente un correo electrónico para informarles de esto y el cliente deberá
                        entrar en su área de cliente en la web de Let’s cook para actualizar los datos de su tarjeta de pago. El cliente
                        acuerda, entiende y reconoce que Let’s cook puede contratar a terceros procesadores de pagos/proveedores de
                        servicios de pasarela para facilitar el procesamiento de pagos recurrentes. En consecuencia, el cliente puede estar
                        obligado a seguir los términos y condiciones de Terceros procesadores de pago/proveedores de servicios de pasarela.
                        En el evento que: (a) el cliente cancela o deshabilita los pagos recurrentes; o (b) se rechaza uno de los pagos
                        recurrentes del cliente, por cualquier motivo, incluyendo, sin limitación, la expiración de la tarjeta de pago,
                        Let’s cook tiene el derecho de cancelar el plan semanal del cliente de forma inmediata. MODIFICACIONES O CANCELACIÓN
                        Si el cliente desea hacer modificaciones a su plan semanal (modificar el número de comensales, el número de kits,
                        cambiar de plan, saltar semanas o cancelar su plan) puede hacerlo hasta el viernes a las 23:59 cada semana. Pasado
                        esta fecha límite se confirma el pedido y pasa a ser cobrado el sábado. El pago se realizará por la tarjeta de
                        débito o de crédito que el cliente especifica en el momento de la compra. Para cambiar los datos de tarjeta de pago,
                        el cliente puede acceder a su área de clientes y cambiarla en cualquier momento. El producto contratado, el plan
                        semanal, es valido hasta que el cliente o Let’s cook decida cancelarlo. Siempre que sea antes de cada viernes a las
                        23:59. IDIOMA En caso de que alguna parte de estos términos se traduzca en un idioma distinto del castellano, esto
                        se hará de buena fe y sólo con fines de aclaración. En la medida en que el significado de la versión traducida
                        difiere del de la versión castellana, la versión en castellana será la versión en la que se invoque y tendrá
                        prioridad en todos los casos. El cliente reconoce que ha tenido la oportunidad de leer y revisar la versión en
                        castellano de los términos. COMUNICACIÓN El cliente autoriza a Let’s cook a comunicarse con él por correo
                        electrónico, mensaje de texto o teléfono en relación con los servicios y pagos recurrentes. Además de leer las
                        presentes Condiciones, antes de acceder, navegar y/o usar esta página web, el Usuario ha de haber leído el Aviso
                        Legal y las Condiciones Generales de Uso, incluyendo, la política de cookies, y la política de privacidad y de
                        protección de datos de LetsCook. Al utilizar este Sitio Web o al hacer y/o solicitar la adquisición de un producto
                        y/o servicio a través del mismo el Usuario consiente quedar vinculado por estas Condiciones y por todo lo
                        anteriormente mencionado, por lo que si no está de acuerdo con todo ello, no debe usar este Sitio Web. Asimismo, se
                        informa que estas Condiciones podrían ser modificadas. El Usuario es responsable de consultarlas cada vez que
                        acceda, navegue y/o use el Sitio Web ya que serán aplicables aquellas que se encuentren vigentes en el momento en
                        que se solicite la adquisición de productos y/o servicios. Para todas las preguntas que el Usuario pueda tener en
                        relación con las Condiciones puede ponerse en contacto con el titular utilizando los datos de contacto facilitados
                        más arriba o, en su caso, utilizando el formulario de contacto. 2. EL USUARIO El acceso, la navegación y uso del
                        Sitio Web, confiere la condición de usuario (en adelante referido, indistintamente, individualmente como Usuario o
                        conjuntamente como Usuarios), por lo que se aceptan, desde que se inicia la navegación por el Sitio Web, todas las
                        Condiciones aquí establecidas, así como sus ulteriores modificaciones, sin perjuicio de la aplicación de la
                        correspondiente normativa legal de obligado cumplimiento según el caso. El Usuario asume su responsabilidad de un
                        uso correcto del Sitio Web. Esta responsabilidad se extenderá a: Hacer uso de este Sitio Web únicamente para
                        realizar consultas y compras o adquisiciones legalmente válidas. No realizar ninguna compra falsa o fraudulenta. Si
                        razonablemente se pudiera considerar que se ha hecho una compra de esta índole, podría ser anulada y se informaría a
                        las autoridades pertinentes. Facilitar datos de contacto veraces y lícitos, por ejemplo, dirección de correo
                        electrónico, dirección postal y/u otros datos (ver Aviso Legal y Condiciones Generales de Uso). El Usuario declara
                        ser mayor de 18 años y tener capacidad legal para celebrar contratos a través de este Sitio Web. El Sitio Web está
                        dirigido principalmente a Usuarios residentes en España. LetsCook no asegura que el Sitio Web cumpla con
                        legislaciones de otros países, ya sea total o parcialmente. LetsCook declina toda responsabilidad que se pueda
                        derivar de dicho acceso, así como tampoco asegura envíos o prestación de servicios fuera de España. El Usuario podrá
                        formalizar, a su elección, con LetsCook el contrato de compraventa de los productos y/o servicios deseados en
                        cualquiera de los idiomas en los que las presentes Condiciones estén disponibles en este Sitio Web. 3. PROCESO DE
                        COMPRA O ADQUISICIÓN Los Usuarios debidamente registrados pueden comprar en el Sitio Web por los medios y formas
                        establecidos. Deberán seguir el procedimiento de compra y/o adquisición online de www.letscooknow.es, durante el
                        cual varios productos y/o servicios pueden ser seleccionados y añadidos al carrito, cesta o espacio final de compra
                        y, finalmente, hacer clic en "PAGAR AHORA". Asimismo, el Usuario deberá rellenar y/o comprobar la información que en
                        cada paso se le solicita, aunque, durante el proceso de compra, antes de realizar el pago, se pueden modificar los
                        datos de la compra. Seguidamente, el Usuario recibirá un correo electrónico con la confirmación del pedido. Y, en su
                        caso, se le informará, igualmente, mediante correo electrónico o mensaje de texto cuando su compra esté siendo
                        enviada. En su caso, estas informaciones también podrían ponerse a disposición del Usuario a través de su espacio
                        personal de conexión al Sitio Web. Una vez el procedimiento de compra ha concluido, el Usuario consiente que el
                        Sitio Web genere una factura electrónica que se hará llegar al Usuario a través del correo electrónico, y en su
                        caso, a través de su espacio personal de conexión al Sitio Web. Asimismo, el Usuario puede, si así lo desea, obtener
                        una copia de su factura en papel, solicitándolo a LetsCook utilizando los espacios de contacto del Sitio Web o a
                        través de los datos de contacto facilitados más arriba. El Usuario reconoce estar al corriente, en el momento de la
                        compra, de ciertas condiciones particulares de venta que conciernen al producto y/o servicio en cuestión y que se
                        muestran junto a la presentación o, en su caso, imagen de éste en su página del Sitio Web, indicando, a modo
                        enunciativo, pero no exhaustivo, y atendiendo a cada caso: nombre, precio, componentes, peso, cantidad, color,
                        detalles de los productos, o características, modo en el que se llevarán a cabo y/o coste de las prestaciones; y
                        reconoce que la realización del pedido de compra o adquisición materializa la aceptación plena y completa de las
                        condiciones particulares de venta aplicables a cada caso. Las comunicaciones, órdenes de compra y pagos que
                        intervengan durante las transacciones efectuadas en el Sitio Web podrían ser archivadas y conservadas en los
                        registros informatizados de LetsCook con el fin de constituir un medio de prueba de las transacciones, en todo caso,
                        respetando las condiciones razonables de seguridad y las leyes y normativas vigentes que a este respecto sean de
                        aplicación, y particularmente atendiendo al Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de
                        abril de 2016, relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos
                        personales y a la libre circulación de estos datos (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre, de Protección
                        de Datos Personales y garantía de los derechos digitales, y a los derechos que asisten a los Usuarios conforme a la
                        política de privacidad de este Sitio Web. 4. DISPONIBILIDAD Todos los pedidos de compra recibidos por LetsCook a
                        través del Sitio Web están sujetos a la disponibilidad de los productos y/o a que ninguna circunstancia o causa de
                        fuerza mayor (cláusula nueve de estas Condiciones) afecte al suministro de los mismos y/o a la prestación de los
                        servicios. Si se produjeran dificultades en cuanto al suministro de productos o no quedaran productos en stock,
                        LetsCook se compromete a contactar al Usuario y reembolsar cualquier cantidad que pudiera haber sido abonada en
                        concepto de importe. Esto será igualmente aplicable en los casos en los que la prestación de un servicio deviniera
                        irrealizable. 5. PRECIOS Y PAGO Los precios exhibidos en el Sitio Web son los finales, en Euros (€) e incluyen los
                        impuestos, salvo que por exigencia legal, especialmente en lo relativo al IVA, se señale y aplique cuestión
                        distinta. Los gastos de envío se encuentran incluidos en los precios finales de los productos tal y como se muestran
                        en el Sitio Web. Salvo que el envío es destinado a una dirección en códigos postales fuera de Barcelona. En el
                        proceso de compra el gasto adicional de envío, en el caso que existiera, se le mostraría al usuario según el código
                        postal que introdujera. En ningún caso el Sitio Web añadirá costes adicionales al precio de un producto o de un
                        servicio de forma automática, sino solo aquellos que el Usuario haya seleccionado y elegido voluntaria y libremente.
                        Los precios pueden cambiar en cualquier momento, pero los posibles cambios no afectarán a los pedidos o compras con
                        respecto a los que el Usuario ya haya recibido una confirmación de pedido. Los medios de pago aceptados serán:
                        Tarjeta de crédito o débito. Asimismo, el Usuario podrá pagar todo o parte del precio de la compra con una tarjeta
                        regalo y/o una tarjeta abono emitida por LetsCook. LetsCook utiliza todos los medios para garantizar la
                        confidencialidad y la seguridad de los datos de pago transmitidos por el Usuario durante las transacciones a través
                        del Sitio Web. Como tal, el Sitio Web utiliza un sistema de pago seguro SSL (Secure Socket Layer). Las tarjetas de
                        crédito estarán sujetas a comprobaciones y autorizaciones por parte de la entidad bancaria emisora de las mismas, si
                        dicha entidad no autorizase el pago, LetsCook no será responsable por ningún retraso o falta de entrega y no podrá
                        formalizar ningún contrato con el Usuario. Si el medio de pago es tarjeta regalo o tarjeta abono el cargo se hará en
                        el momento en que LetsCook envíe una confirmación del pedido de compra o adquisición de productos y/o servicios al
                        Usuario. En todo caso, al hacer clic en "PAGAR AHORA" el Usuario confirma que el método de pago utilizado es suyo, o
                        que, en su caso, es el legítimo poseedor de la tarjeta regalo o de la tarjeta abono. 6. ENTREGA En los casos en los
                        que proceda realizar la entrega física del bien contratado, las entregas se efectuarán en el ámbito del siguiente
                        territorio: Cataluña. Exceptuando aquellos casos en los que existan circunstancias imprevistas o extraordinarias o,
                        en su caso, derivadas de la personalización de los productos, el pedido de compra consistente en los productos
                        relacionados en cada confirmación de compra será entregado en el plazo señalado en el Sitio Web según el método de
                        envío anunciado. Si por algún motivo, que le fuera imputable, LetsCook no pudiera cumplir con la fecha de entrega,
                        contactará al Usuario para informarle de esta circunstancia y, éste podrá elegir seguir adelante con la compra
                        estableciendo una nueva fecha de entrega o bien anular el pedido con el reembolso total del precio pagado. En
                        cualquier caso, las entregas a domicilio se realizan en días laborables. Si resultara imposible efectuar la entrega
                        del pedido por ausencia del Usuario, el pedido podría ser devuelto al almacén. No obstante, el transportista o Let’s
                        cook dejaría un aviso explicando dónde se encuentra el pedido y cómo hacer para que sea entregado de nuevo. Si el
                        Usuario no va a estar en el lugar de entrega en la franja horaria convenida, debe ponerse en contacto con LetsCook
                        para convenir la entrega en otro horario o día. A efectos de las presentes Condiciones, se entenderá que se ha
                        producido la entrega o que el pedido ha sido entregado en el momento en el que el Usuario o un tercero indicado por
                        el Usuario adquiera la posesión material de los productos, lo que se acreditará mediante la firma de la recepción
                        del pedido en la dirección de entrega convenida. Los riesgos que de los productos se pudieran derivar serán a cargo
                        del Usuario a partir del momento de su entrega. El Usuario adquiere la propiedad de los productos cuando LetsCook
                        recibe el pago completo de todas las cantidades debidas en relación a la compra o adquisición efectuada, incluidos
                        los gastos de envío, o bien en el momento de la entrega, si ésta tiene lugar en un momento posterior a la recepción
                        completa del importe objeto de pago por LetsCook. De conformidad con lo dispuesto en la Ley 37/1992, de 28 de
                        diciembre, del Impuesto sobre el Valor Añadido (IVA), los pedidos de compra para su entrega y/o prestación se
                        entenderán localizados en el territorio de aplicación del IVA español si la dirección de entrega está en territorio
                        español salvo Canarias, Ceuta y Melilla. El tipo de IVA aplicable será el legalmente vigente en cada momento en
                        función del artículo concreto de que se trate. 7. MEDIOS TÉCNICOS PARA CORREGIR ERRORES Se pone en conocimiento del
                        Usuario que en caso de que detecte que se ha producido un error al introducir datos necesarios para procesar su
                        solicitud de compra en el Sitio Web, podrá modificar los mismos poniéndose en contacto con LetsCook a través de los
                        espacios de contacto habilitados en el Sitio Web, y, en su caso, a través de aquellos habilitados para contactar con
                        el servicio de atención al cliente, y/o utilizando los datos de contacto facilitados en la cláusula primera
                        (Información general). Asimismo, estas informaciones también podrían subsanarse por el Usuario a través de su
                        espacio personal de conexión al Sitio Web. En cualquier caso, el Usuario, antes de hacer clic en "PAGAR AHORA",
                        tiene acceso al espacio, carrito, o cesta donde se van anotando sus solicitudes de compra y puede hacer
                        modificaciones. De igual forma, se remite al Usuario a consultar el Aviso Legal y Condiciones Generales de Uso y, en
                        concreto, la Política de Privacidad para recabar más información sobre cómo ejercer su derecho de rectificación
                        según lo establecido en el Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016,
                        relativo a la protección de las personas físicas en lo que respecta al tratamiento de datos personales y a la libre
                        circulación de estos datos (RGPD) y en la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales
                        y garantía de los derechos digitales. 8. DEVOLUCIONES En los casos en los que el Usuario adquiriera productos en o
                        través del Sitio Web del titular, le asisten una serie de derechos, tal y como se enumeran y describen a
                        continuación: Derecho de Desistimiento El Usuario reconoce saber que existen excepciones al derecho de
                        desistimiento, tal y como se recoge en el artículo 103 del Real Decreto Legislativo 1/2007, de 16 de noviembre, por
                        el que se aprueba el texto refundido de la Ley General para la Defensa de los Consumidores y Usuarios y otras leyes
                        complementarias. De forma enunciativa, y no exhaustiva, este sería el caso de: productos personalizados; productos
                        que puedan deteriorarse o caducar con rapidez; CDs/DVD de música o video sin su envoltorio, tal y como se precinta
                        en fábrica; productos que por razones de higiene o de la salud van precintados y han sido desprecintados tras la
                        entrega. En este mismo sentido se rige la prestación de un servicio que el Usuario pudiera contratar en este Sitio
                        Web, pues esta misma Ley establece que no asistirá el Derecho de desistimiento a los Usuarios cuando la prestación
                        del servicio ha sido completamente ejecutada, o cuando haya comenzado, con el consentimiento expreso del consumidor
                        y usuario y con el reconocimiento por su parte de que es consciente de que, una vez que el contrato haya sido
                        completamente ejecutado por LetsCook, habrá perdido su derecho de desistimiento. Devolución de productos defectuosos
                        o error en el envío Se trata de todos aquellos casos en los que el Usuario considera que, en el momento de la
                        entrega, el producto no se ajusta a lo estipulado en el contrato o pedido de compra, y que, por tanto, deberá
                        ponerse en contacto con LetsCook inmediatamente y hacerle saber la disconformidad existente (defecto/error) por los
                        mismos medios o a través del correo electrónico info@letscooknow.es El Usuario será entonces informado, si aplica,
                        sobre cómo proceder a la devolución de los productos, y estos, una vez devueltos, serán examinados y se informará al
                        Usuario, dentro de un plazo razonable, si procede el reembolso o, en su caso, la sustitución del mismo. El reembolso
                        o la sustitución del producto se efectuará lo antes posible. El importe abonado por aquellos productos que sean
                        devueltos a causa de algún defecto, cuando realmente exista, será reembolsado íntegramente, incluidos los gastos de
                        entrega y los costes en que hubiera podido incurrir el Usuario para realizar la devolución. El reembolso se
                        efectuará por el mismo medio de pago que el Usuario utilizó para pagar la compra. En todo caso, se estará siempre a
                        los derechos reconocidos en la legislación vigente en cada momento para el Usuario, en tanto que consumidor y
                        usuario. 9. EXONERACIÓN DE RESPONSABILIDAD Salvo disposición legal en sentido contrario, LetsCook no aceptará
                        ninguna responsabilidad por las siguientes pérdidas, con independencia de su origen: cualesquiera pérdidas que no
                        fueran atribuibles a incumplimiento alguno por su parte; pérdidas empresariales (incluyendo lucro cesante, de
                        ingresos, de contratos, de ahorros previstos, de datos, pérdida del fondo de comercio o gastos innecesarios
                        incurridos); o de toda otra pérdida indirecta que no fuera razonablemente previsible por ambas partes en el momento
                        en que se formalizó el contrato de compraventa de los productos entre ambas partes. Igualmente, LetsCook también
                        limita su responsabilidad en cuanto a los siguientes casos: LetsCook aplica todas las medidas concernientes a
                        proporcionar una visualización fiel del producto en el Sitio Web, sin embargo no se responsabiliza por las mínimas
                        diferencias o inexactitudes que puedan existir debido a falta de resolución de la pantalla, o problemas del
                        navegador que se utilice u otros de esta índole. LetsCook actuará con la máxima diligencia a efectos de poner a
                        disposición de la empresa encargada del transporte del producto objeto del pedido de compra. Sin embargo, no se
                        responsabiliza por perjuicios provenientes de un mal funcionamiento del transporte, especialmente por causas como
                        huelgas, retenciones en carreteras, y en general cualquiera otras propias del sector, que deriven en retrasos,
                        pérdidas o hurtos del producto. Fallos técnicos que por causas fortuitas o de otra índole, impidan un normal
                        funcionamiento del servicio a través de internet. Falta de disponibilidad del Sitio Web por razones de mantenimiento
                        u otras, que impida disponer del servicio. LetsCook pone todos los medios a su alcance a efectos de llevar a cabo el
                        proceso de compra, pago y envío/entrega de los productos, no obstante, se exime de responsabilidad por causas que no
                        le sean imputables, caso fortuito o fuerza mayor. LetsCook no se hará responsable del mal uso y/o del desgaste de
                        los productos que hayan sido utilizados por el Usuario. Al mismo tiempo, LetsCook tampoco se hará responsable de una
                        devolución errónea realizada por el Usuario. Es responsabilidad del Usuario devolver el producto correcto. En
                        general, LetsCook no se responsabilizará por ningún incumplimiento o retraso en el cumplimiento de alguna de las
                        obligaciones asumidas, cuando el mismo se deba a acontecimientos que están fuera de su control razonable, es decir,
                        que se deban a causa de fuerza mayor, y ésta podrá incluir, a modo enunciativo, pero no exhaustivo: Huelgas, cierres
                        patronales u otras medidas reivindicativas. Conmoción civil, revuelta, invasión, amenaza o ataque terrorista, guerra
                        (declarada o no) o amenaza o preparativos de guerra. Incendio, explosión, tormenta, inundación, terremoto,
                        hundimiento, epidemia o cualquier otro desastre natural. Imposibilidad de uso de trenes, barcos, aviones,
                        transportes de motor u otros medios de transporte, públicos o privados. Imposibilidad de utilizar sistemas públicos
                        o privados de telecomunicaciones. Actos, decretos, legislación, normativa o restricciones de cualquier gobierno o
                        autoridad pública. De esta forma, las obligaciones quedarán suspendidas durante el periodo en que la causa de fuerza
                        mayor continúe, y LetsCook dispondrá de una ampliación en el plazo para cumplirlas por un periodo de tiempo igual al
                        que dure la causa de fuerza mayor. LetsCook pondrá todos los medios razonables para encontrar una solución que le
                        permita cumplir con sus obligaciones a pesar de la causa de fuerza mayor. 10. COMUNICACIONES POR ESCRITO Y
                        NOTIFICACIONES Mediante el uso de este Sitio Web, el Usuario acepta que la mayor parte de las comunicaciones con
                        LetsCook sean electrónicas (correo electrónico o avisos publicados en el Sitio Web). A efectos contractuales, el
                        Usuario consiente en usar este medio electrónico de comunicación y reconoce que todo contrato, notificación,
                        información y demás comunicaciones que LetsCook envíe de forma electrónica cumplen con los requisitos legales de ser
                        por escrito. Esta condición no afectará a los derechos reconocidos por ley al Usuario. El Usuario puede enviar
                        notificaciones y/o comunicarse con LetsCook a través de los datos de contacto que en estas Condiciones se facilitan
                        y, en su caso, a través de los espacios de contacto del Sitio Web. Igualmente, salvo que se estipule lo contrario,
                        LetsCook puede contactar y/o notificar al Usuario en su correo electrónico o en la dirección postal facilitada. 11.
                        RENUNCIA Ninguna renuncia de LetsCook a un derecho o acción legal concreta o la falta de requerimiento por LetsCook
                        del cumplimiento estricto por el Usuario de alguna de sus obligaciones supondrá, ni una renuncia a otros derechos o
                        acciones derivados de un contrato o de las Condiciones, ni exonerará al Usuario del cumplimiento de sus
                        obligaciones. Ninguna renuncia de LetsCook a alguna de las presentes Condiciones o a los derechos o acciones
                        derivados de un contrato surtirá efecto, a no ser que se establezca expresamente que es una renuncia y se formalice
                        y se le comunique al Usuario por escrito. 12. NULIDAD Si alguna de las presentes Condiciones fuesen declaradas nulas
                        y sin efecto por resolución firme dictada por autoridad competente, el resto de las cláusulas permanecerán en vigor,
                        sin que queden afectadas por dicha declaración de nulidad. 13. ACUERDO COMPLETO Las presentes Condiciones y todo
                        documento al que se haga referencia expresa en estas constituyen el acuerdo íntegro existente entre el Usuario y
                        LetsCook en relación con el objeto de compraventa y sustituyen a cualquier otro pacto, acuerdo o promesa anterior
                        convenida verbalmente o por escrito por las mismas partes. El Usuario y LetsCook reconocen haber consentido la
                        celebración de un contrato sin haber confiado en ninguna declaración o promesa hecha por la otra parte, salvo
                        aquello que figura expresamente mencionado en las presentes Condiciones. 14. PROTECCIÓN DE DATOS La información o
                        datos de carácter personal que el Usuario facilite a LetsCook en el curso de una transacción en el Sitio Web, serán
                        tratados con arreglo a lo establecido en la Política de Privacidad o de protección de datos (contenida, en su caso,
                        en el Aviso Legal y Condiciones Generales de Uso). Al acceder, navegar y/o usar el Sitio Web el Usuario consiente el
                        tratamiento de dicha información y datos y declara que toda la información o datos que facilita son veraces. 15.
                        LEGISLACIÓN APLICABLE Y JURISDICCIÓN El acceso, navegación y/o uso de este Sitio Web y los contratos de compra de
                        productos a través del mismo se regirán por la legislación española. Cualquier controversia, problema o desacuerdo
                        que surja o esté relacionado con el acceso, navegación y/o uso del Sitio Web, o con la interpretación y ejecución de
                        estas Condiciones, o con los contratos de venta entre LetsCook y el Usuario, será sometida a la jurisdicción no
                        exclusiva de los juzgados y tribunales españoles. 16. QUEJAS Y RECLAMACIONES El Usuario puede hacer llegar a
                        LetsCook sus quejas, reclamaciones o todo otro comentario que desee realizar a través de los datos de contacto que
                        se facilitan al principio de estas Condiciones (Información General). Además, LetsCook dispone de hojas oficiales de
                        reclamación a disposición de los consumidores y usuarios, y que estos pueden solicitar a LetsCook en cualquier
                        momento, utilizando los datos de contacto que se facilitan al principio de estas Condiciones (Información General).
                        Asimismo, si de la celebración de este contrato de compra entre LetsCook y el Usuario emanara una controversia, el
                        Usuario como consumidor puede solicitar una solución extrajudicial de controversias, de acuerdo con el Reglamento
                        (UE) 524/2013 del Parlamento Europeo y del Consejo, de 21 de mayo de 2013, sobre resolución de litigios en línea en
                        materia de consumo y por el que se modifica el Reglamento (CE) 2006/2004 y la Directiva 2009/22/CE. Puede acceder a
                        este método a través del siguiente sitio web: http://ec.europa.eu/consumers/odr/. Última modificación: 2 de junio
                        2021
                    </Typography>
                </Grid>
            </Grid>
        </ModalWithoutActions>
    );
};

export default PurchaseConditionsModal;
