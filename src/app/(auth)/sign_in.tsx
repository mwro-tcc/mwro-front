import { t } from "../../../translations";
import TextInput from "../../ui/TextInput";

export default function SignIn() {
  return (
    <>
      <TextInput
        label={t("email.label")}
        placeholder={t("email.placeholder")}
        required
      />
      <TextInput
        label={t("password.label")}
        placeholder={t("password.placeholder")}
        required
      />
    </>
  );
}
