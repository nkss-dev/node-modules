import { DialogClose } from '@radix-ui/react-dialog';
import { useState } from 'react';

import { submit } from './form-submit';

export const MemberForm = ({
  clubName,
  existingClubMember,
}: {
  clubName: string;
  existingClubMember: any;
}) => {
  const [clubMember, setClubMember] = useState<any>(existingClubMember);

  return (
    <form action={submit} className="flex flex-col gap-4">
      <input hidden name="club-name" readOnly type="text" value={clubName} />

      <input
        className="bg-palette-500 p-2"
        onChange={(event) =>
          setClubMember((member: any) => {
            return { ...member, roll_number: event.target.value };
          })
        }
        name="roll-number"
        placeholder="Roll Number"
        required
        type="text"
        value={clubMember.roll_number}
      />
      <input
        className="bg-palette-500 p-2"
        defaultValue="Member"
        onChange={(event) =>
          setClubMember((member: any) => {
            return { ...member, position: event.target.value };
          })
        }
        name="position"
        placeholder="Position"
        required
        type="text"
        value={clubMember.position}
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
        name="extra-groups"
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
        name="comments"
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
