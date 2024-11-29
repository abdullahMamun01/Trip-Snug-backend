import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";



const createBoking = catchAsync(async (req:Request , res:Response ) => {
    const body = req.body

    const booking = await bookingService.createBooking({...body ,user:req.user?.userId?.toString()})
    sendResponse(res , {
        statusCode: 201 ,
        success:true,
        message:"Hotel booking successfully" ,
        data: booking
    })
})

const getBookings = catchAsync(async (req:Request , res:Response ) => {})

export const bookingController = {
    createBoking
}