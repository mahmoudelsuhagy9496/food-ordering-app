import { buttonVariants } from "@/components/ui/button";
import { Routes } from "@/constants/enums";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className=" section-gap">
      <div className=" container grid grid-cols-1 md:grid-cols-2">
        <div className="md:py-12">
          <h1 className=" font-semibold text-4xl">Slice into Hyppiness</h1>
          <p className="text-accent my-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            dolorem doloremque ipsam alias tempora unde assumenda autem tenetur
            aliquid sit.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${Routes.MENU}`}
              className={`${buttonVariants({
                size: "lg",
              })} !px-4 space-x-2 !rounded-full uppercase`}
            >
              Order Now
              <ArrowRightCircle className="!w-5 !h-5" />
            </Link>
            <Link
              href={`/${Routes.ABOUT}`}
              className={` px-4 space-x-2  flex gap-3 rounded-full  bg-transparent text-black hover:text-primary font-semibold`}
            >
              Learn More
              <ArrowRightCircle className="!w-5 !h-5" />
            </Link>
          </div>
        </div>
        <div className=" relative hidden md:block">
          <Image
            src={`/assets/images/pizza.png`}
            alt="pizza"
            fill
            loading="eager"
            priority
            className=" object-contain"
          />
        </div>
      </div>
    </section>
  );
}
