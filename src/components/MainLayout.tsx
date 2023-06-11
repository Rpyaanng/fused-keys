import type { PropsWithChildren } from "react";
import { Navigation } from "./Navigation";

export const MainLayout = (props: PropsWithChildren) => {
  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <main className="flex justify-center ">
        <div className="w-full border-muted p-2 md:max-w-7xl md:px-4">
          {props.children}
        </div>
      </main>
    </div>
  );
};
