import * as React from "react";
import type { ComponentProps } from "react";

export const Item = (props: {
    id: number;
    title: string;
    subtitle: string;
    features: Array<string> | undefined;
    display: React.ReactNode;
    selected: boolean;
    onSelect: (id: number) => void;
}) => {
    return (
        <div
            onClick={() => props.onSelect(props.id)}
            className={
                props.selected
                    ? "border-solid w-82 grid rounded-lg border-4 border-pop bg-muted p-2 md:grid-cols-1"
                    : " grid rounded-lg border-4 border-solid border-transparent bg-muted p-2 hover:border-pop md:grid-cols-1"
            }
        >
            <div className="flex justify-between border-b">
                <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
                    {props.title}
                </h2>
                <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
                    {props.subtitle}
                </h2>
            </div>
            <div className="m-3 flex justify-center">{props.display}</div>

            <ul className="ml-6 mt-1 list-disc">
                {props.features?.map((feature, i) => {
                    return <li key={`feature-${props.title}-${i}}`}>{feature}</li>;
                })}
            </ul>
        </div>
    );
};
