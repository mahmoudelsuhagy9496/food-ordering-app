"use client";
import {  Routes, UserRole } from "@/constants/enums";
import Link from "../link";
import { Button } from "../ui/button";
import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

import AuthButtons from "./auth-buttons";
import LanguageSwitcher from "./language-switcher";
import UseClientSession from "@/hooks/UseClientSession";
import { Session } from "next-auth";
import { Translations } from "@/types/translation";



function NavbarLinks({
  initialSession,
  translation,
}: {
  translation: Translations;
  initialSession:Session|null
}) {
  const links = [
    { id: 1, title: translation.navbar.menu, href: Routes.MENU },
    { id: 2, title: translation.navbar.about, href: Routes.ABOUT },
    { id: 3, title: translation.navbar.contact, href: Routes.CONTACT },
  ];
  const { locale } = useParams();
  const pathname = usePathname();
    const session = UseClientSession({initialSession});

  const isAdmin = session.data?.user.role===UserRole.ADMIN

  const [openMnue, setOpenMenu] = useState(false);
  return (
    <nav className=" order-last lg:order-none">
      {!openMnue ? (
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => setOpenMenu(true)}
          className="lg:hidden"
        >
          <Menu className="!h-6 !w-6" />
        </Button>
      ) : (
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => setOpenMenu(false)}
          className=" absolute top-10 right-10 z-60  lg:hidden"
        >
          <XIcon className="!h-6 !w-6" />
        </Button>
      )}
      <ul
        className={`fixed lg:static 
        ${openMnue ? "left-0 z-50" : "-left-full"}
        top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${locale}/${link.href}`}
              className={`
               "hover:text-primary duration-200 transition-colors font-semibold   "
                ${
                  pathname.startsWith(`/${locale}/${link.href}`)
                    ? `text-primary`
                    : `text-accent`
                }
                 `}
            >
              {link.title}
            </Link>
          </li>
          ))}
           {session.data?.user && (
          <li>
            <Link
              href={
                isAdmin
                  ? `/${locale}/${Routes.ADMIN}`
                  : `/${locale}/${Routes.PROFILE}`
              }
              onClick={() => setOpenMenu(false)}
              className={`${
                pathname.startsWith(
                  isAdmin
                    ? `/${locale}/${Routes.ADMIN}`
                    : `/${locale}/${Routes.PROFILE}`
                )
                  ? "text-primary"
                  : "text-accent"
              } hover:text-primary duration-200 transition-colors font-semibold`}
            >
              {isAdmin
                ? translation.navbar.admin
                : translation.navbar.profile}
            </Link>
          </li>
        )}
        <li className="lg:hidden flex flex-col gap-4">
          <div onClick={() => setOpenMenu(false)}>
            <AuthButtons
              translation={translation}
              initialSession={initialSession}
            />
          </div>
          <LanguageSwitcher />
        </li>
        
      </ul>
    </nav>
  );
}

export default NavbarLinks;
