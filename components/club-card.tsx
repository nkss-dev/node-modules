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
          'bg-palette-700 hover:bg-palette-800 flex flex-col p-6 relative rounded-lg shadow text-left w-96 h-52',
          disabled ? 'cursor-not-allowed' : 'cursor-default'
        )}
        disabled={disabled}
      >
        <header className="flex flex-row items-center mb-4 h-[60%]">
          <ImageWithFallback
            src={`/assets/clubs/${club.short_name}/logo.png`}
            width={85}
            height={85}
            alt="club logo"
            style={{ borderRadius: '50%', height: '85px' }}
          />
          <hgroup className="h-fit items-center px-4">
            <h4 className="mb-1 min-w-fit tracking-tight">
              <Balancer>{club.name}</Balancer>
            </h4>
            <address>
              <p className="text-palette-300">
                <small>{club.email}</small>
              </p>
            </address>
          </hgroup>
        </header>
        <p className="text-palette-300 tracking-tight">
          {club.short_description}
        </p>
      </button>
    </Link>
  );
}
