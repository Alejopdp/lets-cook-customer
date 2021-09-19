export const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

export const roundTwoDecimals = (number: number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const presentNumberWithHashtagAndDotSeparator = (number: number) => {
    return `#${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
