import { buttonVariants } from "@/components/ui/button";
import { Languages, Routes } from "@/constants/enums";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Hero() {
  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { hero } = home;
  return (
    <section className=" section-gap">
      <div className=" container grid grid-cols-1 md:grid-cols-2">
        <div className="md:py-12">
          <h1 className=" font-semibold text-4xl">{hero.title}</h1>
          <p className="text-accent my-4">{hero.description}</p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${Routes.MENU}`}
              className={`${buttonVariants({
                size: "lg",
              })} !px-4 space-x-2 !rounded-full uppercase`}
            >
              {hero.orderNow}{" "}
              <ArrowRightCircle
                className={`w-5 !h-5 ${
                  locale === Languages.ARABIC ? `rotate-180` : ``
                }`}
              />
            </Link>
            <Link
              href={`/${Routes.ABOUT}`}
              className={` px-4 space-x-2  flex gap-3 rounded-full  bg-transparent text-black hover:text-primary font-semibold`}
            >
              {hero.learnMore}
              <ArrowRightCircle
                className={`w-5 !h-5 ${
                  locale === Languages.ARABIC ? `rotate-180` : ``
                }`}
              />
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
