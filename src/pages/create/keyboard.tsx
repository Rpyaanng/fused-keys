import react, { useRef, Suspense } from "react";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

import { MainLayout } from "~/components/MainLayout";
import { Item } from "~/components/Item";
import { keyboards } from "~/components/svg/keyboards";
import { StepControl } from "~/components/StepControl";
import { ComponentMaterialSelector } from "~/components/ComponentMaterialSelector";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent
} from "~/components/ui";

import type { ComponentSelect, ProductSelect } from "~/utils/types";

const Model = (props: ProductSelect & { colors: number[] }) => {

  const group = useRef();
  const { nodes } = useGLTF(`/models/${props.id}.gltf`) as any;
  if (!props.components) {
    console.log("error")
    return <></>
  }
  return (
    <group ref={group} dispose={null} scale={0.8}>
      {
        props.components.map((component: ComponentSelect, componentIndex: number) => {
          return (
            <mesh castShadow receiveShadow geometry={nodes[component.id].geometry}>
              <meshPhongMaterial
                attach="material"
                color={component.materials[props.colors[componentIndex]]?.material.hexColor} />
            </mesh>
          )
        })
      }
    </group>
  );
};


const KeyboardBuilder = () => {

  const { data, isLoading } = api.products.getCategory.useQuery({ category: "Keyboards" });
  const [currentStep, setCurrentStep] = react.useState(0);
  const [productSelected, setProductSelected] = react.useState(1);
  const [colorsSelected, setColorSelected] = react.useState([0, 0, 0, 0, 0]);

  const selectColor = (componentIndex: number, materialIndex: number) => {
    setColorSelected(colorsSelected.map((_, index) => index === componentIndex ? materialIndex : colorsSelected[index]))
  }

  if (isLoading || !data) return <></>;
  if (!data.products) return <>No keyboards to display...</>

  return <>
    <StepControl curentStep={currentStep} setCurrentStep={setCurrentStep} steps={2} />
    <Accordion type="single" collapsible className="w-full" defaultValue="item-2">

      <AccordionItem value="item-1">
        <AccordionTrigger>Step 1: Size</AccordionTrigger>

        <AccordionContent className="grid grid-cols-3 gap-3 p-5">
          {
            data.products.map((product: ProductSelect, i: number) => {
              return (
                <Item
                  key={`item-${product.id}-${i}`}
                  id={product.id}
                  title={product.name}
                  features={[]}
                  subtitle=""
                  display={keyboards[product.id]}
                  selected={productSelected === i}
                  onClick={() => setProductSelected(i)}
                />
              )
            })
          }
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Step 2: Material</AccordionTrigger>
        <AccordionContent className="grid grid-cols-2 gap-3 p-5">
          <>
            <div>
              <Canvas className="bg-primary-foreground rounded-lg">
                <Suspense fallback={null} >
                  <Model {...data.products[productSelected]} colors={colorsSelected} />
                  <OrbitControls />
                  <directionalLight position={[1, 1, 1]} color="white" />
                  <ambientLight intensity={0.3} />
                </Suspense>
              </Canvas>
            </div>
            <div className="bg-primary-foreground rounded-lg p-3">
              {
                data.products[productSelected].components.map((component: ComponentSelect, index: number) => {
                  return (
                    <ComponentMaterialSelector
                      key={component.id}
                      component={component}
                      indexSelected={colorsSelected[index] || 0}
                      onClick={(x: number) => selectColor(index, x)
                      } />
                  )
                })
              }
            </div>
          </>
        </AccordionContent>
      </AccordionItem>

    </Accordion >
  </>;
};

const KeyboardPage: NextPage<{}> = () => {

  return (
    <MainLayout>
      <KeyboardBuilder />
    </MainLayout>
  );
};

export default KeyboardPage;
