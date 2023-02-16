import Image from 'next/image';
import Link from 'next/link';

export default function ClubsPageCard() {
  return (
    <Link href="/clubs">
      <article>
        <Image src="" width={85} height={85} alt="Clubs hyperlink image" />
        <hgroup>
          <h2>Clubs</h2>
          <p>Huh? What are clubs?? Never heard of them :(</p>
        </hgroup>
      </article>
    </Link>
  );
}
