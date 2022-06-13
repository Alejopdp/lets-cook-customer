// const res :google.maps.places. = {}
export interface OtherAddressInformation { city: string, province: string, country: string, postalCode: string }
export const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const roundTwoDecimals = (number: number) => {
    return Math.round(number * 100) / 100;
};

export const presentNumberWithHashtagAndDotSeparator = (number: number) => {
    return `#${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};

export const hasAccents = (text: string): boolean => {
    var accentArray = ["á", "à", "ã", "â", "é", "è", "ê", "í", "ì", "î", "õ", "ó", "ò", "ô", "ú", "ù", "û"];

    for (var i = 0; i < text.length; i++) {
        for (var j = 0; j < accentArray.length; j++) {
            if (text[i] === accentArray[j]) {
                return true;
            }
        }
    }

    return false;
};

export const getDdMmYyyy = (inputDate?: Date | string): string | undefined => {
    if (!inputDate) return undefined
    const forcedDate = new Date(inputDate)
    let date, month, year;

    date = forcedDate.getDate();
    month = forcedDate.getMonth() + 1;
    year = forcedDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${date}/${month}/${year}`;
}

export const getYyyyMmDd = (inputDate?: Date | string): string | undefined => {
    if (!inputDate) return undefined
    const forcedDate = new Date(inputDate)
    let date, month, year;

    date = forcedDate.getDate();
    month = forcedDate.getMonth() + 1;
    year = forcedDate.getFullYear();

    date = date
        .toString()
        .padStart(2, '0');

    month = month
        .toString()
        .padStart(2, '0');

    return `${year}-${month}-${date}`;
}

export const getFormattedAddressFromGoogle = (address_components?: { long_name: string, short_name: string, types: string[] }[]): OtherAddressInformation => {
    if (!address_components) return {
        city: '',
        province: '',
        country: '',
        postalCode: ''

    }
    return {
        city: address_components.find(component => component.types.includes("locality"))?.long_name ?? "",
        country: address_components.find(component => component.types.includes("country"))?.long_name ?? "",
        province: address_components.find(component => component.types.includes("administrative_area_level_1"))?.long_name ?? "",
        postalCode: address_components.find(component => component.types.includes("postal_code"))?.long_name ?? ""
    }


}
