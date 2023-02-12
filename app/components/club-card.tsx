import Link from 'next/link';
import ImageWithFallback from './fallback-image';

export default function ClubCard({ club }: { club: ClubBasic }) {
  return (
    <Link href={`/clubs/${club.short_name}`}>
      <article>
        <header>
          <ImageWithFallback
            src={`/assets/clubs/${club.short_name}/logo.png`}
            width={85}
            height={85}
            alt="club logo"
            style={{ borderRadius: '50%', height: '85px' }}
          />
          <hgroup>
            <h3>{club.name}</h3>
            <address>
              <small>
                <p>{club.email}</p>
              </small>
            </address>
          </hgroup>
        </header>
        <p>{club.short_description}</p>
      </article>
    </Link>
  );
}
