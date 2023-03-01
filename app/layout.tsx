import Link from 'next/link';
import { FaDiscord, FaFacebook, FaInstagram } from 'react-icons/fa';

import '../styles/custom-list.css';
import '../styles/globals.css';
import '../styles/highlight-col.css';
import '../styles/markdown-list.css';
import '../styles/row-link.css';
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

        <section className="container grow">{children}</section>

        <footer className="bg-palette-800 p-4 mt-8">
          <section className="align-middle container flex flex-row flex-wrap justify-between">
            <ul className="gap-4 inline-flex flex-wrap">
              <li>
                <Link href="/">© 2023 NKSSS</Link>
              </li>
              <li>
                <Link className="hover:underline" href="/about">
                  About
                </Link>
              </li>
            </ul>

            <address className="inline-flex">
              <ul className="gap-4 inline-flex">
                <li className="">
                  <a className="" href="https://discord.gg/3P3wg3Yahp">
                    <FaDiscord size={20} />
                  </a>
                </li>
                <li>
                  <a className="" href="https://instagram.com/nksss.live">
                    <FaInstagram size={20} />
                  </a>
                </li>
                <li>
                  <a className="" href="https://facebook.com/nksss.live">
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
