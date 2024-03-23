import { getServerSession } from "next-auth";
import Header from "../_components/header";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";
import { Booking } from "@prisma/client";
import { isFuture, isPast } from "date-fns";

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
            <Header />
            <div className="px-5 py-6 ">
                <h1 className="text-xl font-bold">Agendamentos</h1>
                <h2 className="text-gray-400 font-bold text-sm uppercase mt-6 mb-3">Confirmados</h2>
                <div className="flex flex-col gap-3">
                    {confirmedBookings.map((booking: Booking) => {
                        return <BookingItem booking={booking} key={booking.id} />
                    })}
                </div>
                <h2 className="text-gray-400 font-bold text-sm uppercase mt-6 mb-3">Finalizados</h2>
                <div className="flex flex-col gap-3">
                    {finishedBookings.map((booking: Booking) => {
                        return <BookingItem booking={booking} key={booking.id} />
                    })}
                </div>
            </div>
        </>);
}

export default BookingsPage;