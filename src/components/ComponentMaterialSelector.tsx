import React from 'react'
import { Component, MaterialsOnComponent, Material } from "@prisma/client"
import { MaterialDisplay } from './MaterialDisplay'
import type { ComponentSelect } from '~/utils/types'

export const ComponentMaterialSelector = (props: { component: ComponentSelect, indexSelected: number, onClick: any }) => {
  return (
    <div>
      <h3 className='font-bold underline'>{props.component.name}:</h3>
      <div className='flex gap-2'>
        {
          props.component.materials.map((materialOnComponent, index) => {
            return (
              <div onClick={() => props.onClick(index)}>
                <MaterialDisplay
                  key={`${props.component.id}_${materialOnComponent.material.id}`}
                  material={materialOnComponent.material}
                  selected={index === props.indexSelected}
                />
              </div>
            )
          })
        }
      </div>
    </div>)
}
