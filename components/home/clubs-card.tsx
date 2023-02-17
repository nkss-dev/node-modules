import Image from 'next/image';
import Link from 'next/link';

export default function ClubsPageCard() {
  return (
    <Link href="/clubs">
      <article className="h-auto w-72">
        <Image
          src=""
          alt="Clubs hyperlink image"
          className="bg-white h-72 px-4 pt-4 rounded-lg"
        />

        <br />

        <hgroup className="text-center">
          <h3 className="text-hyperlink">Clubs</h3>
          <p>
            <small>
              Huh? What are clubs??
              <br />
              Never heard of them :(
            </small>
          </p>
        </hgroup>
      </article>
    </Link>
  );
}
