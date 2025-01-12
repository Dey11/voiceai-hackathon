"use client";

import Image from "next/image";
import Link from "next/link";

import { SignInButton, SignedIn, SignedOut, useSession } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";

import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Header = () => {
  const user = useSession();

  return (
    <header className="flex px-5 pt-10">
      <div className="mx-auto flex w-full max-w-screen-lg items-center justify-between">
        <Image src={"/logo.svg"} alt="logo" width={70} height={48} />

        <SignedOut>
          <SignInButton>
            <Button className="rounded-xl rounded-br-none border-2 border-brand-foreground bg-transparent text-base">
              <span className="size-1 bg-brand-foreground" /> Sign in
            </Button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger>
              <div className="flex items-center justify-center gap-x-2">
                <Image
                  src={user.session?.user.imageUrl || ""}
                  alt="logo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
                {user.session?.user.firstName}
                <ChevronDown size={16} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="border-0 bg-brand-bg/80 text-brand-foreground">
              {dropdownMenuItems.map((item) => (
                <DropdownMenuItem
                  key={item.name}
                  className="hover:bg-brand-foreground hover:text-brand-bg"
                >
                  <Link href={item.link}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;

const dropdownMenuItems = [
  {
    name: "Onboarding",
    link: "/onboarding",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Customers",
    link: "/customers",
  },
];
