import Link from 'next/link';

import ImageWithFallback from './fallback-image';

export default function ClubCard({ club }: { club: ClubBasic }) {
  return (
    <Link href={`/clubs/${club.short_name}`}>
      <article className="bg-palette-700 hover:bg-palette-800 flex flex-col mb-4 mr-4 p-6 relative rounded-lg shadow w-96 h-52">
        <header className="flex flex-row items-center mb-4">
          <ImageWithFallback
            src={`/assets/clubs/${club.short_name}/logo.png`}
            width={85}
            height={85}
            alt="club logo"
            style={{ borderRadius: '50%', height: '85px' }}
          />
          <hgroup className="h-fit items-center px-4">
            <h4 className="mb-1 min-w-fit tracking-tight">{club.name}</h4>
            <address>
              <p className="text-palette-300">
                <small>{club.email}</small>
              </p>
            </address>
          </hgroup>
        </header>
        <p className="text-palette-300 tracking-tight">{club.short_description}</p>
      </article>
    </Link>
  );
}
