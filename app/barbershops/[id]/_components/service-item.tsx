"use client"

import { Barbershop, Service } from "@prisma/client";
import Image from "next/image";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/app/_components/ui/sheet";
import { Calendar } from "@/app/_components/ui/calendar";
import { signIn } from "next-auth/react";
import { useState, useMemo } from "react";
import { ptBR } from "date-fns/locale";
import { generateDayTimeList } from "../_helpers/hours";
import { format } from "date-fns/format";


interface ServiceItemProps {
    service: Service,
    isAuthenticated: boolean,
    barbershop: Barbershop
}


const ServiceItem = ({ barbershop, service, isAuthenticated }: ServiceItemProps) => {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [hour, setHour] = useState<string | undefined>()

    const handleBookingClick = () => {
        if (!isAuthenticated) {
            return signIn("google");
        }
    }

    const handleDateClick = (date: Date | undefined) => {
        setDate(date)
        setHour(undefined)
    }

    const handleHourClick = (time: string) => {
        setHour(time)
    }

    const timeList = useMemo(() => {
        return date ? generateDayTimeList(date) : []
    }, [date]) //só vai executar quando date ser alterado

    console.log({ timeList })

    return (
        <Card>
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

                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button onClick={handleBookingClick} variant="secondary">Reservar</Button>
                                </SheetTrigger>
                                <SheetContent className="p-0">
                                    <SheetHeader className="text-left px-5 py-6 border-b border-solid border-secondary">
                                        <SheetTitle>Fazer Reserva</SheetTitle>
                                    </SheetHeader>
                                    <div className="py-6">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={handleDateClick}
                                            locale={ptBR}
                                            fromDate={new Date()}
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
                                        <div className=" flex overflow-x-auto py-6 px-5 border-y border-solid border-secondary [&::-webkit-scrollbar]:hidden gap-3">
                                            {timeList.map((time) => (
                                                <Button onClick={() => handleHourClick(time)} variant={
                                                    hour === time ? "default" : "outline"
                                                } className="rounded-full" key={time}>{time}</Button>
                                            ))}
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

                                    <SheetFooter className="px-5">
                                        <Button disabled={!hour || !date} className="default rounded-lg">Confirmar</Button>
                                    </SheetFooter>

                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

export default ServiceItem;