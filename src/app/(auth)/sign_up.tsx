import { useForm } from "react-hook-form";
import TextInput from "../../ui/TextInput";
import { SignUpForm } from "../../types/user";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";
import { t } from "../../../translations";
import Button from "../../ui/Button";

export default function SignUp() {
  const { control, handleSubmit } = useForm<SignUpForm>();
  const router = useRouter();
  const { sign_up } = useAuth();

  return (
    <>
      <TextInput
        label={t("authentication.name.label")}
        placeholder={t("authentication.name.placeholder")}
        autoComplete="name"
        required
        control={control}
        name={"name"}
      />
      <TextInput
        label={t("authentication.email.label")}
        placeholder={t("authentication.email.placeholder")}
        autoComplete="email"
        keyboardType="email-address"
        required
        control={control}
        name={"email"}
      />
      <TextInput
        label={t("authentication.password.label")}
        placeholder={t("authentication.password.placeholder")}
        autoComplete="current-password"
        secureTextEntry
        required
        control={control}
        name={"password"}
      />
      <TextInput
        label={t("authentication.password.confirmation")}
        placeholder={t("authentication.password.placeholder")}
        autoComplete="current-password"
        secureTextEntry
        required
        control={control}
        name={"confirm_password"}
      />
      <Button onPress={handleSubmit(sign_up)} variant="primary">
        {t("authentication.sign_up.button")}
      </Button>
      <Button onPress={router.back}>{t("authentication.back")}</Button>
    </>
  );
}
