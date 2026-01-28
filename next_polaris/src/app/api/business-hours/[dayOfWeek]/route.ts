import { businessHourRepository } from "@/features/business-hour/server/businessHour.repository";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ dayOfWeek: string }> }
) {
  const awaitedParams = await params;
  const day = Number(awaitedParams.dayOfWeek);
  const record = await businessHourRepository.findByDayOfWeek(day);

  return NextResponse.json({ success: true, data: record });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ dayOfWeek: string }> }
) {
  const awaitedParams = await params;
  const day = Number(awaitedParams.dayOfWeek);
  await businessHourRepository.deleteByDayOfWeek(day);

  return NextResponse.json({ success: true });
}
