import { Control } from "react-hook-form";
import { t } from "../../../../../translations";
import TextInput from "../../../TextInput";
import Switch from "../../../components/Switch";

type Step1Props = {
  control: Control<any>;
};

export const Step1 = ({ control }: Step1Props) => {
  return (
    <>
      <TextInput
        control={control}
        name={"name"}
        label={t("community.name")}
        required
      />
      <TextInput
        control={control}
        name={"description"}
        label={t("community.description")}
        required
        height={150}
      />
      <Switch
        label={t("community.visibility")}
        required
        control={control}
        name="isPrivate"
        LeftOption={t("community.private")}
        rightOption={t("community.public")}
      />
    </>
  );
};
