import { NextResponse } from "next/server";

export async function POST(): Promise<Response> {
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/`, 302);
}

export const dynamic = "force-dynamic";
