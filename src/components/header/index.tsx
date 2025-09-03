import Link from "../link";
import NavbarLinks from "./NavbarLinks";
import CartButton from "./CartButton";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import LanguageSwitcher from "./language-switcher";
import Authbuttons from "./auth-buttons";
import { getServerSession } from "next-auth";
import { authOption } from "@/server/auth";

export default async function Header() {
  const locale = await getCurrentLocale();
  const translation = await getTrans(locale);
  const initialSession=await getServerSession(authOption)
  return (
    <header className="py-4 md:py-6">
      <div className="container flex items-center justify-between gap-6 lg:gap-10">
        <Link
          href={`/${locale}`}
          className="text-primary font-semibold text-2xl"
        >
          {" "}
          🍕 {translation.logo}
        </Link>
        <NavbarLinks translation={translation} initialSession={initialSession}/>
        <div className="flex flex-1 justify-end gap-6 items-center">
          <div className="hidden lg:flex lg:items-center lg:gap-6">
            <Authbuttons translation={translation} initialSession={initialSession} />
            <LanguageSwitcher />
          </div>
          <CartButton />
        </div>
      </div>
    </header>
  );
}
