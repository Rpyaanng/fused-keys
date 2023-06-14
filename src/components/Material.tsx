import * as React from "react";
import type { ComponentProps } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export interface MaterialInterface {
    id: number;
    title: string;
    subtitle: string;
    features: Array<string> | undefined;
    display: string;
}

export const Material = (props: {
    material: MaterialInterface;
    selected: boolean;
    onSelect: (id: number) => void;
}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <div
                        className="border-poppover h-8 w-12 rounded-md border-2 border-solid p-0 shadow-sm hover:border-pop shadow-inner"
                        onClick={() => props.onSelect(props.material.id)}
                        style={{ backgroundColor: props.material.display }}
                    >
                        <span className="sr-only">{props.material.title}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{props.material.title}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};
