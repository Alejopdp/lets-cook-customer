export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const pswRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

export const isEmail = (value) => emailRegex.test(value);

export const isPassword = (value) => pswRegex.test(value);
