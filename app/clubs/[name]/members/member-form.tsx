'use client';

import { useState } from 'react';
// @ts-expect-error
import { experimental_useFormState as useFormState } from 'react-dom';
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

import { createMember } from '../../../actions/club-members';

const initialState = {
  message: null,
};

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className="bg-palette-500 p-2 rounded-lg"
      type="submit"
    >
      {pending ? 'Loading...' : 'Add'}
    </button>
  );
};

export const MemberForm = ({
  clubName,
  existingClubMember,
}: {
  clubName: string;
  existingClubMember: any;
}) => {
  const [state, formAction] = useFormState(createMember, initialState);
  const [clubMember, setClubMember] = useState<any>(existingClubMember);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state?.message && (
        <p aria-live="polite" className="text-red-400">
          {state.message}
        </p>
      )}

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
        <SubmitButton />
      </div>
    </form>
  );
};
