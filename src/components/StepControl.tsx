import NextFunctionComponent from 'next';
import { Button, Progress, Separator } from "~/components/ui"

type Props = {
    steps: number,
    currentStep: number,
    setCurrentStep: any
};

export const StepControl: NextFunctionComponent<Props> = ({ steps, currentStep, setCurrentStep }) => {

    return (
        <>
            <div className="sticky top-0 bg-background p-0 sm:p-3">
                <div>
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

        </>
    )
}
