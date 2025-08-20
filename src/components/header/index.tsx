import { Routes } from "@/constants/enums";
import Link from "../link";
import NavbarLinks from "./NavbarLinks";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";

export default async function Header() {
      const locale = await getCurrentLocale();
      const { logo, navbar } = await getTrans(locale);
  return (
   <header className="py-4 md:py-6">
    <div className="container flex items-center justify-between gap-6 lg:gap-10"> 
        <Link href={`/${locale}/${Routes.ROOT}`} className="text-primary font-semibold text-2xl"> 🍕 {logo}</Link>
        <NavbarLinks  translation={navbar}/>
        <LanguageSwitcher />
        <CartButton />
    </div>
   </header>
  )
}
