import { MainLayout } from "~/components/MainLayout";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Progress } from "@/components/ui/progress";
import react from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Step } from "@/components/Step";
import { FullSize } from "~/components/svg/keyboards/FullSized";
import { Tenkeyless } from "~/components/svg/keyboards/Tenkeyless";
import { SixtyFive } from "~/components/svg/keyboards/SixtyFive";
import { Item, type ItemInterface } from "~/components/Item";
import { Material, type MaterialInterface } from "~/components/Material";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { api } from "~/utils/api";
import { OrbitControls } from "@react-three/drei";
import svgs from "~/components/svg/keyboards";
import { StepControl } from "~/components/StepControl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "~/components/ui";
import type { Product } from "@prisma/client";

const Model = (props: {
    parts: {
        materialName: string;
        name: string;
        materials: MaterialInterface[];
        id: number;
    }[];
}) => {
    //@ts-expect-error types are not set up correctly
    const group = useRef<typeof group>(null!);
    //@ts-expect-error types are not set up correctly
    const { nodes } = useGLTF("/blocks.gltf");
    console.log(nodes);
    return (
        <group ref={group} scale={1}>
            {props.parts.map((part) => {
                console.log(materialSelected);
                return (
                    <mesh
                        geometry={nodes[part.name].geometry}
                        position={nodes[part.name].position}
                    >
                        <meshStandardMaterial
                            name={"Material.001"}
                            color={`#${materialSelected[part.id]}`}
                        />
                    </mesh>
                );
            })}
        </group>
    );
};


const KeyboardBuilder = () => {
    const { data } = api.products.getAll.useQuery({ category: "Keyboards" });
    const [currentStep, setCurrentStep] = react.useState(0);
    const [option1, setOption1] = react.useState(0);
    if (!data) return <></>;
    console.log(data.products);
    return <>
        <StepControl steps={2} currentStep={currentStep} setCurrentStep={setCurrentStep} />
        <Accordion type="single" collapsible className="w-full" defaultValue="item-2">
            <AccordionItem value="item-1">
                <AccordionTrigger>Step 1: Size</AccordionTrigger>
                <AccordionContent className="grid grid-cols-3 gap-3 p-5">
                    {data.products.map((product, i) => {
                        return (
                            <Item
                                key={`#${product.name}-${i}`}
                                title={product.name}
                                display={svgs.keyboards[product.name]}
                                selected={option1 === i}
                                onSelect={() => setOption1(i)}
                            />
                        )
                    })
                    }
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Step 2: Material</AccordionTrigger>
                <AccordionContent className="grid grid-cols-2 gap-3 p-5">
                    <Model parts={parts} />
                </AccordionContent>
            </AccordionItem>

        </Accordion>
    </>;
};

const KeyboardPage: NextPage<{}> = () => {
    const [currentStep, setCurrentStep] = react.useState(0);
    const [sizeSelected, setSizeSelected] = react.useState(0);
    const [materialSelected, setMaterialSelected] = react.useState([
        "bd1515",
        "0000FF",
        "FFFF00",
    ]);

    const keyboardSizes = [
        {
            id: 1,
            title: "SixtyFive",
            display: <SixtyFive className="h-16" />,
        },
        {
            id: 2,
            title: "Tenkeyless(TKL)",
            display: <Tenkeyless className="h-20" />,
        },
        {
            id: 3,
            title: "Full Sized",
            features: ["Numpad, modifiers & arrow cluster present", "104 keys"],
        },
    ];

    const materials: MaterialInterface[] = [
        {
            id: 1,
            title: "Ruby Red",
            subtitle: "65%",
            features: ["No function row", "68 keys"],
            display: "bd1515",
        },
        {
            id: 2,
            title: "Saphire Blue",
            subtitle: "80%",
            features: ["No Numpad", "89 keys"],
            display: "0000FF",
        },
        {
            id: 3,
            title: "Topaz Yellow",
            subtitle: "100%",
            features: ["Numpad, modifiers & arrow cluster present", "104 keys"],
            display: "FFFF00",
        },
    ];

    const parts: {
        materialName: string;
        name: string;
        materials: MaterialInterface[];
        id: number;
    }[] = [
            {
                materialName: "Material.001",
                materials: materials,
                name: "Cube",
                id: 0,
            },
            {
                materialName: "Material.002",
                materials: materials,
                name: "Cube001",
                id: 1,
            },
            {
                materialName: "Material.003",
                materials: materials,
                name: "Cube002",
                id: 2,
            },
        ];

    const onSizeSelect = (id: number) => {
        setSizeSelected(id);
    };


    const stepList: {
        title: string;
        description: string;
        action: React.ReactNode | null;
    }[] = [
            {
                title: "Size",
                description: "Choose the size of your keyboard:",
                action: (
                    <></>
                ),
            },
            {
                title: "Materials",
                description:
                    "For sighted users to preview content available behind a link.",
                action: (
                    <div className="m-2 grid grid-cols-2">

                        <div className="m-3 rounded-md bg-muted">
                            <Canvas>
                                <Model parts={parts} />
                                <OrbitControls />

                                <ambientLight />
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
                                                            onSelect={() =>
                                                                setMaterialSelected(
                                                                    materialSelected.map((item, i) =>
                                                                        part.id === i ? material.display : item
                                                                    ),
                                                                )}
                                                            selected={false}
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
            <KeyboardBuilder />
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
