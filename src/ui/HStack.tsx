import { View, ViewProps, ViewStyle } from "react-native";
import {
  StyleShorthands,
  parse_style_shorthands,
} from "./types/style_shorthands";
import { ReactNode } from "react";

export default ({
  style,
  componentProps,
  children,
  ...shorthands
}: StyleShorthands & {
  children: ReactNode;
  style?: ViewStyle;
  componentProps?: ViewProps;
}) => (
  <View
    {...componentProps}
    style={{
      display: "flex",
      flexDirection: "row",
      ...(style as ViewStyle),
      ...parse_style_shorthands(shorthands),
    }}
  >
    {children}
  </View>
);
