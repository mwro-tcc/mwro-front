import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import colors from "./config/colors";
import shadows from "./config/shadows";
import rounded from "./config/rounded";
import spacings from "./config/spacings";

type Variants = {
  primary: ViewStyle;
  secondary: ViewStyle;
};

const base_button_variant: ViewStyle = {
  borderRadius: rounded.sm,
  padding: spacings.md,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ...shadows.sm,
};

const button_variants = StyleSheet.create<Variants>({
  primary: {
    ...base_button_variant,
    backgroundColor: colors.ui_8,
  },
  secondary: {
    ...base_button_variant,
    backgroundColor: colors.ui_1,
    borderColor: colors.ui_5,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: rounded.sm,
  },
});

const text_variants = StyleSheet.create<Variants>({
  primary: {
    fontWeight: "700",
    color: colors.ui_1,
  },
  secondary: {
    fontWeight: "700",
    color: colors.ui_7,
  },
});

export default ({
  children,
  variant = "secondary",
  style,
  ...props
}: TouchableOpacityProps & {
  children: string;
  variant?: keyof Variants;
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={{
        ...button_variants[variant],
        ...(style as ViewStyle),
      }}
    >
      {typeof children === "string" ? (
        <Text style={text_variants[variant]}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
