import clsx from 'clsx';
import { Metadata } from 'next';
import { BsBook, BsMegaphone, BsPeople } from 'react-icons/bs';
import Balancer from 'react-wrap-balancer';

import HomeCardsLayout from '../components/home-cards-layout';

export function generateMetadata(): Metadata {
  const project_name = 'NIT-KKR Student Support';
  const short_project_name = 'NKSS';
  const url = 'https://node-modules.up.railway.app';
  const description =
    'A student run initiative to address all the problems faced by college students which can be solved technologically';

  return {
    alternates: { canonical: url },
    authors: [
      { name: 'Priyanshu Tripathi', url: 'https://bio.link/getpsyched' },
    ],
    description: description,
    colorScheme: 'dark',
    creator: 'Priyanshu Tripathi',
    title: short_project_name,

    icons: {
      icon: '/favicon.ico',
    },

    openGraph: {
      title: project_name,
      description: description,
      url: url,
      siteName: project_name,
      locale: 'en-GB',
      type: 'website',
    },
  };
}

export default function HomePage() {
  return (
    <article className="my-auto">
      <hgroup className="mb-12">
        <h1 className="mb-6">
          <Balancer>NIT-KKR Student Support</Balancer>
        </h1>

        <p>
          Welcome! This project aims to enable an easier path to figuring your
          way in this college! We have many more features planned that you can
          find out about on our Discord server linked below.
          <br />
          <br />
          <strong>PS:</strong> NKSS is <em>NOT</em> affiliated with NITKKR and
          is completely student run.
        </p>
      </hgroup>

      <nav className="h-min">
        <ol className="grid grid-cols-1 sm:grid-cols-6 grid-auto-rows gap-8">
          <li
            className={clsx('col-start-1 row-start-1 w-fit', 'sm:col-span-2')}
          >
            <HomeCardsLayout
              href="/announcements"
              title="Announcements"
              description="Aaaah, not the exam results! Not RIGHT NOW!!"
            >
              <BsMegaphone className="h-6 w-6 md:h-8 md:w-8" />
            </HomeCardsLayout>
          </li>

          <li
            className={clsx(
              'col-start-1 row-start-2 w-fit',
              'sm:col-span-2 sm:col-start-5 sm:row-start-1 sm:justify-self-end',
              'md:col-start-3 md:row-start-1 md:justify-self-center'
            )}
          >
            <HomeCardsLayout
              href="/courses"
              title="Courses"
              description="Do we even learn something in these courses?"
            >
              <BsBook className="h-6 w-6 md:h-8 md:w-8" />
            </HomeCardsLayout>
          </li>

          <li
            className={clsx(
              'col-start-1 row-start-3 w-fit',
              'sm:col-span-2 sm:col-start-3 sm:row-start-2 sm:justify-self-center',
              'md:col-start-5 md:row-start-1 md:justify-self-end'
            )}
          >
            <HomeCardsLayout
              href="/clubs"
              title="Clubs"
              description="There are 20+ clubs? Since when??"
            >
              <BsPeople className="h-6 w-6 md:h-8 md:w-8" />
            </HomeCardsLayout>
          </li>
        </ol>
      </nav>
    </article>
  );
}
