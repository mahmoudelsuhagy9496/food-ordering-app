"use client";

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { Translations } from "@/types/translation";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Pages, Routes } from "@/constants/enums";
import UseClientSession from "@/hooks/UseClientSession";
import { Session } from "next-auth";

function Authbuttons({initialSession,translation}:{initialSession:Session|null,translation:Translations}) {
  const session = UseClientSession({initialSession});
  const pathname=usePathname()
  const {locale} =useParams()
  const router=useRouter();
  return (
    <div>
      {session.data?.user && (
        <div>
          <Button size="lg" className=" !rounded-full !px-8" onClick={()=>signOut()}>
            {translation.navbar.signOut}
          </Button>
        </div>
      )}{" "}
      {!session.data?.user && (
        <div className="flex items-center gap-6">
          <Button
            className={`${
              pathname.startsWith(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
                ? "text-primary"
                : "text-accent"
            } hover:text-primary duration-200 transition-colors font-semibold hover:no-underline !px-0`}
            size="lg"
            variant="link"
            onClick={() =>
              router.push(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`)
            }
          >
            {translation.navbar.login}
          </Button>
          <Button
            className="!px-8 !rounded-full"
            size="lg"
            onClick={() =>
              router.push(`/${locale}/${Routes.AUTH}/${Pages.Register}`)
            }
          >
            {translation.navbar.register}
          </Button>
        </div>
      )}
    </div>
  );
}

export default Authbuttons;
