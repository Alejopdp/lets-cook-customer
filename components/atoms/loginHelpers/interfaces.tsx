export interface ForgotPasswordProps {
    text: string;
}

export interface RegisterProps {
    handleRedirect: (e: any) => void;
    text: string;
    boldText: string;
    isSubmitting: boolean;
}
