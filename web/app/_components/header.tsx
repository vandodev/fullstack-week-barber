"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "./ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { Avatar } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";


const Header = () => {
  const {data} = useSession()

  const handleLogoutClick = () => signOut();

    return(
        <Card>
        <CardContent className="p-5 justify-between items-center flex flex-row">
          <Link href="/">
            <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
          </Link>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <MenuIcon size={16} />
              </Button>
            </SheetTrigger>

            <SheetContent className="p-0">
              <SheetHeader className="text-left border-b border-solid border-secondary p-5">
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              {/* {status === 'authenticated' && ( */}
              {data?.user ?(

                <div className="flex justify-between px-5 py-6 items-center">
                  <div className="flex items center gap-3 ">
                    <Avatar>
                      <AvatarImage 
                        src={data.user?.image ?? ""}
                      />
                    </Avatar>
                    <h2 className="font-bold">{data.user.name}</h2>
                  </div>

                  <Button variant="secondary" size="icon">
                    <LogOutIcon onClick={handleLogoutClick} />
                  </Button>

                </div>

              ):(
                <></>
              )}

            </SheetContent>
          </Sheet>
      
       
        </CardContent>
      </Card>
    )
}
export default Header;