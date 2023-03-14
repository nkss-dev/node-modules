import clsx from 'clsx';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import ImageWithFallback from './fallback-image';

export default function ClubCard({ club }: { club: ClubBasic }) {
  const disabled = club.short_description === 'Lorem Ipsum' ? true : false;
  return (
    <Link href={`/clubs/${club.short_name}`}>
      <button
        className={clsx(
          'p-2 w-44 h-40',
          'sm:p-4 sm:w-64 sm:h-60',
          'md:p-6 md:w-72 md:h-64',
          'bg-palette-700 hover:bg-palette-800 rounded-lg shadow',
          disabled ? 'cursor-not-allowed' : 'cursor-default'
        )}
        disabled={disabled}
      >
        <header className="flex flex-col gap-4 items-center mx-auto w-fit">
          <ImageWithFallback
            className={clsx(
              'h-12 w-12',
              'sm:h-20 sm:w-20',
              'md:h-24 md:w-24',
              'rounded-full'
            )}
            src={`/assets/clubs/${club.short_name}/logo.png`}
            width={96}
            height={96}
            alt="club logo"
          />
          <hgroup className="h-fit items-center">
            <h4 className="mb-1">
              <Balancer className="min-w-fit">{club.name}</Balancer>
            </h4>
            <address>
              <p className="text-palette-300">
                <small>{club.email}</small>
              </p>
            </address>
          </hgroup>
        </header>
      </button>
    </Link>
  );
}
