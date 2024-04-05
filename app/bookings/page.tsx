import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "@/app/_lib/auth";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { Barbershop, Booking } from "@prisma/client";
import { useState } from "react";



const BookingsPage = async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
        redirect("/")
    }

    const [confirmedBookings, finishedBookings] = await Promise.all([
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    gte: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true,
            },
        }),
        db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                    lt: new Date()
                }
            },
            include: {
                service: true,
                barbershop: true,
            },
        })

    ])

    //dessa forma gasta memória no servidor é melhor fazer por pesquisa no banco
    /* const confirmedBookings = bookings.filter((booking: Booking) =>
          isFuture(booking.date)
      )
      const finishedBookings = bookings.filter((booking: Booking) =>
          isPast(booking.date)
      )*/

    return (
        <>
            <Header searchVisible={true} />
            <div className="py-6 px-5 lg:px-[130px]">
                <h1 className="text-xl font-bold lg:text-2xl">Agendamentos</h1>
                {confirmedBookings.length > 0 && (
                    <>
                        <h2 className="text-gray-400 font-bold text-sm uppercase mt-6 mb-3">Confirmados</h2>
                        <div className="flex flex-col gap-3 lg:w-[800px]">
                            {confirmedBookings.map((booking: Booking) => {
                                return <BookingItem position="bottom" booking={booking} key={booking.id} />
                            })}
                        </div>
                    </>
                )}

                {finishedBookings.length > 0 && (
                    <>
                        <h2 className="text-gray-400 font-bold text-sm uppercase mt-6 mb-3">Finalizados</h2>
                        <div className="flex flex-col gap-3 lg:w-[800px]">
                            {finishedBookings.map((booking: Booking) => {
                                return <BookingItem position="bottom" booking={booking} key={booking.id} />
                            })}
                        </div>
                    </>
                )}
            </div>


        </>

    )
}

export default BookingsPage;