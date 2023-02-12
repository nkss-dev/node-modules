import Image from 'next/image';
import maleOnPhone from '../../public/assets/maleOnPhone.png';
import femaleOnPhoneRight from '../../public/assets/femaleOnPhoneRight.png';
import femaleOnPhoneLeft from '../../public/assets/femaleOnPhoneLeft.png';
import paperPlane from '../../public/assets/paperPlane.png';
import background from '../../public/assets/translucentCircle.png';

export default function CoursesPageCard() {
  return (
    <figure>
      <Image src={paperPlane} alt="" />
      <Image src={background} alt="" />
      <Image src={background} alt="" />
      <Image src={background} alt="" />
      <Image src={maleOnPhone} alt="" />
      <Image src={femaleOnPhoneRight} alt="" />
      <Image src={femaleOnPhoneLeft} alt="" />
      <figcaption>
        <hgroup>
          <h1>Courses</h1>
          <p>Do we even learn something in these courses?</p>
        </hgroup>
      </figcaption>
    </figure>
  );
}
