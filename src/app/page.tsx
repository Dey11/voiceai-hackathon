import Image from "next/image";

import { H1 } from "@/components/typography/h1";
import { H4 } from "@/components/typography/h4";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="relative h-[87.9dvh] w-full overflow-hidden px-5">
      <section className="flex h-[70dvh] w-full flex-col items-center justify-center gap-y-5 text-center">
        <div className="w-fit">
          <H1 className="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white">
            Let Our Agent Call You!
          </H1>
        </div>

        <H4 className="font-normal">
          Get personalized assistance with just one click!
        </H4>

        <div className="flex gap-x-2">
          <Input
            className="w-44 rounded-xl rounded-r-none border-2 border-dotted border-brand-foreground bg-[#232323] text-center placeholder:text-center"
            placeholder="Enter your number"
            type="number"
          />
          <Button className="rounded-xl rounded-l-none rounded-br-none bg-brand-foreground text-[#4B4B4B] hover:bg-brand-muted">
            Call me
          </Button>
        </div>
      </section>
      <Image
        src={"/mesh-gradient.png"}
        alt="logo"
        fill
        priority
        className="absolute -z-10 object-contain object-bottom px-[10dvw]"
      />
    </div>
  );
}
