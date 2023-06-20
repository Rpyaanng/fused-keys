import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

import { z } from "zod";

export const productRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAllByCategory: publicProcedure.input(z.object({ category : z.string() }))
  .query(({ ctx, input }) => {
    const products = ctx.prisma.product.findMany({ take: 100, where: { category: input.category } });
    return products;
  }),

});
