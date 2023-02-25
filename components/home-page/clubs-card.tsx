import Image from 'next/image';
import HomePageCardLayout from './card-layout';

export default function ClubsPageCard() {
  return (
    <HomePageCardLayout
      href="/clubs"
      title="Clubs"
      description="Huh? What are clubs?? Never heard of them :("
    >
      <Image src="" alt="Clubs hyperlink image" />
    </HomePageCardLayout>
  );
}
