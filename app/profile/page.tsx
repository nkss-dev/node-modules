import clsx from 'clsx';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';

import ClubMemberCard from '../../components/club-member-card';
import DefaultLayout from '../../components/default-layout';
import api from '../../utils/api-actions';
import { authOptions } from '../api/auth/auth';

export const metadata = {
  title: 'Profile',
  description: 'Your profile',
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  let student: Student | undefined;
  if (session?.user?.email) {
    student = await api.GET(`/students/${session.user.email}`);
  }

  if (!session || !student)
    return (
      <DefaultLayout
        title="Guest View"
        description={
          student ? (
            student.email
          ) : (
            <>
              You're viewing this page as a guest. Please{' '}
              <Link className="underline" href="/api/auth/signin">
                sign in
              </Link>{' '}
              to view your profile here!
            </>
          )
        }
      >
        <></>
      </DefaultLayout>
    );

  return (
    <DefaultLayout title={student.name} description={student.email}>
      <section className={clsx('flex justify-between', 'mb-4 sm:mb-6 md:mb-8')}>
        <ul className="my-auto">
          <li>
            <strong>Roll Number: </strong>
            {student.roll_number}
          </li>
          <li>
            <strong>Section: </strong>
            {student.section}
          </li>
          <li>
            <strong>Phone: </strong>
            {student.mobile.String}
          </li>
          <li>
            <strong>Batch: </strong>
            {student.batch}
          </li>
        </ul>
        {session.user?.image && (
          <Image
            src={session.user.image}
            height={128}
            width={128}
            alt="Display Image"
          />
        )}
      </section>

      <hr />
      <br />

      <section>
        {student.clubs ? (
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
