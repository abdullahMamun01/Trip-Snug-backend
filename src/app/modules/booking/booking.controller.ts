import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { bookingService } from "./booking.service";
import sendResponse from "../../utils/sendResponse";



// const createBoking = catchAsync(async (req:Request , res:Response ) => {
//     const body = req.body

//     const booking = await bookingService.createBooking({...body ,user:req.user?.userId?.toString()})
//     sendResponse(res , {
//         statusCode: 201 ,
//         success:true,
//         message:"Hotel booking successfully" ,
//         data: booking
//     })
// })

const getBookings = catchAsync(async (req:Request , res:Response ) => {
    const bookings = await bookingService.fetchBookings(req.query)
    sendResponse(res , {
        statusCode: 201 ,
        success:true,
        message:"All bookings retrieve successfully" ,
        data: bookings
    })
})

const updateBookings = catchAsync(async (req:Request , res:Response ) => {
    const bookingId = req.params.bookingId
    const body = req.body
    const bookings = await bookingService.updateBooking(bookingId , body)
    sendResponse(res , {
        statusCode: 201 ,
        success:true,
        message:"Booking update successfully" ,
        data: bookings
    })
})
const deleteBooking = catchAsync(async (req:Request , res:Response ) => {
    const bookingId = req.params.bookingId
    const bookings = await bookingService.deleteBooking(bookingId )
    sendResponse(res , {
        statusCode: 201 ,
        success:true,
        message:"Booking deleted successfully" ,
        data: bookings
    })
})


export const bookingController = {
    getBookings,
    updateBookings,
    deleteBooking
}