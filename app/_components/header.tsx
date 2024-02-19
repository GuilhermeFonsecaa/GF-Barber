"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, MenuIcon, UserIcon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
    const { data, status } = useSession()
    const handleLoginClick = () => signIn()
    const handleLogoutClick = () => signOut()


    return (
        <Card>
            <CardContent className="p-5 justify-between items-center flex flex-row">
                <Image src="/logo.png" alt="FSW Barber" height={22} width={130} />
                <Sheet>
                    <SheetTrigger>
                        <Button variant="outline" size="icon" className="h-8 w-8">
                            <MenuIcon size={16} />
                        </Button>
                    </SheetTrigger>
                    <SheetContent className="p-0">
                        <SheetHeader className="text-left p-5 border-b border-solid border-secondary">
                            <SheetTitle>Menu</SheetTitle>
                        </SheetHeader>

                        {data?.user ? (
                            <div className="flex justify-between px-5 py-6 items-center">
                                <div className="flex items-center gap-3 ">
                                    <Avatar>
                                        <AvatarImage src={data.user?.image ?? ""} alt="UserImage"></AvatarImage>
                                    </Avatar>
                                    <h2 className="font-bold">{data.user.name}</h2>
                                </div>
                                <Button size="icon" variant="secondary">
                                    <LogOutIcon onClick={handleLogoutClick} />
                                </Button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-3 px-5 py-6">
                                <div className="flex items-center gap-2">
                                    <UserIcon size={32} />
                                    <h2>Olá, faça seu login!</h2>
                                </div>
                                <Button className="w-full justify-start" variant="secondary" onClick={handleLoginClick}>
                                    <LogInIcon className="mr-2" size={18} />
                                    Fazer Login
                                </Button>
                            </div>
                        )}

                        <div className="flex flex-col gap-3 px-5">
                            <Button className="justify-start" variant="outline" asChild> 
                                <Link href="/">
                                    <HomeIcon size={18} className="mr-2" />
                                    Início
                                </Link>
                            </Button>

                            {data?.user && (
                                <Button className="justify-start" variant="outline" asChild>
                                    <Link href="/bookings">
                                        <CalendarIcon size={18} className="mr-2" />
                                        Agendamentos
                                    </Link>
                                </Button>

                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </CardContent>
        </Card>

    );
}

export default Header;