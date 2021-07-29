const dateFromISO8601 = (date, lang) => {
    let parts = date.match(/\d+/g);
    let event = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    const options = { year: "numeric", month: "long", day: "numeric" };
    switch (lang) {
        case "es":
            return event.toLocaleDateString("es-ES", options);
            break;
        case "en":
            return event.toLocaleDateString("en-US", options);
            break;
        case "ca":
            return event.toLocaleDateString("ca-ES", options);
            break;
        default:
            return event.toLocaleDateString("es-ES", options);
            break;
    }
};

const getNextShippingDate = (shippingDayWeekNumber: number) => {
    var today: Date = new Date();
    const deliveryDate: Date = new Date(today.getFullYear(), today.getMonth());
    const differenceInDays = shippingDayWeekNumber - today.getDay();

    deliveryDate.setDate(today.getDate() + differenceInDays); // Delivery day of this week

    if (hasToSkipWeek(shippingDayWeekNumber)) {
        deliveryDate.setDate(deliveryDate.getDate() + 7); // Delivery day of this week
    }

    return deliveryDate;
};

const hasToSkipWeek = (shippingDayWeekNumber: number) => {
    var today: Date = new Date();

    return today.getDay() >= shippingDayWeekNumber;
};
export { dateFromISO8601, getNextShippingDate };
