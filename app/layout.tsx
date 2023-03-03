import Link from 'next/link';
import { FaDiscord, FaFacebook, FaInstagram } from 'react-icons/fa';

import '../styles/globals.css';
import Breadcrumb from './breadcrumb';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className="flex flex-col">
        <noscript>You need to enable JavaScript to run this app</noscript>

        <Breadcrumb />

        <section className="container flex flex-col grow max-w-screen-lg">
          {children}
        </section>

        <footer className="bg-palette-800 py-4 mt-8">
          <section className="align-middle container flex flex-row flex-wrap justify-between max-w-screen-lg">
            <ul className="gap-4 inline-flex flex-wrap">
              <li>
                <Link href="/">© 2023 NKSSS</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>

            <address className="inline-flex">
              <ul className="gap-4 inline-flex">
                <li>
                  <a href="https://discord.gg/3P3wg3Yahp">
                    <FaDiscord size={20} />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/nksss.live">
                    <FaInstagram size={20} />
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com/nksss.live">
                    <FaFacebook size={20} />
                  </a>
                </li>
              </ul>
            </address>
          </section>
        </footer>
      </body>
    </html>
  );
}
