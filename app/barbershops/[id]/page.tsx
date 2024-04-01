import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import Header from "@/app/_components/header";
import BarbershopCardInfo from "./_components/barbershopCardInfo";

interface BarbershopDetailsPage {
    params: {
        id?: string
    }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPage) => {

    const session = await getServerSession(authOptions);

    if (!params.id) {
        //to do direcionar para homepage
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true
        }
    });

    if (!barbershop) {
        return null;
    }

    return (
        <div>
            <div className="hidden lg:block">
                <Header />
            </div>
            <div className="lg:flex gap-10">
                <div className="lg:flex-col">
                    <BarbershopInfo barbershop={barbershop} />
                    <h2 className="lg:pl-32 lg:pt-3 hidden lg:block text-[#838896]">SERVIÇOS</h2>

                    {/*Celular*/}
                    <div className="px-5 flex flex-col gap-4 pb-6 pt-10 lg:hidden">
                        {barbershop.services.map((service: any) => <ServiceItem barbershop={barbershop} key={service.id} service={service} isAuthenticated={!!session?.user} />)}
                    </div>

                    {/*Computador*/}
                    <div className="hidden lg:block">
                        <div className="w-full pl-32 grid grid-cols-3 gap-4 pt-3 pb-6">
                            {barbershop.services.map((service: any) => <ServiceItem barbershop={barbershop} key={service.id} service={service} isAuthenticated={!!session?.user} />)}
                        </div>
                    </div>
                </div>
                <BarbershopCardInfo barbershop={barbershop} />
            </div>
        </div>

    );
}

export default BarbershopDetailsPage;