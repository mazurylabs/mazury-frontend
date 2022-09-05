import { Layout } from 'components';
import Link from 'next/link';
import Image from 'next/image';

import SVG from 'react-inlinesvg';
import { useState } from 'react';
import { SideModal } from '@/components/SideModal';
import JobApplyModal from '@/components/JobApplyModal';

const JobPost = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Layout variant="plain">
      <main className="mt-9 px-4 lg:mt-16 lg:px-8">
        <div className="mb-3 lg:mb-4">
          <Link href="">
            <SVG src="/icons/arrow-left.svg" height={24} width={24} />
          </Link>
        </div>

        <div className="flex flex-row items-center justify-between lg:mb-4">
          <h1 className="font-serif text-4xl font-semibold text-indigoGray-90">
            NFT x DeFi Content Writer
          </h1>

          <button
            className="hidden h-[45px] w-[211px] items-center justify-center rounded-lg bg-indigoGray-90 text-sm text-indigoGray-5 transition-shadow hover:shadow-lg lg:flex"
            onClick={() => setIsOpen(true)}
          >
            Apply for this job
          </button>
        </div>

        <div className="flex items-center">
          <SVG src="/icons/openpeeps.svg" width={32} height={32} />
          <p className="ml-3 mr-6 text-sm font-medium uppercase text-indigoGray-90">
            MARCOMM
          </p>
          <div className="flex items-center">
            <SVG src="/icons/Time.svg" width={16} height={16} />
            <span className="ml-1 font-medium capitalize text-indigoGray-40">
              today
            </span>
          </div>
        </div>

        <div className="mt-5 hidden divide-y-2 border border-solid border-indigoGray-20 lg:flex" />

        <section className="grid-row-6 mt-6 mb-4 grid  gap-4 lg:grid lg:max-w-2xl lg:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-indigoGray-40">
              Company name
            </label>
            <p className="text-sm font-medium uppercase text-indigoGray-90">
              MARCOMM
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-indigoGray-40">
              E-mail
            </label>
            <p className="text-sm font-medium lowercase text-indigoGray-90">
              recruit@marcomm.xyz
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-indigoGray-40">
              Location
            </label>
            <p className="text-sm font-medium capitalize text-indigoGray-90">
              Remote
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-indigoGray-40">
              Deadline
            </label>
            <p className="text-sm font-medium text-indigoGray-90">22/10/2022</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-indigoGray-40">
              Salary
            </label>
            <p className="text-sm font-medium text-indigoGray-90">
              $40k-70k yearly + benefits
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-indigoGray-40">
              Published
            </label>
            <p className="text-sm font-medium uppercase text-indigoGray-90">
              22/10/2022
            </p>
          </div>
        </section>

        <section className="my-4">
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-row items-center gap-2">
              <div className="h-[12px] w-[12px] rounded-full">
                <div className="h-[100%] w-[100%] rounded-full border-2 border-green-600" />
              </div>
              <p className="flex flex-row  text-xs font-medium text-green-600">
                6 / 9
              </p>
              <p className="text-sm font-medium text-indigoGray-40">
                Stand-out credentials
              </p>
            </div>

            <p className="text-sm font-normal text-indigoGray-40">
              The more you have, the merrier! These were chosen to help users
              stand out from the crowd that applies to the job post
            </p>
          </div>
        </section>

        <section className="flex flex-col gap-2">
          <div className="grid auto-cols-auto gap-2 lg:flex lg:max-w-md lg:flex-row lg:flex-wrap">
            <div className="flex h-12 w-[max-content] flex-row gap-3 rounded border border-green-200 bg-green-50 py-1 px-4">
              <Image
                src="/badges/d_doa.png"
                width="26px"
                height="40px"
                alt="Badge icon"
              />
              <div className="flex flex-col justify-center">
                <p className="text-xs text-green-700">Aave voter</p>
                <p className="text-xs text-gray-400">You have this!</p>
              </div>
            </div>
            <div className="flex h-12 w-[max-content] flex-row gap-3 rounded border border-green-200 bg-green-50 py-1 px-4">
              <Image
                src="/badges/d_doa.png"
                width="26px"
                height="40px"
                alt="Badge icon"
              />
              <div className="flex flex-col justify-center">
                <p className="text-xs text-green-700">Aave voter</p>
                <p className="text-xs text-gray-400">You have this!</p>
              </div>
            </div>
            <div className="border-grayn-20 flex h-12 w-[max-content] flex-row gap-3 rounded border bg-transparent py-1 px-4">
              <Image
                src="/badges/d_doa.png"
                width="26px"
                height="40px"
                alt="Badge icon"
              />
              <div className="flex flex-col justify-center">
                <p className="text-gray-90 text-xs">Aave voter</p>
              </div>
            </div>

            <div className="border-grayn-20 flex h-12 w-[max-content] flex-row gap-3 rounded border bg-transparent py-1 px-4">
              <Image
                src="/badges/d_doa.png"
                width="26px"
                height="40px"
                alt="Badge icon"
              />
              <div className="flex flex-col justify-center">
                <p className="text-gray-90 text-xs">Aave voter</p>
              </div>
            </div>
            <div className="border-grayn-20 flex h-12 w-[max-content] flex-row gap-3 rounded border bg-transparent py-1 px-4">
              <Image
                src="/badges/d_doa.png"
                width="26px"
                height="40px"
                alt="Badge icon"
              />
              <div className="flex flex-col justify-center">
                <p className="text-gray-90 text-xs">Aave voter</p>
              </div>
            </div>
            <div className="border-grayn-20 flex h-12 w-[max-content] flex-row gap-3 rounded border bg-transparent py-1 px-4">
              <Image
                src="/badges/d_doa.png"
                width="26px"
                height="40px"
                alt="Badge icon"
              />
              <div className="flex flex-col justify-center">
                <p className="text-gray-90 text-xs">Aave voter</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2"></div>
        </section>

        <section className="mt-4 mb-10">
          <h3 className="mb-2 text-sm font-medium text-indigoGray-40">
            Description
          </h3>

          <h3 className="text-sm font-bold text-indigoGray-90">
            What is Praava Health?
          </h3>
          <p className="mb-4 text-sm font-light text-indigoGray-90">
            Praava Health is building Bangladesh’s fastest growing consumer
            healthcare brand. We are raising the bar with a brick-and-click
            healthcare platform that combines digital tools with meaningful
            doctor-Patient relationships, quality diagnostics, and pharmacy
            services. In May 2020, Fast Company recognized Praava Health in its
            World Changing Ideas Awards. Praava’s work has also been featured by
            Forbes Magazine, Financial Times, NASDAQ, Tech in Asia, and Devex;
            and Praava won MIT Solve’s Bangladesh Tiger Challenge in 2019.
            Praava Health was selected by the Tamer Fund for Social Ventures at
            Columbia Business School as an inaugural portfolio venture, and was
            also selected by Alter Global as one of Bangladesh’s most promising
            new companies. Praava is a Patient-driven company that aims to be
            every Patient’s first call, seamlessly integrating quality
            infrastructure with technology to improve efficiency, accessibility,
            & scalability of the brick & click model. Praava is the combination
            of the words “praan” (life) and “aava” (beam) -- “beam of life” is a
            symbolic reflection of what we are building. We aspire to be
            Bangladesh’s trusted partner in health, empowering Patients to
            manage their health in a manner aligned with their values. We are a
            small, impassioned, collaborative team that is inspired to build the
            best healthcare company in Bangladesh. We seek interns who are
            excited to help us to build, design, and communicate a new brand and
            a new concept of healthcare to a new market.
          </p>

          <h3 className="text-sm font-bold text-indigoGray-90">
            Why Bangladesh is the Next Asian Tiger
          </h3>
          <p className="mb-4 text-sm font-light text-indigoGray-90">
            Nearly 170 million people live in Bangladesh, making it one of the
            world’s most populous countries and densely populated markets.
            Bangladesh is also one of the fastest growing economies in the world
            and has been dubbed the next Asian tiger by the World Economic
            Forum, The Economist, and others. A dynamic, growing middle class of
            40+ million people - 25% of the population - has already propelled
            Bangladesh to “middle-income” status. As income levels rise, health
            expenditures increase disproportionately. Middle class families
            demand and can pay for higher quality services. To learn more about
            Bangladesh’s healthcare system, check out pieces penned by the
            founder for the Strategic Review and the Council on Foreign
            Relations.
          </p>

          <p className="mb-4 text-sm font-medium text-indigoGray-90">
            What will you be doing? <br /> Key Job Responsibility:
          </p>

          <ol className="flex list-inside list-decimal flex-col gap-4">
            <li>
              Familiarize with the doctors' practices and specialties; develop
              and maintain potential Doctors' database within assigned territory{' '}
            </li>
            <li>
              Build and maintain relationships with medical professionals in
              keeping contact with the medical association; medical institutes;
              collect information about the doctors operating in those
              institutes and maintain a good relationship with the doctors and
              generate prescriptions
            </li>
            <li>
              Achieve monthly targets from assigned territory as set by the
              Management
            </li>
            <li>
              Travel to assigned external healthcare facilities for doctor
              visits, increase B2B and subsequent business development.
            </li>
          </ol>

          <h3 className="my-6">
            What are we looking for? <br /> Minimum Academic Qualification:
          </h3>

          <p className="mb-6">
            Graduation Minimum Years of Experience: 2 years
          </p>

          <p>Why work at Praava Health?</p>
          <p>
            Make the world a better place: Every member of our team believes in
            her/his capacity to contribute to systemic change in healthcare in
            Bangladesh.
          </p>
          <p>
            Be at the forefront of redesigning healthcare delivery: Praava has
            an incredible platform for impact, including through incorporation
            of value-based concepts that align our incentives with our Patients’
            for a healthier future for our communities and our country.
          </p>
          <p>
            Improve healthcare and health through evidence: We are investing in
            constantly evaluating the effectiveness and impact of our work.
          </p>
          <p>
            Revolutionize healthcare through the concept of patient-centric
            care: Praava’s core values ensure that Patients are treated with
            empathy, respect and dignity. We are committed to creating an
            unparalleled healthcare experience and to change the perception of
            healthcare in Bangladesh. We are driven by the belief that clinical
            outcomes are actually improved when Patients are engaged in managing
            their health. Join a diverse, energetic team: The Praava team is
            proud to have attracted a wide range of international and local
            talent, and we hope you can help us to expand this. The team is
            energetic, amiable, and helpful, and truly embodies a work family.
          </p>
          <p>
            Be part of a rapidly scaling organization: By harnessing technology,
            data, and creative alternative financing models, Praava Health
            expects to offer world class health care to tens of millions of
            Bangladeshis. Praava Health is an equal opportunity employer. All
            qualified applicants will receive consideration for employment
            without regard to race, color, religion, sex, national origin,
            disability status, protected veteran status, gender identity, sexual
            orientation or any other quality protected by law.
          </p>

          <Link href="/jobs/job-apply">
            <button className="mt-10 h-11 w-full rounded-lg bg-indigoGray-90 text-sm text-indigoGray-5 lg:hidden">
              Apply for this job
            </button>
          </Link>
        </section>
      </main>

      <SideModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <JobApplyModal />
      </SideModal>
    </Layout>
  );
};

export default JobPost;
