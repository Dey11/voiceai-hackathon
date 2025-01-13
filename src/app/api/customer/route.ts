import { NextRequest, NextResponse } from "next/server";

import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/db";
import { customerObj } from "@/lib/zod";

export async function GET(request: NextRequest) {
  try {
    const isAuthenticated = await auth();
    if (!isAuthenticated.userId) {
      throw new Error("Unauthorized");
    }

    const customersInDb = await prisma.customer.findMany({
      where: {
        userId: isAuthenticated.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(customersInDb);
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
    const data = customerObj.safeParse(rawData);

    if (!data.success) {
      throw new Error(data.error.message);
    }

    const customer = await prisma.customer.create({
      data: {
        name: data.data.name,
        context: data.data.context,
        number: data.data.number.toString(),
        userId: isAuthenticated.userId,
      },
    });

    return NextResponse.json(customer);
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

    const customer = await prisma.customer.delete({
      where: { id: rawData.id },
    });

    return NextResponse.json(customer);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ msg: "Something went wrong" });
  }
}
