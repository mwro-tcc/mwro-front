import { t } from "../../../translations";
import TextInput from "../../ui/TextInput";

export default function SignIn() {
  return (
    <>
      <TextInput
        label={t("email")}
        required
        placeholder={t("email-placeholder")}
      />
      <TextInput
        label={t("password")}
        required
        placeholder={t("password-placeholder")}
      />
    </>
  );
}
