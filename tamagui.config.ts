import { config } from "@tamagui/config/v2";
import { createTamagui } from "tamagui";

const tamaguiConfig = createTamagui({
  ...config,
  tokens: {
    ...config.tokens,
    color: {
      ...config.tokens?.color,
      ui_9: "#000000",
      ui_8: "#242424",
      ui_7: "#545454",
      ui_6: "#AFAFAF",
      ui_5: "#DADADA",
      ui_4: "#E0E0E0",
      ui_3: "#EAEAEA",
      ui_2: "#F0F0F0",
      ui_1: "#FFFFFF",
      red_6: "#D42121",
    },
  },
});

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig;
