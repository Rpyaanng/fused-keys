import { test, expect } from "@jest/globals";
import { appRouter, AppRouter } from "../../root";
import { prisma } from "../../../db";
import { inferProcedureInput } from "@trpc/server";

test("Get Keyboards", async () => {
    const caller = appRouter.createCaller({
        session: null, prisma: prisma
    });

    type Input = inferProcedureInput<AppRouter["products"]["getCategory"]>;

    const input: Input = {
        category: "category"
    };

    const result = await caller.products.getCategory(input);
    console.log(result)
    expect(result).toStrictEqual({});
})

