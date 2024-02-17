import { useRouter } from "expo-router";
import { t } from "../../../translations";
import Button from "../../ui/Button";
import TextInput from "../../ui/TextInput";
import { useForm } from "react-hook-form";
import { SignInForm } from "../../types/user";
import useAuth from "../../hooks/useAuth";

export default function SignIn() {
  const { control, handleSubmit } = useForm<SignInForm>();
  const router = useRouter();
  const { sign_in } = useAuth();

  return (
    <>
      <TextInput
        label={t("authentication.email.label")}
        placeholder={t("authentication.email.placeholder")}
        autoComplete="email"
        keyboardType="email-address"
        required
        name={"email"}
        control={control}
      />
      <TextInput
        label={t("authentication.password.label")}
        placeholder={t("authentication.password.placeholder")}
        autoComplete="current-password"
        secureTextEntry
        name={"password"}
        control={control}
      />
      <Button onPress={handleSubmit(sign_in)} variant="primary">
        {t("authentication.sign_in.button")}
      </Button>
      <Button onPress={router.back}>{t("authentication.back")}</Button>
    </>
  );
}
