export interface ForgotPasswordProps {
    text: string;
};

export interface RegisterProps {
    // redirectTo: string;
    handleRedirect: (e: any) => void;
    text: string;
    boldText: string;
};