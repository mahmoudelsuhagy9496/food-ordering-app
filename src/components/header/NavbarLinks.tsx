"use client";
import { Pages, Routes } from "@/constants/enums";
import Link from "../link";
import { Button, buttonVariants } from "../ui/button";
import { useState } from "react";
import { Menu, XIcon } from "lucide-react";
import { useParams, usePathname } from "next/navigation";

function NavbarLinks({translation}:{translation:{[key:string]:string}}) {
  const links = [
    { id: 1, title: translation.menu, href: Routes.MENU },
    { id: 2, title: translation.about, href: Routes.ABOUT },
    { id: 3, title: translation.contact, href: Routes.CONTACT },
    { id: 4, title: translation.login, href: `${Routes.AUTH}/${Pages.LOGIN}` },
  ];
  const {locale}=useParams()
  const pathname=usePathname()
  
  const [openMnue, setOpenMnue] = useState(false);
  return (
    <nav className=" flex flex-1 justify-end">
      {!openMnue ? (
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => setOpenMnue(true)}
          className="lg:hidden"
        >
          <Menu className="!h-6 !w-6" />
        </Button>
      ) : (
        <Button
          variant={"secondary"}
          size={"sm"}
          onClick={() => setOpenMnue(false)}
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
                ${
                  link.href === `${Routes.AUTH}/${Pages.LOGIN}`
                    ? `${buttonVariants({ size: "lg" })} !px-8 !rounded-full`
                    : "hover:text-primary duration-200 transition-colors   "
                } font-semibold ${pathname.startsWith(`/${locale}/${link.href}`)?`text-primary`:`text-accent`}
                 `}
            >
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavbarLinks;
