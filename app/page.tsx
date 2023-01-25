import Link from 'next/link';
import CoursesPageCard from './courses/(card)';

export default function HomePage() {
  return (
    <div>
      <header>
        <h1>NIT-KKR Student Support System</h1>
        <h2>v1-alpha</h2>
        <p>
          Welcome! The <Link href="/about">NKSSS team</Link> aims to solve as
          many issues you face in our college as technologically possible! The
          following 3 options are ones that we're currently actively developing.
          This website is currently under development and you will be notified
          once its full release rolls around!
          <br />
          <br />
          <strong>PS:</strong> NKSSS is <em>NOT</em> affiliated with NITKKR and
          is completely student run.
        </p>
      </header>

      <main>
        <nav>
          <ol>
            <Link href="/courses">
              <li>
                <CoursesPageCard />
              </li>
            </Link>
          </ol>
        </nav>
      </main>
    </div>
  );
}
