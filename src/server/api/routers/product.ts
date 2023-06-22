import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

import { z } from "zod";
import { Material, Product } from "@prisma/client";

//   const mats = await prisma.materials.findMany({
//     where: {
//       MaterialsOnComponent: {
//         some: {
//           id: {
//             in: products.map((p) => p.id),
//           },
//         },
//       },
//     },
//   });
//
//   return products.map((product) => ({
//     product,
//     materials: mats.filter((m: Material) => m.id === product.id),
//   }));
// };

export const productRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(z.object({ category: z.string() }))
        .query(async ({ ctx, input }) => {
            const products = await ctx.prisma.product.findMany({
                where: {
                    categories: {
                        some: { name: input.category },
                    },
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    price: true,
                    image: true,
                    categories: true,
                    components: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                            image: true,
                            materials: {
                                select: {
                                    price: true,
                                    material: {
                                        select: {
                                            name: true,
                                            description: true,
                                            hexColor: true,
                                        },
                                    },
                                },
                            }
                        },
                    }
                }
            });
            return {
                products: products,
            }
        }),
});
