import { MainLayout } from "~/components/MainLayout";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Progress } from "@/components/ui/progress";
import react from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Step } from "@/components/Step";

import { FullSized } from "~/components/svg/keyboards/FullSized";
import { Tenkeyless } from "~/components/svg/keyboards/Tenkeyless";
import { SixtyFive } from "~/components/svg/keyboards/SixtyFive";
import { Toggle } from "~/components/ui/toggle";
import { Item, type ItemInterface } from "~/components/Item";

const KeyboardPage: NextPage<{ id: string }> = ({ id }) => {
  const [currentStep, setCurrentStep] = react.useState(0);

  const [sizeSelected, setSizeSelected] = react.useState(0);

  const onSizeSelect = (id: number) => {
    setSizeSelected(id);
    console.log(id);
  };

  const keyboardSizes: ItemInterface[] = [
    {
      id: 1,
      title: "SixtyFive",
      subtitle: "65%",
      features: ["No function row", "68 keys"],
      display: <SixtyFive />,
    },
    {
      id: 2,
      title: "Tenkeyless(TKL)",
      subtitle: "80%",
      features: ["No Numpad", "89 keys"],
      display: <Tenkeyless />,
    },
    {
      id: 3,
      title: "Full Sized",
      subtitle: "100%",
      features: ["Numpad, modifiers & arrow cluster present", "104 keys"],
      display: <FullSized />,
    },
  ];

  const stepList: {
    title: string;
    description: string;
    action: React.ReactNode | null;
  }[] = [
    {
      title: "Size",
      description: "Choose the size of your keyboard:",
      action: (
        <div className="sm:grid-col-1 grid gap-3 p-5 md:grid-cols-3">
          {keyboardSizes.map((keyboardSize, j) => {
            return (
              <Item
                key={`#${keyboardSize.title}-${j}`}
                item={keyboardSize}
                selected={sizeSelected === keyboardSize.id}
                onSelect={() => setSizeSelected(keyboardSize.id)}
              />
            );
          })}
        </div>
      ),
    },
    {
      title: "Materials",
      description:
        "For sighted users to preview content available behind a link.",
      action: null,
    },
    {
      title: "Switches",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
      action: null,
    },
    {
      title: "Keycaps",
      description: "Visually or semantically separates content.",
      action: null,
    },
  ];

  const [steps, setSteps] = react.useState(stepList.length);

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background p-3 md:mt-9">
        <div className="">
          Steps: {currentStep + 1} / {steps}
          <Progress value={(currentStep / (steps - 1)) * 100} />
          <div className="my-2 flex justify-between">
            <Button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              disabled={currentStep === steps - 1}
              onClick={() => setCurrentStep(currentStep + 1)}
            >
              Next
            </Button>
          </div>
        </div>
        <Separator />
      </div>
      <ul className="h-screen">
        {stepList.map((step, i) => {
          return (
            <>
              <Step
                key={`step-${i}`}
                active={currentStep === i}
                stepNumber={i + 1}
                title={stepList[i]?.title || "missing"}
                description={stepList[i]?.description || "no description"}
              >
                {step.action}
              </Step>
              <Separator />
            </>
          );
        })}
      </ul>
    </MainLayout>
  );
};

export default KeyboardPage;
