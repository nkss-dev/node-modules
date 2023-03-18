'use client';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useSelectedLayoutSegments } from 'next/navigation';
import { Fragment, useState } from 'react';
import { BiBell } from 'react-icons/bi';
import { BsLink45Deg, BsPersonFill } from 'react-icons/bs';

const capitalise = (text: string) => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
};

export default function Breadcrumb() {
  const segments = useSelectedLayoutSegments().filter(
    (segment) => !(segment.startsWith('(') && segment.endsWith(')'))
  );

  const [showQuickList, setShowQuickList] = useState(false);

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
                  <li className='mb-3'>
                    <p className="px-3">Academic Calendars</p>
                    <ul className='text-palette-300'>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/1iJ6BxMBIqZEfFMe9c4ocidcm_madI13U">
                          Revised Academic Calendar
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className='mb-3'>
                    <p className="px-3">Syllabi</p>
                    <ul className='text-palette-300'>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/16GZfj3pzUaiKMx-frey_K2dB2Oy6xe0d">
                          Civil Engineering
                        </a>
                      </li>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/1sgjxNv4gf662kwbNeAGygPD49NvGQ2gL">
                          Computer Science
                        </a>
                      </li>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/1IUDACGOHCO3h-vhx-G8ofwrD3LUfqTP-">
                          Electronics And Communication Engineering
                        </a>
                      </li>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/1m-xhRr2J-kK-5EUBeRj7M33ipndCfT_t">
                          Electrical Engineering
                        </a>
                      </li>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/1hF5sqQb6ifLHcZrc2immFpSn6IoF35OD">
                          Information Technology
                        </a>
                      </li>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/1vvgCKCY8hTbHd4oFT51MRXdyYuT2lSLI">
                          Mechanical Engineering
                        </a>
                      </li>
                      <li className="hover:text-palette-100 list-disc list-inside px-3">
                        <a href="https://drive.google.com/file/d/1l--XXOVAGTyhZYGxz_-G6RJT_Bq-FKY9">
                          Production and Industrial Engineering
                        </a>
                      </li>
                    </ul>
                  </li>
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
