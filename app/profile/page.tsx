import clsx from 'clsx';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import ClubMemberCard from '../../components/club-member-card';
import DefaultLayout from '../../components/default-layout';
import { fetcher } from '../../utils/fetcher';
import { authOptions } from '../api/auth/auth';

export const metadata = {
  title: 'Profile',
  description: 'Your profile',
};

const rollNumberExp: RegExp = /[0-9]{8,}/;
const getRollNumber = (email: string | null | undefined) =>
  email?.match(rollNumberExp);

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  const rollNumber = getRollNumber(session?.user?.email);
  let student: Student | undefined;
  if (session) {
    student = await fetcher(`/students/${rollNumber}`);
  }

  return (
    <DefaultLayout
      title={student?.name || 'Guest'}
      description={
        student ? (
          student.email
        ) : (
          <>
            You're viewing this page as a guest. Please{' '}
            <Link className="underline" href="/auth/signin">
              sign in
            </Link>{' '}
            to view your profile here!
          </>
        )
      }
    >
      <section className={clsx('flex justify-between', 'mb-4 sm:mb-6 md:mb-8')}>
        <ul className="my-auto">
          <li>
            <strong>Roll Number: </strong>
            {student?.roll_number}
          </li>
          <li>
            <strong>Section: </strong>
            {student?.section}
          </li>
          <li>
            <strong>Phone: </strong>
            {student?.mobile.String}
          </li>
          <li>
            <strong>Batch: </strong>
            {student?.batch}
          </li>
        </ul>
        {session?.user?.image && (
          <Image
            src={session?.user?.image}
            height={128}
            width={128}
            alt="Display Image"
          />
        )}
      </section>

      <hr />
      <br />

      <section>
        {student?.clubs ? (
          <>
            <h3>Clubs</h3>
            <ul className="flex flex-wrap gap-6">
              {student.clubs.map((club) => (
                <ClubMemberCard
                  key={club.name}
                  fullName={club.alias || club.name}
                  href={`/clubs/${club.alias || club.name}`}
                  imageSrc={'clubs/' + (club.alias || club.name) + '/logo'}
                  position={club.position}
                />
              ))}
            </ul>
          </>
        ) : (
          <></>
        )}
      </section>
    </DefaultLayout>
  );
}
