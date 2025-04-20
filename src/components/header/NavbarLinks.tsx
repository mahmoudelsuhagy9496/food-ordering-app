import { Pages, Routes } from "@/constants/enums";
import Link from "../link";
import {  buttonVariants } from "../ui/button";

function NavbarLinks() {
  const links = [
    { id: 1, title: "Menu", href: Routes.MENU },
    { id: 2, title: "About", href: Routes.ABOUT },
    { id: 3, title: "Contact", href: Routes.CONTACT },
    { id: 4, title: "login", href: `${Routes.AUTH}/${Pages.LOGIN}` },
  ];
  return (
    <nav className=" flex flex-1 justify-end">
      <ul className="fixed lg:static top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10">
        {links.map((link) => (
          <li key={link.id}>
            <Link
              href={`/${link.href}`}
              className={`
                ${link.href===`${Routes.AUTH}/${Pages.LOGIN}`
                    ?`${buttonVariants({size:"lg"})} !px-8 !rounded-full`
                    :"hover:text-primary duration-200 transition-colors   text-accent"
                } font-semibold
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
