'use client';

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
                <li key={index}>{element}</li>
              ))
            : 'None'
          : member[column.key] || '-'}
      </td>
    ))}
  </>
);

export const MemberTable = ({
  clubMembers,
  columns,
  mobileColumns,
}: {
  clubMembers: Array<ClubMember>;
  columns: Array<{ key: string; name: string }>;
  mobileColumns: Array<{ key: string; name: string }>;
}) => {
  const isMobile = useIsScreenLessThan(768);

  return (
    <table className="border-2 w-full">
      <thead>
        <tr>
          {isMobile
            ? mobileColumns.map((column) => (
                <th key={column.key}>{column.name}</th>
              ))
            : columns.map((column) => <th key={column.key}>{column.name}</th>)}
        </tr>
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
