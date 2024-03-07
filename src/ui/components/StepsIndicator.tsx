import React from "react";
import { View, StyleSheet } from "react-native";
import spacings from "../config/spacings";
import rounded from "../config/rounded";
import colors from "../config/colors";

type StepsIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  step: {
    width: spacings.sm,
    height: spacings.sm,
    borderRadius: rounded.sm,
    backgroundColor: colors.ui_5,
  },
  currentStep: {
    backgroundColor: colors.ui_7,
  },
});

const StepsIndicator = ({ currentStep, totalSteps }: StepsIndicatorProps) => {
  const steps = Array.from({ length: totalSteps });

  return (
    <View style={styles.container}>
      {steps.map((_, index) => (
        <View
          key={index}
          style={[styles.step, index + 1 === currentStep && styles.currentStep]}
        />
      ))}
    </View>
  );
};

export default StepsIndicator;
