"use client"

import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { ChevronLeftIcon, StarIcon, MapPinIcon, MenuIcon, Smartphone } from "lucide-react";
import { Barbershop } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import SideMenu from "@/app/_components/side-menu";
import { Card, CardContent, CardFooter } from "@/app/_components/ui/card";


interface BarbershopInfoProps {
    barbershop: Barbershop
}

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();
    const handleBackClick = () => {
        router.replace("/")
    }


    return (
        <div>
            <div className="lg:hidden">
                <div className="h-[250px] w-full relative">
                    <Button size="icon" variant="outline" onClick={handleBackClick} className="z-50 top-4 left-4 absolute lg:hidden">
                        <ChevronLeftIcon />
                    </Button>

                    <Sheet>
                        <SheetTrigger>
                            <Button variant="outline" size="icon" className="z-50 right-4 top-4 absolute lg:hidden">
                                <MenuIcon />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <SideMenu />
                        </SheetContent>
                    </Sheet>

                    <Image src={barbershop.imageUrl} alt={barbershop.name} fill style={{ objectFit: "cover" }} className="opacity-75 lg:hidden" />
                </div>

                <div className="py-3 px-5 pb-6 border-b border-solid border-secondary lg:hidden">
                    <h2 className="text-xl font-bold lg:text-3xl">{barbershop.name}</h2>
                    <div className="flex items-center gap-2 mt-2">
                        <MapPinIcon size={18} className="text-primary" />
                        <p className="lg:text-sm">{barbershop.address}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                        <StarIcon size={18} className="fill-primary text-primary" />
                        <p className="">5,0 (889 avaliações)</p>
                    </div>
                </div>
            </div>

            {/* Tamanho LG */}

            <div className="hidden lg:block">
                <div className="flex gap-10">
                    <div className="flex flex-col pl-32">
                        <div className="w-[1190px] mt-10">
                            <div className="w-full relative h-[560px]"> 
                                <Image src={barbershop.imageUrl}  alt={barbershop.name} fill className="rounded-md contrast-100 " />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex mt-3 mb-10 justify-between">
                                    <div className="flex-col items-center mt-2">
                                        <h2 className="text-xl font-bold lg:text-3xl">{barbershop.name}</h2>
                                        <div className="flex gap-2 mt-3">
                                            <MapPinIcon size={18} className="text-primary" />
                                            <p className="lg:text-sm">{barbershop.address}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-2">
                                        <Card>
                                            <CardContent className="flex flex-col items-center py-2.5 px-5 gap-2">
                                                <div className="flex items-center gap-2">
                                                    <StarIcon size={20} className="fill-primary text-primary" />
                                                    <p className="text-xl">5,0</p>
                                                </div>
                                                <div className="flex items-center">
                                                    <p className="text-xs">889 avaliações</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BarbershopInfo;
