import { format } from "date-fns"
import Header from "../_components/header";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import BarbershopItem from "./_components/barbershop-item";
import { Barbershop, Booking } from "@prisma/client";
import { db } from "../_lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel"


interface BarbershopItemProps {
  barbershop: Barbershop;
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  const [barbershops, popularBarbershops, mostVisitedBarbershop, confirmedBookings] = await Promise.all([
    db.barbershop.findMany({}),
    db.barbershop.findMany({
      orderBy: {
        address: "asc"
      }
    }),
    db.barbershop.findMany({
      orderBy: {
        address: "desc"
      }
    }),
    session?.user ? db.booking.findMany({
      where: {
        userId: (session.user as any).id,
        date: {
          gte: new Date()
        }
      },
      include: {
        service: true,
        barbershop: true,
      },
    })
      : []
  ])


  return (
    <div className="lg:flex-col">
      <Header searchVisible={false} />
      <div className="lg:flex lg:px-32 lg:py-14 relative">
        <div className="absolute inset-0 hidden lg:block" style={{ backgroundImage: "url('/imagem-capa.jfif')", backgroundSize: "cover", filter: "grayscale(100%)", scale: "crop", opacity: "20%" }}></div>

        <div className="lg:flex-col lg:z-10 lg:relative lg:block">
          <div className="px-5 pt-5 lg:px-0 lg:w-[439px]">
            <h2 className="text-xl font-bold lg:font-normal lg:2xl">{session?.user ? `Olá, ${session?.user?.name?.split(" ")[0]}!` : "Olá! Faça login para agendar um horário!"}</h2>
            <p className="capitalize text-sm lg:py-2">
              {format(new Date(), "EEEE', 'dd 'de' MMMM", {
                locale: ptBR
              })}
            </p>
          </div>

          <div className="px-5 mt-6 lg:px-0">
            <Search />
          </div>


          <div className="px-3 mt-6 lg:px-0 lg:hidden">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
                <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden gap-3">
                  {confirmedBookings.map((booking: Booking) => (
                    <BookingItem position="right" key={booking.id} booking={booking} />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="mt-6 hidden lg:block px-0 relative">
            {confirmedBookings.length > 0 && (
              <>
                <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Agendamentos</h2>
                <div className="flex [&::-webkit-scrollbar]:hidden gap-3  w-[500px]">
                  <Carousel>
                    <CarouselContent className="flex w-[510px]">
                      {confirmedBookings.map((booking: Booking) => (
                        <CarouselItem key={booking.id} className="">
                          <BookingItem position="right" key={booking.id} booking={booking} />
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="px-5 mt-6 mx-28 hidden lg:block">
          <h2 className="text-sm uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

          <div className="w-[1060px]">
            <Carousel>
              <CarouselContent className="flex ">
                {barbershops.map((barbershop: Booking) => (
                  <CarouselItem key={barbershop.id} className="basis-1/4">
                    <BarbershopItem barbershop={barbershop} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 lg:hidden">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Recomendados</h2>

        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: Booking) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6 mb-[4rem] lg:hidden">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>

        <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop: Booking) => (
            <div key={barbershop.id} className="min-w-[167px] max-w-[167px]">
              <BarbershopItem barbershop={barbershop} />
            </div>
          ))}
        </div>
      </div>


      <div className="hidden mt-5 px-32 lg:block pb-10">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Populares</h2>

        <div className="w-[1670px]">
          <Carousel>
            <CarouselContent>
              {popularBarbershops.map((barbershop: Booking) => (
                <CarouselItem key={barbershop.id} className="basis-1/6">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext className="mr-2" />
          </Carousel>
        </div>
      </div>

      <div className="hidden px-32 lg:block pb-10">
        <h2 className="text-xs uppercase text-gray-400 font-bold mb-3">Mais visitados</h2>

        <div className="w-[1670px]">
          <Carousel>
            <CarouselContent>
              {mostVisitedBarbershop.map((barbershop: Booking) => (
                <CarouselItem key={barbershop.id} className="basis-1/6">
                  <BarbershopItem barbershop={barbershop} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext className="mr-2" />
          </Carousel>
        </div>
      </div>

    </div>
  );
}
