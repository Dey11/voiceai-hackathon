import Image from "next/image";
import React from "react";

import { H1 } from "@/components/typography/h1";
import { Para } from "@/components/typography/para";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex h-[70dvh] w-full flex-col items-center justify-center">
      <Image src={"/logo.svg"} alt="logo" width={70} height={48} />

      <H1>Welcome to VocalAI</H1>
      <Para>Get started by creating your first call campaign</Para>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button
          size={"lg"}
          className="border-2 border-dotted border-brand-foreground bg-brand-muted text-base text-white hover:bg-brand-muted/80"
        >
          Add customers
        </Button>

        <Button
          size={"lg"}
          className="border-2 border-dotted border-brand-muted bg-brand-foreground text-base text-[#232323] hover:bg-brand-foreground/80"
        >
          Add products
        </Button>
      </div>
    </div>
  );
};

export default page;
