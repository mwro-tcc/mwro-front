import { View, ViewProps, ViewStyle } from "react-native";
import {
  StyleShorthands,
  parse_style_shorthands,
} from "./types/style_shorthands";

export default ({
  style,
  componentProps,
  ...shorthands
}: StyleShorthands & {
  style: ViewStyle;
  componentProps: ViewProps;
}) => (
  <View
    {...componentProps}
    style={{
      display: "flex",
      flexDirection: "row",
      ...(style as ViewStyle),
      ...parse_style_shorthands(shorthands),
    }}
  />
);
