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

  if (segments.length === 0) return <></>;
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        'bg-palette-700 text-2xl',
        'flex flex-wrap justify-between p-4'
      )}
    >
      <ol className="gap-2 inline-flex justify-start">
        <li className="p-2">
          <Link href="/">
            <Image
              className="rounded-full ring ring-palette-700 hover:ring-palette-200"
              height={48}
              width={48}
              src="/nksss.svg"
              alt="NKSSS Logo"
            />
          </Link>
        </li>

        {segments.map((segment, index) => (
          <Fragment key={index}>
            <span className="h-fit m-auto">➜</span>
            <li
              className={clsx(
                'h-fit m-auto p-2',
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

      <ol className="gap-2 inline-flex justify-end">
        <li className="h-fit m-auto p-2">
          <BiBell size={32} />
        </li>

        <li className="h-fit m-auto p-2">
          <Link href="/profile">
            <BsPersonFill size={32} />
          </Link>
        </li>
      </ol>
    </nav>
  );
}
