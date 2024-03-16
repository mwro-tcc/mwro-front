import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import VStack from "../../../ui/VStack";

import Text from "../../../ui/Text";
import TextInput from "../../../ui/TextInput";
import { useForm } from "react-hook-form";
import { useCommunity } from "../../../hooks/useCommunity";
import Button from "../../../ui/Button";
import { UpdateCommunityForm } from "../../../types/community";
import { t } from "../../../../translations";
import Switch from "../../../ui/components/Switch";

export default function EditCommunity() {
  const { control, handleSubmit, setValue, watch } =
    useForm<UpdateCommunityForm>();

  const isPrivate = watch("isPrivate");

  const router = useRouter();

  const { id } = useLocalSearchParams();

  const { get_community, update_community } = useCommunity();

  const fetchCommunity = useCallback(async () => {
    const community = await get_community(id);

    setValue("name", community.name);
    setValue("description", community.description);
    setValue("isPrivate", community.isPrivate);
  }, []);

  useEffect(() => {
    fetchCommunity();
  }, []);

  const handleFormSubmit = handleSubmit((data) => {
    update_community(data);
  });

  return (
    <VStack p={20} flex={1} justify="between">
      <VStack items="center" flex={1} gap={20} mt={"25%"}>
        <Text size={28} weight="600">
          {t("community.edit.title")}
        </Text>
      </VStack>
      <VStack flex={3} gap={30}>
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
        <VStack gap={3}>
          <Switch
            label={t("community.visibility")}
            required
            control={control}
            name="isPrivate"
            LeftOption="Privada"
            rightOption="Pública"
            defaultValue={isPrivate}
          />
        </VStack>
      </VStack>
      <VStack gap={10} flex={1} justify="center">
        <Button variant="primary" onPress={handleFormSubmit}>
          {t("community.save")}
        </Button>
        <Button onPress={() => router.back()}>{t("community.cancel")}</Button>
      </VStack>
    </VStack>
  );
}
