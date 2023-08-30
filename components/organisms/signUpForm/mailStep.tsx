// Utils & config
import React from "react";
import { isEmail } from "../../../helpers/regex/regex";
import { useRouter } from "next/router";
const langs = require("../../../lang").mailStep;

// External components
import SocialNetworksButtons from "../../atoms/socialNetworksButtons/socialNetworksButtons";
import { AcceptLegalTerms } from "../../atoms/loginHelpers/loginHelpers";
import Divider from "../../atoms/divider/divider";
import { RoundedButton, TextInput } from "@atoms";
import { Grid } from "@material-ui/core";
import { hasAccents } from "helpers/utils/utils";

type MailStepProps = {
    email: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (step: number) => void;
    emailAlreadyExists: boolean;
    signUpRedirect?: boolean;
    handleSignUp?: (userInfo: any) => void;
    handleOpenTycModal?: () => void;
    handleOpenPrivacyPolicyModal?: () => void;
    source?: string;
};

const MailStep = (props: MailStepProps) => {
    const router = useRouter();
    const lang = langs[router.locale];

    return (
        <>
            <SocialNetworksButtons source={props.source} />
            <AcceptLegalTerms
                handleOpenTycModal={props.handleOpenTycModal}
                handleOpenPrivacyPolicyModal={props.handleOpenPrivacyPolicyModal}
            />
            <Divider />
            <Grid item xs={12}>
                <TextInput
                    label={lang.emailInput}
                    name="email"
                    value={props.email}
                    onChange={props.handleChange}
                    helperText={props.emailAlreadyExists ? lang.emailAlreadyExistsError : hasAccents(props.email) ? lang.accentError : ""}
                    hasError={props.emailAlreadyExists || hasAccents(props.email)}
                />
            </Grid>
            <Grid item xs={12}>
                <RoundedButton
                    disabled={!isEmail(props.email) || hasAccents(props.email)}
                    label={lang.buttonText}
                    onClick={() => props.handleSubmit(1)}
                    style={{ width: "100%" }}
                />
            </Grid>
        </>
    );
};

export default MailStep;
