import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { productObj } from "@/lib/zod";

export async function GET(request: NextRequest) {
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

    return NextResponse.json(productsInDb);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Something went wrong" });
  }
}

export async function POST(request: NextRequest) {
  try {
    const isAuthenticated = await auth();
    if (!isAuthenticated.userId) {
      throw new Error("Unauthorized");
    }

    const rawData = await request.json();
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

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Something went wrong" });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const isAuthenticated = await auth();
    if (!isAuthenticated.userId) {
      throw new Error("Unauthorized");
    }

    const rawData = await request.json();

    const product = await prisma.product.delete({
      where: { id: rawData.id },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Something went wrong" });
  }
}

// const productsArray = [
//   {
//     id: 1,
//     name: "Product 1",
//     description: "Description 1 is my description",
//     price: 100,
//   },
//   {
//     id: 2,
//     name: "Product 2",
//     description: "Description 2 is my description",
//     price: 200,
//   },
//   {
//     id: 3,
//     name: "Product 3",
//     description: "Description 3 is my description",
//     price: 300,
//   },
//   {
//     id: 4,
//     name: "Product 4",
//     description: "Description 4 is my description",
//     price: 400,
//   },
// ];
