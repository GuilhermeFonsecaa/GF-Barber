"use client"

import { Avatar, AvatarImage } from "@/app/_components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";
import { toast } from "sonner";
import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { Smartphone } from "lucide-react";
import { Button } from "@/app/_components/ui/button";

interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopCardInfo = ({ barbershop }: BarbershopInfoProps) => {

    const copyPhoneNumber = (phoneNumber: string) => {
        navigator.clipboard.writeText(phoneNumber);
        toast.success("Número enviado para área de transferência", {
            description: `Número ${phoneNumber} copiado`,
        })
    };

    return (
        <div className="hidden lg:block mt-10 pr-32">
            <Card>
                <CardContent className="flex flex-col w-full">
                    <div className="relative h-[180px] mt-6">
                        <Image src="/barbershop-map.png" fill alt={barbershop.name} />
                        <div className="w-full absolute bottom-4 left-0 px-5">
                            <Card>
                                <CardContent className="p-3 flex gap-3">
                                    <Avatar>
                                        <AvatarImage src={barbershop.imageUrl} />
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <h2 className="font-bold text-sm">{barbershop.name}</h2>
                                        <p className="text-xs overflow-hidden text-nowrap text-ellipsis">{barbershop.address}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="py-5 border-b border-solid secondary">
                        <h4 className="font-bold">SOBRE NÓS</h4>
                        <p className="text-[#838896]">Bem-vindo à {barbershop.name}, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.</p>
                    </div>

                    {barbershop.phoneNumbers && barbershop.phoneNumbers.length > 0 && (
                        <div className="flex flex-col py-5 border-b border-solid secondary gap-3">
                            {barbershop.phoneNumbers.map((phoneNumber: Barbershop) => (
                                <div className="flex justify-between">
                                    <div className="flex items-center justify-center gap-2">
                                        <Smartphone size={24} />
                                        <p key={barbershop.id}>{phoneNumber}</p>
                                    </div>
                                    <div>
                                        <Button className="rounded-xl" variant={"secondary"} onClick={() => copyPhoneNumber(phoneNumber)}>Copiar</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col py-5 border-b border-solid border-secondary gap-3">
                        <div className="flex justify-between">
                            <p className="text-[#838896]">Segunda-Feira</p>
                            <p>09:00 - 21:00</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#838896]">Terça-Feira</p>
                            <p>09:00 - 21:00</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#838896]">Quarta-Feira</p>
                            <p>09:00 - 21:00</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#838896]">Quinta-Feira</p>
                            <p>09:00 - 21:00</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#838896]">Sexta-Feira</p>
                            <p>09:00 - 21:00</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#838896]">Sábado</p>
                            <p>09:00 - 21:00</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[#838896]">Domingo</p>
                            <p>Fechado</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between py-5">
                    <p>Em parceria com</p>
                    <Image src={"/logo.png"} width={130} height={22} alt="FSW BARBER" />
                </CardFooter>
            </Card>
        </div>
    );
}

export default BarbershopCardInfo;