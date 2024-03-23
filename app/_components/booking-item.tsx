import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Booking, Prisma } from "@prisma/client";
import { format, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
        include: {
            service: true,
            barbershop: true,
        },
    }>
}

const BookingItem = ({ booking }: BookingItemProps) => {
    const isBookingConfirmed = isFuture(booking.date)
    return (
        <Card className="min-w-80">
            <CardContent className="px-0 py-0 flex">
                <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                    <Badge variant={isBookingConfirmed ? "default" : "secondary"} className={`w-fit`}>
                        {isPast(booking.date) ? "Finalizado" : "Confirmado"}
                    </Badge>
                    <h2 className="font-bold">{booking.service.name}</h2>
                    <div className="flex items-center gap-2">
                        <Avatar className="h=6 w-6">
                            <AvatarImage src={booking.barbershop.imageUrl} alt="@shadcn" />
                        </Avatar>
                        <h3 className="text-sm">{booking.barbershop.name}</h3>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center flex-1 border-l border-solid border-secondary px-3">
                    <p className="text-sm capitalize">{format(booking.date, "MMMM", {
                        locale: ptBR
                    })}</p>
                    <p className="text-2xl">{format(booking.date, "dd")}</p>
                    <p className="text-sm">{format(booking.date, "hh:mm")}</p>
                </div>
            </CardContent>
        </Card>


    );
}

export default BookingItem;