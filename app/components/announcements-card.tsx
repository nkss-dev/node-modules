import Image from 'next/image';
import megaphone from '../../public/assets/megaphone.png';

export default function AnnouncementsPageCard() {
  return (
    <figure>
      <Image src={megaphone} alt="" />
      <figcaption>
        <hgroup>
          <h1>Announcements</h1>
          <p>Aaaah, not the exam results! Not RIGHT NOW!!</p>
        </hgroup>
      </figcaption>
    </figure>
  );
}
