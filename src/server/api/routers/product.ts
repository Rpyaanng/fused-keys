import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { productSelect } from "~/utils/types";

export const productRouter = createTRPCRouter({
  getCategory: publicProcedure
    .input(z.object({ category: z.string() }))
    .query(async ({ ctx, input }) => {
      const products = await ctx.prisma.product.findMany({
        where: {
          categories: {
            some: { name: input.category },
          },
        },
        select: productSelect
      });
      return {
        products: products,
      }
    }),
});
