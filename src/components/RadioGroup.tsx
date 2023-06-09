import type { PropsWithChildren } from "react";

export const RadioGroup = (
  props: PropsWithChildren<{
    selected: number;
  }>
) => {
  return (
    <>
      <div className="">{props.children}</div>
    </>
  );
};
