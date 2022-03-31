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
