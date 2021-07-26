// Utils & Config
import React from 'react'

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { TextInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import { Register, AcceptLegalTerms } from '../../atoms/loginHelpers/loginHelpers';
import Divider from '../../atoms/divider/divider';
import { useLang } from "@hooks";

const MailSignup = () => {
    const [lang] = useLang('mailSignup');
    const [values, setValues] = React.useState({
        email: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = () => {
        console.log("Submit")
    };

    console.log(values)

    return (
        <FormPaper title={lang.title}>
            <TextInput
                label={lang.email}
                name="email"
                value={values.email}
                onChange={handleChange("email")}
            />

            <CustomButton
                text={lang.next}
                onClick={handleSubmit}
            />

            <Divider />

            <SocialNetworksButtons />

            <AcceptLegalTerms />

            <Register text={lang.hasAccount} boldText={lang.inHere} redirectTo="/ingresar" />
        </FormPaper>
    )
}

export default MailSignup;
