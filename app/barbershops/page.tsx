import { Barbershop } from "@prisma/client";
import BarbershopItem from "../(home)/_components/barbershop-item";
import Header from "../_components/header";
import { db } from "../_lib/prisma";
import { redirect } from "next/navigation";
import Search from "../(home)/_components/search";


interface BarbershopPagesProps {
    searchParams: {
        search?: string;
    }
}

const BarbershopPages = async ({ searchParams }: BarbershopPagesProps) => {

    if (!searchParams.search) {
        return redirect("/");
    }

    const barbershops = await db.barbershop.findMany({
        where: {
            name: {
                contains: searchParams.search,
                mode: "insensitive", //sem distinção de letras maiusculas e minusculas
            },
        },
    });
    return (
        <>
            <Header searchVisible={true}/>
            <div className="px-5 py-6 flex flex-col gap-6 lg:hidden">
                <Search defaultValues={{
                    search: searchParams.search
                }} />
                <h1 className="text-gray-400 text-xs font-bold uppercase">Resultados para &quot;{searchParams.search}&quot;</h1>
                <div className="grid grid-cols-2 mt-3 gap-4">
                    {barbershops.map((barbershop: Barbershop) => (
                        <div  key={barbershop.id} className="w-full">
                            <BarbershopItem barbershop={barbershop} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default BarbershopPages;