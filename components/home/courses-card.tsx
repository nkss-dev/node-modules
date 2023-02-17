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
      <article className="h-auto w-72">
        <figure className="bg-white h-72 w-72 px-4 pt-4 rounded-lg relative">
          <Image src={paperPlane} height={272} alt="" className="max-w-[80%] absolute" />

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
        </figure>

        <br />

        <hgroup className="text-center">
          <h3 className="text-hyperlink">Courses</h3>
          <p>
            <small>Do we even learn something in these courses?</small>
          </p>
        </hgroup>
      </article>
    </Link>
  );
}
