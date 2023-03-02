import { Metadata } from 'next';
import Link from 'next/link';
import { BsBook, BsMegaphone, BsPeople } from 'react-icons/bs';
import Balancer from 'react-wrap-balancer';

import HomeCardsLayout from '../components/home-cards-layout';

export function generateMetadata(): Metadata {
  const project_name = 'NIT-KKR Student Support System';
  const short_project_name = 'NKSSS';
  const url = 'https://nksss.live';
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
          <Balancer>NIT-KKR Student Support System</Balancer>
        </h1>

        <p>
          Welcome! The{' '}
          <Link className="hyperlink" href="/about">
            NKSSS team
          </Link>{' '}
          aims to solve as many issues you face in our college as
          technologically possible! The following 3 options are ones that we're
          currently actively developing. This website is currently under
          development and you will be notified once its full release rolls
          around!
          <br />
          <br />
          <strong>PS:</strong> NKSSS is <em>NOT</em> affiliated with NITKKR and
          is completely student run.
        </p>
      </hgroup>

      <nav>
        <ol className="flex flex-row flex-wrap gap-12 justify-between">
          <li>
            <HomeCardsLayout
              href="/announcements"
              title="Announcements"
              description="Aaaah, not the exam results! Not RIGHT NOW!!"
            >
              <BsMegaphone size={32} />
            </HomeCardsLayout>
          </li>

          <li>
            <HomeCardsLayout
              href="/courses"
              title="Courses"
              description="Do we even learn something in these courses?"
            >
              <BsBook size={32} />
            </HomeCardsLayout>
          </li>

          <li>
            <HomeCardsLayout
              href="/clubs"
              title="Clubs"
              description="Huh? What are clubs?? Never heard of them :("
            >
              <BsPeople size={32} />
            </HomeCardsLayout>
          </li>
        </ol>
      </nav>
    </article>
  );
}
