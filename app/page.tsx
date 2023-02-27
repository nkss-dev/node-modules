import { Metadata } from 'next';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import AnnouncementsPageCard from '../components/home-page/announcements-card';
import ClubsPageCard from '../components/home-page/clubs-card';
import CoursesPageCard from '../components/home-page/courses-card';

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
    <>
      <header className="text-center">
        <h1>NIT-KKR Student Support System</h1>
        <h2>v1-alpha</h2>
        <br />
        <p>
          <Balancer>
            Welcome! The{' '}
            <Link className="hyperlink" href="/about">
              NKSSS team
            </Link>{' '}
            aims to solve as many issues you face in our college as
            technologically possible! The following 3 options are ones that
            we're currently actively developing. This website is currently under
            development and you will be notified once its full release rolls
            around!
            <br />
            <br />
            <strong>PS:</strong> NKSSS is <em>NOT</em> affiliated with NITKKR
            and is completely student run.
          </Balancer>
        </p>
      </header>

      <br />
      <br />

      <main>
        <nav>
          <ol className="flex flex-row flex-wrap gap-12 justify-evenly">
            <li>
              <AnnouncementsPageCard />
            </li>

            <li>
              <CoursesPageCard />
            </li>

            <li>
              <ClubsPageCard />
            </li>
          </ol>
        </nav>
      </main>
    </>
  );
}
