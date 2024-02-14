import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { ptBR } from "date-fns/locale";
import { format, isFuture } from "date-fns";

interface BookingItemProps {
    booking: Prisma.BookingGetPayload<{
      include: {
        service: true;
        barbershop: true;
      };
    }>;
  }

const BookingItem = ({ booking }: BookingItemProps) => {    
    const isBookingConfirmed = isFuture(booking.date);
 return(
    <Card className="min-w-full">
        <CardContent className="p-5 flex py-0">
        <div className="flex flex-col gap-2 py-5 flex-[3] pl-5">
                <Badge variant={isBookingConfirmed ? "default" : "secondary"} className="w-fit">
                    {isBookingConfirmed ? "Confirmado" : "Finalizado"}
                </Badge>
                <h2 className="font-bold">{booking.service.name}</h2>
                <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={booking.barbershop.imageUrl}/>
                        <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <h3 className="text-sm">{booking.barbershop.name}</h3>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center border-l border-solid flex-1 border-secondary">
                <p className="text-sm capitalize">
                    {format(booking.date, "MMMM", {
                        locale: ptBR,
                    })}
                </p>
                <p className="text-2xl">{format(booking.date, "dd")}</p>
                <p className="text-sm">{format(booking.date, "hh:mm")}</p>
            </div>

        </CardContent>
    </Card>

 )
}

export default BookingItem;