import { NextRequest } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { Product } from "@/lib/types";
import { editProductObj, productObj } from "@/lib/zod";

type Response<T> = {
  status: Number;
  msg: String;
  payload?: T;
};

export async function GET(request: NextRequest): Promise<Response<Product[]>> {
  try {
    const isAuthenticated = await auth();
    if (!isAuthenticated.userId) {
      throw new Error("Unauthorized");
    }

    const productsInDb = await prisma.product.findMany({
      where: {
        userId: isAuthenticated.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      status: 200,
      msg: "Success",
      payload: productsInDb as Product[],
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return {
        status: 401,
        msg: err.message,
      };
    }
    return {
      status: 500,
      msg: "Something went wrong",
    };
  }
}

export async function POST(request: NextRequest): Promise<Response<Product>> {
  try {
    const isAuthenticated = await auth();
    if (!isAuthenticated.userId) {
      throw new Error("Unauthorized");
    }

    const rawData = await request.body;
    const data = productObj.safeParse(rawData);

    if (!data.success) {
      throw new Error(data.error.message);
    }

    const product = await prisma.product.create({
      data: {
        name: data.data.name,
        description: data.data.description,
        price: data.data.price,
        userId: isAuthenticated.userId,
      },
    });

    return {
      status: 200,
      msg: "Success",
      payload: product,
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return {
        status: 401,
        msg: err.message,
      };
    }
    return {
      status: 500,
      msg: "Something went wrong",
    };
  }
}

export async function PUT(request: NextRequest) {
  try {
    const isAuthenticated = await auth();
    if (!isAuthenticated.userId) {
      throw new Error("Unauthorized");
    }

    const rawData = await request.body;
    const data = editProductObj.safeParse(rawData);

    if (!data.success) {
      throw new Error(data.error.message);
    }

    const product = await prisma.product.update({
      where: {
        id: data.data.id,
        userId: isAuthenticated.userId,
      },
      data: {
        name: data.data.name,
        description: data.data.description,
        price: data.data.price,
      },
    });

    return {
      status: 200,
      msg: "Success",
      payload: product,
    };
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return {
        status: 401,
        msg: err.message,
      };
    }
    return {
      status: 500,
      msg: "Something went wrong",
    };
  }
}
