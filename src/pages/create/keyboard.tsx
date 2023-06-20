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
import { Suspense } from "react";
import { Environment, OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { materials } from "~/Materials/materials";
import * as THREE from "three";
import { Dict } from "@trpc/server";
const KeyboardPage: NextPage<{ id: string }> = ({ id }) => {
  const [currentStep, setCurrentStep] = react.useState(0);
  const [sizeSelected, setSizeSelected] = react.useState(0);
  const [materialSelected, setMaterialSelected] = react.useState([
    "bd1515",
    "0000FF",
    "FFFF00",
  ]);

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

  const parts: { materialName: string, name: string; materials: MaterialInterface[]; id: number }[] =
    [
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


  const Model = (props: {parts : { materialName: string, name: string; materials: MaterialInterface[]; id: number }[]}) => {
    const group = useRef<group>(null!);
    const { nodes, materials } = useGLTF("/blocks.gltf");
    console.log(nodes);
    return (
      <group ref={group}  scale={1} >
      {
        props.parts.map((part) => {
          console.log(materialSelected);
          return (
          <mesh geometry={nodes[part.name].geometry} position={nodes[part.name].position}>
            <meshStandardMaterial name={"Material.001"} color={`#${materialSelected[part.id]}`} />
          </mesh>
          )
        })
      }
       </group>
      
      )
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
                            onSelect={() => setMaterialSelected(materialSelected.map((item, i) => part.id === i ? material.display : item))} selected={false}
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
