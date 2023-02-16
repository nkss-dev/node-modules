import Image from 'next/image';
import Link from 'next/link';

import megaphone from '../../public/assets/megaphone.png';

export default function AnnouncementsPageCard() {
  return (
    <Link href='/announcements'>
      <article>
        <Image src={megaphone} alt='Announcements hyperlink image' />
        <hgroup>
          <h2>Announcements</h2>
          <p>Aaaah, not the exam results! Not RIGHT NOW!!</p>
        </hgroup>
      </article>
    </Link>
  );
}
