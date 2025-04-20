import { Routes } from "@/constants/enums";
import Link from "../link";
import NavbarLinks from "./NavbarLinks";

export default function Header() {
  return (
   <header className="py-4 md:py-6">
    <div className="container flex items-center justify-between gap-6 lg:gap-10"> 
        <Link href={Routes.ROOT} className="text-primary font-semibold text-2xl"> 🍕 Pizza</Link>
        <NavbarLinks />
    </div>
   </header>
  )
}
