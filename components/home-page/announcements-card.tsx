import Image from 'next/image';

import megaphone from '../../public/assets/megaphone.png';
import HomePageCardLayout from './card-layout';

export default function AnnouncementsPageCard() {
  return (
    <HomePageCardLayout
      href="/announcements"
      title="Announcements"
      description="Aaaah, not the exam results! Not RIGHT NOW!!"
    >
      <Image
        src={megaphone}
        alt="Announcements hyperlink image"
      />
    </HomePageCardLayout>
  );
}
