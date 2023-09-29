'use client';

import clsx from 'clsx';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment, useState } from 'react';
import { BiBell } from 'react-icons/bi';
import { BsLink45Deg, BsPersonFill } from 'react-icons/bs';
import { TbLogout } from 'react-icons/tb';

import ImageWithFallback from '@/components/fallback-image';

const capitalise = (text: string) => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const quickList = [
  {
    heading: 'Calendars',
    items: [
      { name: 'Academic Calendar', link: '1iJ6BxMBIqZEfFMe9c4ocidcm_madI13U' },
      { name: 'Holidays', link: '1l5no5NR7uguRm7zXbpeIqbN9X9IiyDun' },
    ],
  },
  {
    heading: 'Syllabi',
    items: [
      { name: 'Civil Engineering', link: '16GZfj3pzUaiKMx-frey_K2dB2Oy6xe0d' },
      { name: 'Computer Science', link: '1sgjxNv4gf662kwbNeAGygPD49NvGQ2gL' },
      {
        name: 'Electronics And Communication Engineering',
        link: '1IUDACGOHCO3h-vhx-G8ofwrD3LUfqTP-',
      },
      {
        name: 'Electrical Engineering',
        link: '1m-xhRr2J-kK-5EUBeRj7M33ipndCfT_t',
      },
      {
        name: 'Information Technology',
        link: '1hF5sqQb6ifLHcZrc2immFpSn6IoF35OD',
      },
      {
        name: 'Mechanical Engineering',
        link: '1vvgCKCY8hTbHd4oFT51MRXdyYuT2lSLI',
      },
      {
        name: 'Production and Industrial Engineering',
        link: '1l--XXOVAGTyhZYGxz_-G6RJT_Bq-FKY9',
      },
    ],
  },
];

export default function Breadcrumb() {
  const segments = useSelectedLayoutSegments()
    .filter((segment) => !(segment.startsWith('(') && segment.endsWith(')')))
    .map((segment) => decodeURIComponent(segment));

  const [showQuickList, setShowQuickList] = useState(false);

  const { data: session } = useSession();

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
                src="/nkss.svg"
                alt="NKSS Logo"
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
          <li
            className="p-1 relative"
            onMouseEnter={() => {
              setShowQuickList(true);
            }}
            onMouseLeave={() => {
              setShowQuickList(false);
            }}
          >
            <BsLink45Deg
              className={clsx('h-5 w-5', 'sm:h-6 sm:w-6', 'md:h-7 md:w-7')}
            />
            {showQuickList && (
              <nav className="absolute right-0 bg-palette-500 min-w-max mt-1 rounded-md shadow-lg">
                <ul className="py-2">
                  <li className="mb-3">
                    <p className="px-3">NKSS-Drive</p>
                    <ul className="text-palette-300">
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a
                          target="_blank"
                          href="https://drive.google.com/drive/folders/1U2taK5kEhOiUJi70ZkU2aBWY83uVuMmD"
                        >
                          Main link
                        </a>
                      </li>
                    </ul>
                  </li>
                  {quickList.map(({ heading, items }) => (
                    <li className="mb-3">
                      <p className="px-3">{heading}</p>
                      <ul className="text-palette-300">
                        {items.map(({ name, link }) => (
                          <li className="hover:text-palette-100 list-disc list-inside px-3">
                            <a
                              target="_blank"
                              href={`https://drive.google.com/file/d/${link}`}
                            >
                              {name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </li>

          {/* TODO: Make notifications popup view */}
          {/* <li className="p-1">
            <BiBell
              className={clsx('h-5 w-5', 'sm:h-6 sm:w-6', 'md:h-7 md:w-7')}
            />
          </li> */}

          <li className="p-1">
            {session && segments[0] == 'profile' ? (
              <TbLogout
                className={clsx(
                  'hover:cursor-pointer',
                  'h-5 w-5',
                  'sm:h-6 sm:w-6',
                  'md:h-7 md:w-7'
                )}
                onClick={() => signOut({ callbackUrl: '/' })}
                title="Sign Out"
              />
            ) : session ? (
              <Link href="/profile" title="Open Profile">
                <ImageWithFallback
                  className={clsx(
                    'rounded-full',
                    'h-5 w-5',
                    'sm:h-6 sm:w-6',
                    'md:h-7 md:w-7'
                  )}
                  src={session.user?.image}
                  height={32}
                  width={32}
                  alt="Display Picture"
                />
              </Link>
            ) : (
              <BsPersonFill
                className={clsx(
                  'hover:cursor-pointer',
                  'h-5 w-5',
                  'sm:h-6 sm:w-6',
                  'md:h-7 md:w-7'
                )}
                onClick={() => signIn('google', { callbackUrl: '/profile' })}
                title="Sign in using Google"
              />
            )}
          </li>
        </ol>
      </section>
    </nav>
  );
}
