import Image from "next/image";
import Header from "../_components/header";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Search from "./_components/search";
import BookingItem from "../_components/booking-item";
import { db } from "../_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { getServerSession } from "next-auth";
import { authOptions } from "../_lib/auth";

export default async function Home() {
    const session = await getServerSession(authOptions);
    const barbershops = await db.barbershop.findMany({});

    const bookings = session?.user ? await db.booking.findMany({
        where: {
            userId: (session.user as any).id,
        },
        include: {
            service: true,
            barbershop: true,
        }
    }):[]

  return (
    <div>
        <Header />

        <div className="px-5 pt-5">
            <h2 className="text-xl font-bold">Olá Evandro</h2>
            <p className="capitalize text-sm">
                {format(new Date(), "EEEE',' dd 'de' MMMM", {
                    locale: ptBR,
                })}
            </p>
        </div>

        <div className="px-5 mt-6">
            <Search />
        </div>

        <div className="mt-6 ">
            <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
            <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {bookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                ))}
            </div>          
        </div>

        <div className="mt-6">
            <h2 className=" px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>
            <div className="flex px-5 gap-2 overflow-x-auto  [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) =>(
                   <BarbershopItem  key={barbershop.id} barbershop={barbershop}/>
                    ))
                }
            </div>
        </div>

        <div className="mt-6 mb-[4,75rem]">
            <h2 className=" px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>
            <div className="flex px-5 gap-2 overflow-x-auto  [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) =>(
                   <BarbershopItem  key={barbershop.id} barbershop={barbershop}/>
                    ))
                }
            </div>
        </div>
        
    </div>
  );
}
