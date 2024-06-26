"use client"

import { Barbershop, Booking, Service } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { ScrollArea, ScrollBar } from "@/app/_components/ui/scroll-area";
import { toast } from "sonner";
import { signIn, useSession } from "next-auth/react";
import { useState, useMemo, useEffect } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns/format";
import { saveBooking } from "../_actions/save-bookings";
import { addDays, getDay, isSunday, setHours, setMinutes } from "date-fns";
import { Check, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDayBookings } from "../_actions/get-day-bookings";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/app/_components/ui/dialog";

interface ServiceItemProps {
    service: Service,
    isAuthenticated: boolean,
    barbershop: Barbershop
}

const ServiceItem = ({ barbershop, service, isAuthenticated }: ServiceItemProps) => {
    const router = useRouter()
    const { data } = useSession()
    const [sheetIsOpen, setSheetIsOpen] = useState(false)
    const [submitIsLoading, setSubmitIsLoading] = useState(false)
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hour, setHour] = useState<string | undefined>()
    const [dayBookings, setDayBookings] = useState<Booking[]>([])
    const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!date) {
            return
        }
        const refreshAvailableHours = async () => {
            const _dayBookings = await getDayBookings(barbershop.id, date)
            setDayBookings(_dayBookings)
        }
        refreshAvailableHours()
    }, [date, barbershop.id])

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }
    }

    const isDisabledSunday = (date: Date) => {
        return isSunday(date);
    }

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        if (date && isSunday(date)) { // Verifica se o dia selecionado é um domingo
            toast("A barbearia está fechada aos domingos.",);
            return;
        }
        setHour(undefined)
    }

    const handleHourClick = (time: string) => {
        setHour(time)
    }

    const handleBookingSubmit = async (showToast: boolean, showDialog: boolean) => {
        setSubmitIsLoading(true)
        try {
            if (!hour || !date || !data?.user) {
                return
            }
            const dateHour = Number(hour.split(":")[0])
            const dateMinutes = Number(hour.split(":")[1])

            const newDate = setMinutes(setHours(date, dateHour), dateMinutes)

            await saveBooking({
                serviceId: service.id,
                barbershopId: barbershop.id,
                date: newDate,
                userId: (data.user as any).id
            })
            setSheetIsOpen(false)
            setHour(undefined)
            setDate(undefined)
            if (showToast) {
                toast("Reserva realizada com sucesso", {
                    description: format(new Date, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
                        locale: ptBR
                    }),
                    action: {
                        label: "Visualizar",
                        onClick: () => router.push('/bookings')
                    },
                })
            }
            if (showDialog) {
                setDialogIsOpen(true);
            }
        }
        catch (error) {
            console.log(error)
        }
        finally {
            setSubmitIsLoading(false)
        }
    }

    const timeList = useMemo(() => {
        if (!date) {
            return []
        }
        return generateDayTimeList(date).filter(time => { //gerando lista dos horários dos dias
            //time formato: 09:00
            //se houver alguma reserva em "dayBookings" com a hora e minutos igual a time, não incluir
            const hour = Number(time.split(":")[0])
            const timeMinutes = Number(time.split(":")[1])

            const booking = dayBookings.find(booking => {
                const bookingHour = booking.date.getHours()
                const bookingMinutes = booking.date.getMinutes() //pegando hora e minutos de cada reserva
                return bookingHour === hour && bookingMinutes === timeMinutes //hora e minutos das reservas que são iguais aos horários pré-selecionados
            })
            if (!booking) {
                return true //se não houver a reserva retorna true, o horário estará aparecendo
            }
            return false
        })
    }, [date, dayBookings]) //só vai executar quando date ser alterado

    console.log({ timeList })

    return (
        <Card className="lg:w-[385px]">
            <CardContent className="p-3">
                <div className="flex gap-4 items-center">
                    <div className="relative min-h-[110px] min-w-[110px] max-h-[110px] max-w-[110px]">
                        <Image className="rounded-lg" fill style={{ objectFit: "contain" }} src={service.imageUrl} alt={service.imageUrl} />
                    </div>

                    <div className="flex flex-col w-full">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm text-gray-400">{service.description}</p>

                        <div className="flex items-center justify-between mt-3">
                            <p className="text-primary text-sm font-bold"> {Intl.NumberFormat(
                                "pt-br",
                                {
                                    style: "currency",
                                    currency: "BRL",
                                }
                            ).format(Number(service.price))}</p>

                            <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                                <SheetTrigger asChild>
                                    <Button onClick={handleBookingClick} variant="secondary">Reservar</Button>
                                </SheetTrigger>
                                <SheetContent className="p-0 overflow-y-scroll lg:overflow-hidden lg:w-full">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>
                                    <div className="py-6 lg:w-full">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            locale={ptBR}
                                            className="lg:w-full"
                                            fromDate={addDays(new Date(), 1)}
                                            disabled={isDisabledSunday}
                                            styles={{
                                                head_cell: {
                                                    width: "100%",
                                                    textTransform: "capitalize"
                                                },
                                                cell: {
                                                    width: "100%"
                                                },
                                                button: {
                                                    width: "100%"
                                                },
                                                nav_button_previous: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                nav_button_next: {
                                                    width: "32px",
                                                    height: "32px"
                                                },
                                                caption: {
                                                    textTransform: "capitalize"
                                                }
                                            }}
                                        />
                                    </div>

                                    {date && (
                                        <div>
                                            <div className="flex overflow-x-auto py-6 px-5 border-y border-solid border-secondary [&::-webkit-scrollbar]:hidden gap-3 lg:hidden">
                                                {timeList.map((time) => (
                                                    <Button onClick={() => handleHourClick(time)} variant={
                                                        hour === time ? "default" : "outline"
                                                    } className="rounded-full" key={time}>{time}</Button>
                                                ))}
                                            </div>

                                            <div className="hidden lg:block">
                                                <div className="flex py-6 px-5 border-y border-solid border-secondary ">
                                                    <ScrollArea className="w-96 whitespace-nowrap rounded-md p-3 hidden lg:block">
                                                        <div className="flex gap-2">
                                                            {timeList.map((time) => (
                                                                <Button onClick={() => handleHourClick(time)} variant={
                                                                    hour === time ? "default" : "outline"
                                                                } className="rounded-full " key={time}>{time}</Button>
                                                            ))}
                                                        </div>
                                                        <ScrollBar orientation="horizontal" />
                                                    </ScrollArea>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="py-6 px-5 border-t border-solid border-secondary">
                                        <Card>
                                            <CardContent className="flex flex-col gap-3 p-3">
                                                <div className="flex justify-between">
                                                    <h2 className="font-bold">{service.name}</h2>
                                                    <h3 className="font-bold text-sm"> {Intl.NumberFormat(
                                                        "pt-br",
                                                        {
                                                            style: "currency",
                                                            currency: "BRL",
                                                        }
                                                    ).format(Number(service.price))}</h3>
                                                </div>
                                                {date && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Data</h3>
                                                        <h4 className="text-sm">{format(date, "dd 'de' MMMM", {
                                                            locale: ptBR
                                                        })}</h4>
                                                    </div>
                                                )}
                                                {hour && (
                                                    <div className="flex justify-between">
                                                        <h3 className="text-sm text-gray-400">Horário</h3>
                                                        <h4 className="text-sm">{hour}</h4>
                                                    </div>
                                                )
                                                }
                                                <div className="flex justify-between">
                                                    <h3 className="text-sm text-gray-400">Barbearia</h3>
                                                    <h4 className="text-sm">{barbershop.name}</h4>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>

                                    <SheetFooter className="px-5 lg:hidden">
                                        <Button onClick={() => handleBookingSubmit(true, false)} disabled={(!hour || !date) || submitIsLoading} className="default rounded-lg">
                                            {submitIsLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                                            Confirmar
                                        </Button>
                                    </SheetFooter>

                                    <SheetFooter className="hidden lg:block px-5">
                                        <Button onClick={() => handleBookingSubmit(false, true)} disabled={(!hour || !date) || submitIsLoading} className="default w-full rounded-lg">
                                            {submitIsLoading && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
                                            Confirmar
                                        </Button>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>

                            {dialogIsOpen &&
                                <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                    <DialogContent className="flex flex-col items-center justify-center w-[300px]">
                                        <div className="flex rounded-full bg-primary w-20 h-20 items-center justify-center relative">
                                            <div className="absolute top-6"><Check size={40}/></div>
                                        </div>
                                        <h2 className="font-bold">Reserva Efetuada!</h2>
                                        <p className="text-sm text-[#838896] text-center">Sua reserva foi agendada com sucesso.</p>
                                        <DialogFooter className="w-full">
                                            <Button className="w-full" onClick={() => setDialogIsOpen(false)}>Confirmar</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>}

                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;