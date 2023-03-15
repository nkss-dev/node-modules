import clsx from 'clsx';
import Link from 'next/link';
import Balancer from 'react-wrap-balancer';

import ImageWithFallback from './fallback-image';

export default function ClubAdminCard({ admin }: { admin: ClubAdmin }) {
  return (
    <Link href={`/users/${admin.roll}`}>
      <button
        className={clsx(
          'p-2 w-36 h-36',
          'sm:p-4 sm:w-52 sm:h-52',
          'md:p-6 md:w-56 md:h-60',
          'bg-palette-700 hover:bg-palette-800 rounded-lg shadow md:flex md:items-start'
        )}
      >
        <header className="flex flex-col gap-4 items-center mx-auto w-fit">
          <ImageWithFallback
            className={clsx(
              'h-12 w-12',
              'sm:h-20 sm:w-20',
              'md:h-24 md:w-24',
              'rounded-full'
            )}
            src={`/assets/users/${admin.roll}.png`}
            width={96}
            height={96}
            alt="profile pic"
          />
          <hgroup className="h-fit items-center">
            <h4 className="mb-1">
              <Balancer className="min-w-fit">{admin.name}</Balancer>
            </h4>
            <address>
              <p className="text-palette-300">
                <small>{admin.position}</small>
              </p>
            </address>
          </hgroup>
        </header>
      </button>
    </Link>
  );
}
