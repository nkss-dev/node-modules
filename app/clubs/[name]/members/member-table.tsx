'use client';

import { useState } from 'react';

import Dialog from '../../../../components/dialog';
import useIsScreenLessThan from '../../../../utils/screen-width-check';
import { MemberForm } from './member-form';

const ColumnValues = ({
  columns,
  member,
}: {
  columns: Array<{ key: string; name: string }>;
  member: ClubMember;
}) => (
  <>
    {columns.map((column) => (
      <td key={column.key}>
        {
          // @ts-expect-error
          member[column.key] instanceof Array
            ? // @ts-expect-error
              member[column.key].length
              ? // @ts-expect-error
                member[column.key].map((element: any, index: number) => (
                  // TODO: Convert to chips
                  <li className="list-none" key={index}>
                    {element}
                  </li>
                ))
              : 'None'
            : // @ts-expect-error
              member[column.key] || '-'
        }
      </td>
    ))}
  </>
);

export const MemberTable = ({
  clubMembers,
  clubName,
  columns,
  mobileColumns,
}: {
  clubMembers: Array<ClubMember>;
  clubName: string;
  columns: Array<{ key: string; name: string }>;
  mobileColumns: Array<{ key: string; name: string }>;
}) => {
  const isMobile = useIsScreenLessThan(768);
  const [open, setOpen] = useState(false);

  return (
    <table className="border-2 w-full">
      <thead>
        <tr onClick={() => setOpen(true)}>
          {isMobile
            ? mobileColumns.map((column) => (
                <th key={column.key}>{column.name}</th>
              ))
            : columns.map((column) => <th key={column.key}>{column.name}</th>)}
        </tr>
        <Dialog
          className="max-w-sm min-w-sm"
          open={open}
          onChange={setOpen}
          title="Add Member"
          description={`Add a new member to ${clubName} here:`}
        >
          <MemberForm clubName={clubName} existingClubMember={{}} />
        </Dialog>
      </thead>

      <tbody>
        {clubMembers.map((member: ClubMember) => {
          return (
            <tr key={member.roll_number}>
              <ColumnValues columns={columns} member={member} />
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
