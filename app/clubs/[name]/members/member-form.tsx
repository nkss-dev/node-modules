'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

export const MemberForm = ({
  existingClubMember,
}: {
  existingClubMember: any;
}) => {
  const [clubMember, setClubMember] = useState<any>(existingClubMember);

  return (
    <form className="flex flex-col gap-4">
      <input
        className="bg-palette-500 p-2"
        onChange={(event) =>
          setClubMember((member: any) => {
            return { ...member, roll_number: event.target.value };
          })
        }
        placeholder="Roll Number"
        type="text"
        value={clubMember.roll_number}
        required
      />
      <input
        className="bg-palette-500 p-2"
        defaultValue="Member"
        onChange={(event) =>
          setClubMember((member: any) => {
            return { ...member, position: event.target.value };
          })
        }
        placeholder="Position"
        type="text"
        value={clubMember.position}
        required
      />
      <select
        className="bg-palette-500 p-2"
        onChange={(event) =>
          setClubMember((member: any) => {
            return {
              ...member,
              extra_groups: event.target.value ? [event.target.value] : [],
            };
          })
        }
        placeholder="Extra Groups"
        value={clubMember.extra_groups}
      >
        <option value="">-- Please choose an Option --</option>
        <option>Android Development</option>
        <option>AI/ML</option>
        <option>CP/DSA</option>
        <option>Open Source</option>
        <option>Web Development</option>
      </select>
      <textarea
        className="bg-palette-500 p-2"
        onChange={(event) =>
          setClubMember((member: any) => {
            return { ...member, comments: event.target.value };
          })
        }
        placeholder="Comments"
        value={clubMember.comments}
      />
      <div
        style={{
          display: 'flex',
          marginTop: 25,
          justifyContent: 'flex-end',
        }}
      >
        <DialogClose asChild>
          <button className="bg-palette-500 p-2 rounded-lg" type="submit">
            Save changes
          </button>
        </DialogClose>
      </div>
    </form>
  );
};
