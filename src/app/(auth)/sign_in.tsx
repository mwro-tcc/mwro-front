import { t } from "../../../translations";
import TextInput from "../../ui/TextInput";

export default function SignIn() {
    return (
        <>
            <TextInput
                label={t("email.label")}
                required
                placeholder={t("email.placeholder")}
            />
            <TextInput
                label={t("password.label")}
                required
                placeholder={t("password.placeholder")}
            />
        </>
    );
}
