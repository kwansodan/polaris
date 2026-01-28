import { bookingRepository } from "@/features/booking/server/booking.repository";
import { NextRequest, NextResponse } from "next/server";




export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) { 
    try{
        // await requireRole(['ADMIN', 'MANAGER'])
        const awaitedParams = await params;
        const bookingId = awaitedParams.id;

        if(!bookingId){
            return NextResponse.json({
                success: false,
                message: "Booking ID is required"
            })
        }

        const booking = await bookingRepository.findById(bookingId);

        return NextResponse.json({
            success: true,
            data: booking
        }, { status: 200 })

    }catch (error) {
        console.error('Error: getting Booking', error);
        if (error instanceof NextResponse) return error
        return NextResponse.json({
            success: false,
            message: 'Failed to get Booking',
        }, { status: 500 });
    }

}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // await requireRole(['ADMIN', 'MANAGER'])
    const awaitedParams = await params;
    const bookingId = awaitedParams.id;

    if (!bookingId) {
      return NextResponse.json({
        success: false,
        message: "Booking ID is required"
      })
    }

    await bookingRepository.deleteById(bookingId);

    return NextResponse.json({
      success: true,
      message: "Booking deleted successfully"
    }, { status: 200 })

  } catch (error) {
    console.error('Booking delete error:', error);
    if (error instanceof NextResponse) return error
    return NextResponse.json({
      success: false,
      message: 'Failed to delete Booking',
    }, { status: 500 });
  }

}