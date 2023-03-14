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

  if (segments.length === 0)
    return <header className="mb-4 md:mb-8"></header>;
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx('mb-4 md:mb-8', 'bg-palette-700 py-2')}
    >
      <section className="container flex flex-wrap justify-between max-w-screen-lg md:text-[22px]">
        <ol className="gap-2 inline-flex items-center justify-start">
          <li className="sm:p-1 md:p-2">
            <Link href="/">
              <Image
                className={clsx(
                  'h-7 w-7',
                  'sm:h-8 sm:w-8',
                  'md:h-9 md:w-9',
                  'rounded-full ring ring-palette-700 hover:ring-palette-200'
                )}
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
                  'sm:p-1 md:p-2',
                  index === segments.length - 1 && 'font-bold'
                )}
              >
                <Link href={'/' + segments.slice(0, index + 1).join('/')}>
                  <h3 className="mb-0">{capitalise(segment)}</h3>
                </Link>
              </li>
            </Fragment>
          ))}
        </ol>

        <ol
          className={clsx(
            'sm:gap-1 md:gap-2',
            'inline-flex items-center justify-end'
          )}
        >
          <li className="p-1">
            <BiBell
              className={clsx('h-5 w-5', 'sm:h-6 sm:w-6', 'md:h-7 md:w-7')}
            />
          </li>

          <li className="p-1">
            <Link href="/profile">
              <BsPersonFill
                className={clsx('h-5 w-5', 'sm:h-6 sm:w-6', 'md:h-7 md:w-7')}
              />
            </Link>
          </li>
        </ol>
      </section>
    </nav>
  );
}
