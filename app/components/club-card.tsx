import Link from 'next/link';
import ImageWithFallback from './fallback-image';

export default function ClubCard({ club }: { club: Club }) {
  const email: string | undefined = club.socials.find(
    (social) => social.platform == 'email'
  )?.link;

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
              <small>{email ? <p>{email}</p> : <></>}</small>
            </address>
          </hgroup>
        </header>
        <p>{club.description}</p>
      </article>
    </Link>
  );
}
