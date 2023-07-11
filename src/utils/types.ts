import {
    Prisma,
    PrismaClient
} from "@prisma/client"

const materialSelect = Prisma.validator<Prisma.MaterialSelect>()({
    id: true,
    name: true,
    hexColor: true,
})

type MaterialSelect = Prisma.MaterialGetPayload<{ select: typeof materialSelect}>

const componentSelect = Prisma.validator<Prisma.ComponentSelect>()({
    description: true,
    name: true,
    id: true,
    materials: {
        select: {
            material: {
                select: materialSelect
            }

        }
    }
})


type ComponentSelect = Prisma.ComponentGetPayload<{ select: typeof componentSelect}>

const productSelect = Prisma.validator<Prisma.ProductSelect>()({
    id: true,
    name: true,
    description: true,
    components: {
        select: componentSelect
    }
});

type ProductSelect = Prisma.ProductGetPayload<{ select: typeof productSelect }>


export type { MaterialSelect, ComponentSelect, ProductSelect };
export { productSelect, componentSelect, materialSelect };
