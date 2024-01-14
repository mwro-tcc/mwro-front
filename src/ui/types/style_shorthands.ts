import { FlexAlignType, ViewStyle } from "react-native";

type Items = "center" | "end" | "start" | "baseline" | "stretch" | "nil";
type Justify =
  | "center"
  | "end"
  | "start"
  | "between"
  | "around"
  | "around"
  | "evenly"
  | "nil";

const items = {
  center: "center",
  end: "flex-end",
  start: "flex-start",
  baseline: "baseline",
  stretch: "stretch",
  nil: undefined,
} as Record<Items, FlexAlignType | undefined>;

const justify = {
  center: "center",
  end: "flex-end",
  start: "flex-start",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly",
  nil: undefined,
} as Record<
  Justify,
  | "center"
  | "flex-end"
  | "flex-start"
  | "space-between"
  | "space-around"
  | "space-evenly"
  | undefined
>;

export type StyleShorthands = Partial<{
  flex: number;
  gap: number;
  p: number;
  px: number;
  py: number;
  pt: number;
  pr: number;
  pl: number;
  pb: number;
  m: number;
  mx: number;
  my: number;
  mt: number;
  mr: number;
  ml: number;
  mb: number;
  items: Items;
  justify: Justify;
}>;

export const parse_style_shorthands = (
  shorthands: StyleShorthands,
): ViewStyle => ({
  flex: shorthands?.flex,
  gap: shorthands?.gap,
  padding: shorthands?.p,
  paddingHorizontal: shorthands?.px,
  paddingVertical: shorthands?.py,
  paddingTop: shorthands?.pt,
  paddingRight: shorthands?.pr,
  paddingLeft: shorthands?.pl,
  paddingBottom: shorthands?.pb,
  margin: shorthands?.m,
  marginHorizontal: shorthands?.mx,
  marginVertical: shorthands?.my,
  marginTop: shorthands?.mt,
  marginBottom: shorthands?.mb,
  marginRight: shorthands?.mr,
  marginLeft: shorthands?.ml,
  alignItems: items?.[shorthands?.items ?? "nil"],
  justifyContent: justify?.[shorthands?.justify ?? "nil"],
});
