"use client";

import { ChevronLeftIcon, MapIcon, MapPinIcon, MenuIcon, StarIcon, icons } from "lucide-react";
import Image from "next/image";
import { Barbershop } from "@prisma/client";
import { Button } from "@/app/_components/ui/button";

import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
    barbershop: Barbershop;
  }
  

const BarbershopInfo = ({ barbershop }: BarbershopInfoProps) => {
    const router = useRouter();
    const handleBackClick = () => {
        router.replace("/");
      };
    
    return(
        
        <div>
          <div className="h-[259px] w-full relative">

            <Button  onClick={handleBackClick} size="icon" variant="outline" className="z-50 top-4 left-4 absolute">
              <ChevronLeftIcon />
            </Button>

            <Button size="icon" variant="outline" className="z-50 top-4 right-4 absolute">
              <MenuIcon />
            </Button>

            <Image 
              src={barbershop.imageUrl} 
              fill alt={barbershop.name}
              style={{objectFit:"cover"}}
              className="opacity-75"
            />
          </div>

          <div className="px-5 py-2 pb-6 border-b border-solid border-secondary">
            <h1 className="text-xl font-bold ">{barbershop.name}</h1>

            <div className="flex items-center gap-1 mt-2">
              <MapPinIcon className="text-primary" size={18} />
              <p className="text-sm">{barbershop.address}</p>
            </div>

            <div className="flex items-center gap-1 mt-2">
              <StarIcon className="text-primary" size={18} />
              <p className="text-sm">5.8 (899 avaliações)</p>
            </div>

          </div>
        </div>
    )
}

export default BarbershopInfo;