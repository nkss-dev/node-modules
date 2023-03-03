'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment } from 'react';
import { BiBell } from 'react-icons/bi';
import { BsPersonFill } from 'react-icons/bs';

const capitalise = (text: string) => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
};

export default function Breadcrumb() {
  const segments = useSelectedLayoutSegments().filter(
    (segment) => !(segment.startsWith('(') && segment.endsWith(')'))
  );

  if (segments.length === 0) return <header className='mb-2 sm:mb-4 md:mb-8'></header>;
  return (
    <nav aria-label="Breadcrumb" className="bg-palette-700 py-2 mb-8">
      <section className="container flex flex-wrap justify-between max-w-screen-lg text-[22px]">
        <ol className="gap-2 inline-flex items-center justify-start">
          <li className="p-2">
            <Link href="/">
              <Image
                className="rounded-full ring ring-palette-700 hover:ring-palette-200"
                height={34}
                width={34}
                src="/nksss.svg"
                alt="NKSSS Logo"
              />
            </Link>
          </li>

          {segments.map((segment, index) => (
            <Fragment key={index}>
              <span>➜</span>
              <li
                className={clsx(
                  'p-2',
                  index === segments.length - 1 && 'font-bold'
                )}
              >
                <Link
                  className="hover:underline"
                  href={'/' + segments.slice(0, index + 1).join('/')}
                >
                  {capitalise(segment)}
                </Link>
              </li>
            </Fragment>
          ))}
        </ol>

        <ol className="gap-2 inline-flex items-center justify-end">
          <li className="p-2">
            <BiBell size={28} />
          </li>

          <li className="p-2">
            <Link href="/profile">
              <BsPersonFill size={28} />
            </Link>
          </li>
        </ol>
      </section>
    </nav>
  );
}
