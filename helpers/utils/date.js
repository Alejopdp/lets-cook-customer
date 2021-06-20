const dateFromISO8601 = (date, lang) => {
    let parts = date.match(/\d+/g);
    let event = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    switch (lang) {
        case 'es':
            return event.toLocaleDateString('es-ES', options);
            break;
        case 'en':
            return event.toLocaleDateString('en-US', options);
            break;
        case 'ca':
            return event.toLocaleDateString('ca-ES', options);
            break;
        default:
            return event.toLocaleDateString('es-ES', options);
            break;
    }
}

export { dateFromISO8601 }