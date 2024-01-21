import { Text, TextProps, TextStyle } from "react-native";
import {
  TextShorthands,
  parse_text_style_shorthands,
} from "./types/style_shorthands";
import { ReactNode } from "react";

export default ({
  variant = "default",
  style,
  children,
  componentProps,
  ...shorthands
}: TextShorthands &
  Partial<{
    children: ReactNode;
    variant: string;
    style: TextStyle;
    componentProps: TextProps;
  }>) => {
  return (
    <Text
      {...componentProps}
      style={{
        ...parse_text_style_shorthands(shorthands),
        ...(style as TextStyle),
      }}
    >
      {children}
    </Text>
  );
};
