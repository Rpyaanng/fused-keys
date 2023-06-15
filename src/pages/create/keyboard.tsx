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
import { type MaterialInterface, Material } from "~/components/Material";
import { useRef, useEffect } from "react";
import { BoxGeometry, Mesh, MeshBasicMaterial, PointLight } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";
import { useLoader } from "@react-three/fiber";
import { MeshPhongMaterial } from "three";


const KeyboardPage: NextPage<{ id: string }> = ({ id }) => {
    const [currentStep, setCurrentStep] = react.useState(0);
    const [sizeSelected, setSizeSelected] = react.useState(0);

    const onSizeSelect = (id: number) => {
        setSizeSelected(id);
    };

    function Model(props) {
        const group = useRef();
        const mat = useLoader(MTLLoader, "/blocks.mtl");
        console.log(mat);
        const obj = useLoader(OBJLoader, "/blocks.obj", (loader) => {
            mat.preload();
            loader.setMaterials(mat);
        });
        return (
            <group {...props} ref={group} {...props} dispose={null}>
                <OrbitControls />
                <primitive object={obj} scale={2} />
            </group>
        );
    }

    const keyboardSizes: ItemInterface[] = [
        {
            id: 1,
            title: "SixtyFive",
            subtitle: "65%",
            features: ["No function row", "68 keys"],
            display: <SixtyFive className="h-16" />,
        },
        {
            id: 2,
            title: "Tenkeyless(TKL)",
            subtitle: "80%",
            features: ["No Numpad", "89 keys"],
            display: <Tenkeyless className="h-20" />,
        },
        {
            id: 3,
            title: "Full Sized",
            subtitle: "100%",
            features: ["Numpad, modifiers & arrow cluster present", "104 keys"],
            display: <FullSized className="h-20" />,
        },
    ];

    const materials: MaterialInterface[] = [
        {
            id: 1,
            title: "Ruby Red",
            subtitle: "65%",
            features: ["No function row", "68 keys"],
            display: "#bd1515",
        },
        {
            id: 2,
            title: "Saphire Blue",
            subtitle: "80%",
            features: ["No Numpad", "89 keys"],
            display: "#0000FF",
        },
        {
            id: 3,
            title: "Topaz Yellow",
            subtitle: "100%",
            features: ["Numpad, modifiers & arrow cluster present", "104 keys"],
            display: "#FFFF00",
        },
    ];

    const parts: { name: string; materials: MaterialInterface[]; id: string }[] =
        [
            {
                name: "Top Plate",
                materials: materials,
                id: "TopPlate",
            },
            {
                name: "Bottom Plate",
                materials: materials,
                id: "BottomPlate",
            },
            { name: "Back Plate", materials: materials, id: "BackPlate" },
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
                    <div className="grid grid-cols-3 gap-3 p-5">
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
                action: (
                    <div className="m-2 grid grid-cols-2">
                        <div className="m-3 rounded-md bg-muted">
                            <Canvas className="h-full w-full">
                                <Suspense fallback={null}>
                                    <Model />
                                    <Environment preset="city" />
                                    <ambientLight />
                                </Suspense>
                            </Canvas>
                        </div>
                        <div className="m-3">
                            <div className="gap-3 rounded-md bg-muted p-5">
                                {parts.map((part) => {
                                    return (
                                        <div key={part.id}>
                                            <h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
                                                {part.name}:
                                            </h3>
                                            <div className="mt-3 flex gap-2">
                                                {materials.map((material, j) => {
                                                    return (
                                                        <Material
                                                            key={`${part.id}-${material.title}-${j}`}
                                                            material={material}
                                                        />
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                ),
            },
        ];

    const [steps, setSteps] = react.useState(stepList.length);

    return (
        <MainLayout>
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
            <ul>
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
