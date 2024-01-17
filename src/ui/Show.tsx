import { ReactNode } from "react";

export default ({
  children,
  when = true,
  unless = false,
}: {
  children?: ReactNode;
  when?: any;
  unless?: any;
}) => {
  if (Boolean(unless)) return null;
  if (Boolean(when)) return children;
  return null;
};
