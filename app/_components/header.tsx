"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon, CalendarDays, CircleUserRound } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { FaGoogle } from "react-icons/fa";
import Search from "../(home)/_components/search";

interface HeaderProps {
    searchVisible: boolean
}

const Header = ({ searchVisible }: HeaderProps) => {
    const { data } = useSession()
    const handleLoginClickGoogle = () => signIn("google")
    const handleLogoutClick = () => signOut()

    return (
        <header>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row lg:px-32 lg:h-20">
                    <div className="hidden lg:block">
                        <Link href={"/"}>
                            <Image src="/logo.png" alt="GF Barber" height={20} width={160} />
                        </Link>
                    </div>

                    <div className="lg:hidden">
                        <Link href={"/"}>
                            <Image src="/logo.png" alt="GF Barber" height={20} width={170} />
                        </Link>
                    </div>

                    {searchVisible && (
                        <div className="lg:block hidden">
                            <div className="flex items-center justify-center">
                                <Search />
                            </div>
                        </div>
                    )}


                    <Sheet>
                        <SheetTrigger className="lg:hidden">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <MenuIcon size={16} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <SideMenu />
                        </SheetContent>
                    </Sheet>
                    {data?.user ?
                        <div className="hidden lg:block items-center">
                            <div className="flex justify-center items-center">
                                <Link href={"/bookings"}>
                                    <Button className="bg-transparent font-bold gap-2">
                                        <CalendarDays />
                                        Agendamentos
                                    </Button>
                                </Link>
                                <AlertDialog>
                                    <AlertDialogTrigger>
                                        <Button className="font-bold bg-transparent gap-2 ">
                                            <Avatar className="w-7 h-7">
                                                <AvatarImage src={data.user.image ?? ""} />
                                            </Avatar>
                                            <p className="text-center">{data.user.name}</p>
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="flex flex-col w-[390px] gap-5">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle className="text-center">Logout</AlertDialogTitle>
                                            <AlertDialogDescription className="text-center">
                                                Deseja sair da plataforma?
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter className="gap-2">
                                            <AlertDialogCancel className="w-28">Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="w-28" onClick={handleLogoutClick}>Sair</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>

                            </div>
                        </div>
                        :
                        <div className="gap-3 hidden lg:block">

                            <AlertDialog>
                                <AlertDialogTrigger>
                                    <Button className="font-bold gap-2">
                                        <CircleUserRound />
                                        Login
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="flex flex-col w-[390px] gap-5">
                                    <AlertDialogHeader>
                                        <AlertDialogTitle className="text-center">Faça login na plataforma</AlertDialogTitle>
                                        <AlertDialogDescription className="text-center">
                                            Conecte-se a plataforma utilizando sua conta do Google
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="gap-2">
                                        <AlertDialogCancel className="w-28">Voltar</AlertDialogCancel>
                                        <AlertDialogAction className="bg-primary gap-2 w-28 hover:bg-orange-600" onClick={handleLoginClickGoogle}><FaGoogle />Google</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    }
                </CardContent>
            </Card>
        </header>
    );
}

export default Header;