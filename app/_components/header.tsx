"use client"

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet";
import SideMenu from "./side-menu";
import Link from "next/link";

const Header = () => {

    return (
        <header>
            <Card>
                <CardContent className="p-5 justify-between items-center flex flex-row">
                    <Link href={"/"}>
                        <Image src="/logo.png" alt="FSW Barber" height={22} width={130} />
                    </Link>
                    <Sheet>
                        <SheetTrigger>
                            <Button variant="outline" size="icon" className="h-8 w-8">
                                <MenuIcon size={16} />
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="p-0">
                            <SideMenu />
                        </SheetContent>
                    </Sheet>
                </CardContent>
            </Card>
        </header>
    );
}

export default Header;