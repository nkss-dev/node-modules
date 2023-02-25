import Image from 'next/image';

import maleOnPhone from '../../public/assets/maleOnPhone.png';
import femaleOnPhoneRight from '../../public/assets/femaleOnPhoneRight.png';
import femaleOnPhoneLeft from '../../public/assets/femaleOnPhoneLeft.png';
import paperPlane from '../../public/assets/paperPlane.png';
import background from '../../public/assets/translucentCircle.png';
import HomePageCardLayout from './card-layout';

export default function CoursesPageCard() {
  return (
    <HomePageCardLayout
      href="/courses"
      title="Courses"
      description="Do we even learn something in these courses?"
    >
      <Image
        src={paperPlane}
        height={272}
        alt=""
        className="max-w-[80%] absolute"
      />

      <Image
        src={background}
        alt=""
        className="absolute max-w-[30%] right-[20%]"
      />
      <Image
        src={maleOnPhone}
        alt=""
        className="absolute max-w-[23%] right-[25%] top-[8%]"
      />

      <Image
        src={background}
        alt=""
        className="absolute bottom-[30%] left-[10%] max-w-[30%]"
      />
      <Image
        src={femaleOnPhoneRight}
        alt=""
        className="absolute bottom-[30%] left-[15%] max-w-[23%] "
      />

      <Image
        src={background}
        alt=""
        className="absolute bottom-[5%] max-w-[30%] right-[5%]"
      />
      <Image
        src={femaleOnPhoneLeft}
        alt=""
        className="absolute bottom-[5%] max-w-[23%] right-[8%]"
      />
    </HomePageCardLayout>
  );
}
