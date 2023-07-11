import * as React from "react";
import type { MaterialSelect } from "~/utils/types";

export const MaterialDisplay = (props: {
  material: MaterialSelect;
  selected: boolean;

}) => {
  return (
    <div>
      <div>
        <div
          className="border-white h-8 w-8 rounded-full border-4 border-solid p-0 shadow-sm hover:border-pop"
          style={{ backgroundColor: props.material.hexColor || "#000000" }}
        >
          <span className="sr-only">{props.material.name}</span>
          <div className="bg-white relative top-4 text-center text-[9px] h-3 text-black font-semibold shadow-sm">
            <span className="relative bottom-1 left-0 right-0">{props.material.name.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
