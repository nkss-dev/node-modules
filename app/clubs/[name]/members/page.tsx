import { getServerSession } from 'next-auth';
import { Fragment } from 'react';
import { FaLock } from 'react-icons/fa';

import DefaultLayout from '../../../../components/default-layout';
import api from '../../../../utils/api-actions';
import { authOptions } from '../../../api/auth/auth';
import { MemberTable } from './member-table';

export default async function ClubMembersPage({
  params,
}: {
  params: { name: string };
}) {
  const clubName = params.name;
  const session = await getServerSession(authOptions);
  const clubMembers: Array<ClubMember> = await api.GET(
    `/clubs/${clubName}/members`
  );

  const duplicateBatches = clubMembers.map(({ batch }) => batch);
  const batches = duplicateBatches
    .filter((batch, index) => duplicateBatches.indexOf(batch) === index)
    .sort();

  const adminEmails = clubMembers
    .filter(({ position }) => position != 'Member')
    .map(({ email }) => email);
  const isAuthorised = adminEmails.includes(session?.user?.email || '');

  return (
    <DefaultLayout
      title={`Member list of ${params.name}`}
      description={
        isAuthorised
          ? `View and edit all the members of ${clubName}`
          : `View the post holders of ${clubName}`
      }
    >
      <h2>Admins</h2>
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
        <Fragment key={batch}>
          <h2>Batch of {batch}</h2>
          {isAuthorised ? (
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
            <section className="flex flex-row gap-4 justify-center">
              <FaLock size={32} />
              <p className="my-auto">
                {session
                  ? "You're not authorised to view this content. If you think this is a mistake, contact us at any platform below (see footer)"
                  : 'You need to sign in to view this content'}
              </p>
            </section>
          )}

          <hr className="mt-6 mb-4" />
        </Fragment>
      ))}
    </DefaultLayout>
  );
}
