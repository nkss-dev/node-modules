import Image from 'next/image';
import maleOnPhone from '../../assets/maleOnPhone.png';
import femaleOnPhoneRight from '../../assets/femaleOnPhoneRight.png';
import femaleOnPhoneLeft from '../../assets/femaleOnPhoneLeft.png';
import paperPlane from '../../assets/paperPlane.png';
import background from '../../assets/translucentCircle.png';

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
