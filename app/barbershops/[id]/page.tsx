import { db } from "@/app/_lib/prisma";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";

interface BarbershopDetailsPage {
    params: {
        id?: string
    }
}

const BarbershopDetailsPage = async ({ params }: BarbershopDetailsPage) => {

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
            <BarbershopInfo barbershop={barbershop} />
            <div className="px-5 flex flex-col gap-4 py-6">
                {barbershop.services.map((service: any) => <ServiceItem key={service.id} service={service} />)}
            </div>

        </div>

    );
}

export default BarbershopDetailsPage;