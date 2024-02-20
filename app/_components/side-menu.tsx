"use client"

import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon, UserIcon } from "lucide-react";
import { SheetHeader, SheetTitle } from "./ui/sheet";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const SideMenu = () => {
    const { data } = useSession()
    const handleLoginClick = () => signIn("google")
    const handleLogoutClick = () => signOut()

    return (
        <>
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
        </>
    );
}

export default SideMenu;
