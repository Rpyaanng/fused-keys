import type { PropsWithChildren } from "react";
import { Navigation } from "./Navigation";

export const MainLayout = (props: PropsWithChildren) => {
  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <main className="flex justify-center ">
        <div className="no-scrollbar min-h-screen  w-full overflow-y-auto border-muted md:max-w-7xl md:px-4">
          {props.children}
        </div>
      </main>
    </div>
  );
};
