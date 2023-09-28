import { getServerSession } from 'next-auth';
import { FaLock } from 'react-icons/fa';

import { fetcher } from '../../../../utils/fetcher';
import { authOptions } from '../../../api/auth/auth';
import { MemberTable } from './member-table';

export default async function ClubMembersPage({
  params,
}: {
  params: { name: string };
}) {
  const session = await getServerSession(authOptions);
  const clubMembers: Array<ClubMember> = await fetcher(`/clubs/GDSC/members`);

  const duplicateBatches = clubMembers.map(({ batch }) => batch);
  const batches = duplicateBatches
    .filter((batch, index) => duplicateBatches.indexOf(batch) === index)
    .sort();

  const adminEmails = clubMembers
    .filter(({ position }) => position != 'Member')
    .map(({ email }) => email);

  return (
    <>
      <h1>Admins</h1>
      <MemberTable
        clubMembers={clubMembers.filter(({ position }) => position != 'Member')}
        clubName={params.name}
        columns={[
          { key: 'roll_number', name: 'Roll Number' },
          { key: 'section', name: 'Section' },
          { key: 'name', name: 'Name' },
          { key: 'phone', name: 'Phone' },
          { key: 'email', name: 'Email' },
          { key: 'extra_groups', name: 'Extra Groups' },
        ]}
        mobileColumns={[
          { key: 'section', name: 'Section' },
          { key: 'name', name: 'Name' },
          { key: 'extra_groups', name: 'Extra Groups' },
        ]}
      />

      <hr className="mt-6 mb-4" />

      {batches.map((batch) => (
        <>
          <h1>Batch of {batch}</h1>
          {adminEmails.includes(session?.user?.email || '') ? (
            <MemberTable
              clubMembers={clubMembers.filter(
                (member) => member.batch == batch
              )}
              clubName={params.name}
              columns={[
                { key: 'roll_number', name: 'Roll Number' },
                { key: 'section', name: 'Section' },
                { key: 'name', name: 'Name' },
                { key: 'phone', name: 'Phone' },
                { key: 'email', name: 'Email' },
                { key: 'extra_groups', name: 'Extra Groups' },
              ]}
              mobileColumns={[
                { key: 'section', name: 'Section' },
                { key: 'name', name: 'Name' },
                { key: 'extra_groups', name: 'Extra Groups' },
              ]}
            />
          ) : (
            <section className="gap-4 inline-flex mx-auto">
              <FaLock size={32} />
              <p className="my-auto">
                {session
                  ? "You're not authorised to view this content. If you think this is a mistake, contact us at any platform below (see footer)"
                  : 'You need to sign in to view this content'}
              </p>
            </section>
          )}

          <hr className="mt-6 mb-4" />
        </>
      ))}
    </>
  );
}
