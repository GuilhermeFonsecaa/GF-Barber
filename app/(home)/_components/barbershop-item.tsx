'use client'

import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";
import { Badge } from "@/app/_components/ui/badge";
import Image from "next/image";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";



const BarbershopItem = ({ barbershop }: Barbershop) => {
    const router = useRouter();
    const handleBookingClick = () => {
        router.push(`/barbershops/${barbershop.id}`);
    }

    return (
        <Card className="w-full max-w-full rounded-2xl lg:w-0">
            <Card className="lg:w-[250px] lg:h-[318px]">
                <CardContent className="px-1 py-0 pt-1 ">
                    <div className="relative w-full h-[159px] lg:h-[190px]">
                        <div className="absolute top-2 left-2 z-50">
                            <Badge variant={"secondary"} className="opacity-90 flex gap-1 items-center">
                                <StarIcon size={12} className="fill-primary text-primary" />
                                <span>5.0</span>
                            </Badge>
                        </div>
                        <Image src={barbershop.imageUrl} alt={barbershop.name} width={0} height={0} sizes="100vw" fill objectFit="cover" className="h-[159px] w-full rounded-2xl" />
                    </div>
                    <div className="px-2 pb-3">
                        <h2 className="font-bold mt-2 overflow-hidden text-ellipsis text-nowrap lg:mt-3">{barbershop.name}</h2>
                        <p className="text-gray-400 text-sm overflow-hidden text-ellipsis text-nowrap">{barbershop.address}</p>
                        <Button className="w-full mt-3" variant="secondary" onClick={handleBookingClick}>Reservar</Button>
                    </div>
                </CardContent>
            </Card>
        </Card>
    );
}

export default BarbershopItem;