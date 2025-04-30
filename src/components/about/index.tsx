import { Routes } from '@/constants/enums';
import MainHeading from '../main-heading';

async function About() {

  return (
    <section className='section-gap' id={Routes.ABOUT}>
      <div className='container text-center'>
        <MainHeading subTitle={`our story`} title={`our story`} />
        <div className='text-accent max-w-md mx-auto mt-4 flex flex-col gap-4'>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus soluta veniam quasi aliquam, et hic velit ducimus non rerum magnam at blanditiis ut nulla quam vero error necessitatibus labore modi.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus soluta veniam quasi aliquam, et hic velit ducimus non rerum magnam at blanditiis ut nulla quam vero error necessitatibus labore modi.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus soluta veniam quasi aliquam, et hic velit ducimus non rerum magnam at blanditiis ut nulla quam vero error necessitatibus labore modi.</p>
         
        </div>
      </div>
    </section>
  );
}

export default About;
