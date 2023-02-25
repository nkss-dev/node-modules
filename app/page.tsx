import Link from 'next/link';

import AnnouncementsPageCard from '../components/home-page/announcements-card';
import ClubsPageCard from '../components/home-page/clubs-card';
import CoursesPageCard from '../components/home-page/courses-card';

export default function HomePage() {
  return (
    <>
      <header className="text-center">
        <h1>NIT-KKR Student Support System</h1>
        <h2>v1-alpha</h2>
        <br />
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
