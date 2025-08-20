import MainHeading from "@/components/main-heading";
import Menu from "@/components/menu";
import { getCurrentLocale } from "@/lib/getCurrentLocale";
import getTrans from "@/lib/translation";
import { getBestSellers } from "@/server/db/product";

export default async function BestSellers() {
  const BestSellers = await getBestSellers(3);
  console.log(BestSellers);
  

  const locale = await getCurrentLocale();
  const { home } = await getTrans(locale);
  const { bestSeller } = home;
  return (
    <section>
      <div className='container'>
        <div className='text-center mb-4'>
          <MainHeading
            subTitle={bestSeller.checkOut}
            title={bestSeller.OurBestSellers}
          />
        </div>
        <Menu items={BestSellers} />
      </div>
    </section>
  );}
