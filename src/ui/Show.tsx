import { ReactNode } from "react";

export default ({
  children,
  when,
  unless,
}: {
  children?: ReactNode;
  when?: any;
  unless?: any;
}) => {
  if (Boolean(unless)) return null;
  if (Boolean(when)) return children;
  return null;
};
