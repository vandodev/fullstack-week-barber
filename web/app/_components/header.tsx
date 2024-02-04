"use client";

import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const handleLoginClick = async () =>{
  await signIn();
}

const Header = () => {
  const {data} = useSession();
    return(
        <Card>
        <CardContent className="p-5 justify-between items-center flex flex-row">
          <Link href="/">
            <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
          </Link>

          {/* <Button variant="outline" size="icon">
            <MenuIcon size={16} />
          </Button> */}

          {data?.user ? (
            <div>
               <h1>{data.user.name}</h1> 
               <Button onClick={() => signOut()}>Sair</Button>
            </div>
           
            ): (<Button onClick={handleLoginClick}>Login</Button>)
          }          
       
        </CardContent>
      </Card>
    )
}
export default Header;