import EditUserForm from "@/components/EditUserForm";
import { Pages, Routes } from "@/constants/enums";
import { UserRole } from "@/generated/prisma";
import { Locale } from "@/i18n.config";
import getTrans from "@/lib/translation";
import { authOption } from "@/server/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const session = await getServerSession(authOption);
  const { locale } = await params;
  const translation = await getTrans(locale);
  // console.log(session?.user);
  if (session && session.user.role !==UserRole.ADMIN) {
    redirect(`/${locale}/${Routes.PROFILE}`);
  }
  if (!session) {
    redirect(`/${locale}/${Routes.AUTH}/${Pages.LOGIN}`);
  }
  return (
    <main>
      <section className=" section-gap">
        <div className=" container">
          <h1 className=" text-primary text-center font-bold text-4xl italic mb-10">
            {translation.admin.tabs.profile}
          </h1>
          <EditUserForm user={session?.user} translation={translation} />
        </div>
      </section>
    </main>
  );
}
