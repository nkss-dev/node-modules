import Link from 'next/link';
import ImageWithFallback from './fallback-image';

export default function ClubCard({ club }: { club: Club }) {
  return (
    <Link href={`/clubs/${club.short_name}`}>
      <figure>
        <ImageWithFallback
          src={`/assets/clubs/${club.short_name}/logo.png`}
          width={100}
          height={100}
          alt="club logo"
          style={{ borderRadius: '50%' }}
        />
        <figcaption>
          <h3>{club.name}</h3>
          <p>{club.description}</p>
        </figcaption>
      </figure>
    </Link>
  );
}
