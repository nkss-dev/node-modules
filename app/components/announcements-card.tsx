import Image from 'next/image';
import Link from 'next/link';

import megaphone from '../../public/assets/megaphone.png';

export default function AnnouncementsPageCard() {
  return (
    <Link href="/announcements">
      <article className="h-auto w-72">
        <Image
          src={megaphone}
          alt="Announcements hyperlink image"
          className="bg-white h-72 px-4 pt-4 rounded-lg"
        />

        <br />

        <hgroup className="text-center">
          <h3 className="text-hyperlink">Announcements</h3>
          <p>
            <small>
              Aaaah, not the exam results!
              <br />
              Not RIGHT NOW!!
            </small>
          </p>
        </hgroup>
      </article>
    </Link>
  );
}
