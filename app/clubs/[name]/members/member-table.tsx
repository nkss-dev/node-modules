'use client';

import { useState } from 'react';

import Dialog from '../../../../components/dialog';
import useIsScreenLessThan from '../../../../utils/screen-width-check';

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
        {member[column.key] instanceof Array
          ? member[column.key].length
            ? member[column.key].map((element: any, index: number) => (
                // TODO: Convert to chips
                <li className="list-none" key={index}>
                  {element}
                </li>
              ))
            : 'None'
          : member[column.key] || '-'}
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
  const [clubMember, setClubMember] = useState<ClubMember>();

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
          open={open}
          onChange={setOpen}
          title="Add Member"
          description={`Add a new member to ${clubName} here:`}
        >
          <form className="flex flex-col gap-4">
            <input
              className="bg-palette-500 p-2"
              placeholder="Roll Number"
              type="text"
              value={clubMember?.roll_number}
              required
            />
            <input
              className="bg-palette-500 p-2"
              defaultValue="Member"
              placeholder="Position"
              type="text"
              value={clubMember?.position}
              required
            />
            <input
              className="bg-palette-500 p-2"
              placeholder="Extra Groups"
              type="text"
              value={clubMember?.extra_groups}
            />
            <textarea
              className="bg-palette-500 p-2"
              placeholder="Comments"
              value={clubMember?.comments}
            />
          </form>
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
