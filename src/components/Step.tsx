import type { PropsWithChildren } from "react";

export const Step = (
  props: PropsWithChildren<{
    active: boolean;
    stepNumber: number;
    title: string;
    description: string;
  }>
) => {
  return (
    <>
      <h2
        className={
          props.active
            ? "mt-10 scroll-m-20  pb-2 text-3xl font-semibold tracking-tight transition-colors duration-300 ease-in first:mt-0"
            : "mt-10 scroll-m-20 pb-2 text-xl font-semibold tracking-tight text-muted-foreground transition-colors duration-300 ease-in first:mt-0"
        }
      >
        Step {props.stepNumber}: {props.title}
      </h2>
      {
        <p
          className={
            props.active
              ? "text-xl text-muted-foreground opacity-100 transition-opacity duration-300 ease-in"
              : "scale-1 text-muted-foreground opacity-0 transition-opacity duration-300 ease-in"
          }
        >
          {props.description}
        </p>
      }
      <div
        className={
          props.active
            ? "duration-2000 origin-top opacity-100 transition-all ease-in"
            : "duration-2000 origin h-0 origin-top scale-50 overflow-hidden opacity-10 transition-all ease-in"
        }
      >
        {props.children}
      </div>
    </>
  );
};
