// Utils & Config
import React from 'react'

// Internal components
import FormPaper from "../../molecules/formPaper/formPaper";
import { PasswordInput } from "../../atoms/inputs/inputs";
import CustomButton from "../../atoms/customButton/customButton";
import SocialNetworksButtons from '../../atoms/socialNetworksButtons/socialNetworksButtons';
import { Register } from '../../atoms/loginHelpers/loginHelpers';
import Divider from '../../atoms/divider/divider';
import CustomCheckbox from '../../atoms/customCheckbox/customCheckbox';
import { useLang } from '@hooks';

const PassSignup = () => {
    const [values, setValues] = React.useState({
        authorize: false,
        sendInfo: false,
        password: '',
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value || event.target.checked });
    };

    const handleSubmit = () => {
        console.log("Submit")
    };

    console.log(values)

    const [lang] = useLang('passSignup')

    return (
        <FormPaper title={lang.createAccount}>
            <PasswordInput
                label={lang.password}
                name="password"
                value={values.password}
                onChange={handleChange("password")}
            />

            <CustomCheckbox
                name="authorize"
                checked={values.authorize}
                onChange={handleChange("authorize")}
                label={lang.auth}
                boldText={lang.tapHere}
                redirectTo={"/aviso-legal"}
            />

            <CustomCheckbox
                name="sendInfo"
                checked={values.sendInfo}
                onChange={handleChange("sendInfo")}
                label={lang.sendInfo}
                boldText={lang.tapHere}
                redirectTo={"/aviso-legal"}
            />

            <CustomButton
                disabled={values.authorize === true ? false : true }
                text={lang.signIn}
                onClick={handleSubmit}
            />

            <Divider />

            <SocialNetworksButtons />

            <Register text={lang.hasAccount} boldText={lang.singInHere} redirectTo="/ingresar" />
        </FormPaper>
    )
}

export default PassSignup;
