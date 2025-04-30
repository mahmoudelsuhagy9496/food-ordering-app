
import { Prisma } from "@/generated/prisma";

export type ProductWithrelation = Prisma.ProductsGetPayload<{
  include: {
    sizes: true;
    extras: true;
  };
}>;
