import { NextResponse } from "next/server";

import { extractTokenFromRequest, verifySessionToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const token = extractTokenFromRequest(request);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const session = verifySessionToken(token);

    const user = await prisma.user.findUnique({
      where: { id: session.sub },
      select: {
        id: true,
        name: true,
        email: true,
        profilePicture: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        pasien: {
          select: {
            id: true,
          },
        },
        petugas: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
