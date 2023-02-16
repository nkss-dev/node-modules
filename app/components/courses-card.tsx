import Image from 'next/image';
import Link from 'next/link';

import maleOnPhone from '../../public/assets/maleOnPhone.png';
import femaleOnPhoneRight from '../../public/assets/femaleOnPhoneRight.png';
import femaleOnPhoneLeft from '../../public/assets/femaleOnPhoneLeft.png';
import paperPlane from '../../public/assets/paperPlane.png';
import background from '../../public/assets/translucentCircle.png';

export default function CoursesPageCard() {
  return (
    <Link href="/courses">
      <article>
        <Image src={paperPlane} alt="" />
        <Image src={background} alt="" />
        <Image src={background} alt="" />
        <Image src={background} alt="" />
        <Image src={maleOnPhone} alt="" />
        <Image src={femaleOnPhoneRight} alt="" />
        <Image src={femaleOnPhoneLeft} alt="" />
        <hgroup>
          <h2>Courses</h2>
          <p>Do we even learn something in these courses?</p>
        </hgroup>
      </article>
    </Link>
  );
}
