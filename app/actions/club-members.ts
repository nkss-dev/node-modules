'use server';

import { revalidatePath } from 'next/cache';
import { ZodError, z } from 'zod';

import api from '@/utils/api-actions';

const clubNameSchema = z.string();

const clubMemberSchema = z.object({
  roll_number: z.string(),
  position: z.string(),
  extra_groups: z.array(z.string()),
  comments: z.string().optional(),
});

export async function createMember(prevState: any, formData: FormData) {
  try {
    const clubName = clubNameSchema.parse(formData.get('club-name'));

    const clubMember = clubMemberSchema.parse({
      roll_number: formData.get('roll-number'),
      position: formData.get('position'),
      extra_groups: [],
      // extra_groups: formData.get('extra-groups'),
      comments: formData.get('comments'),
    });

    await api.POST(`/clubs/${clubName}/members`, clubMember);
    revalidatePath(`/clubs/${clubName}/members`);
  } catch (e) {
    if (e instanceof ZodError)
      return { message: "Form parameters don't match our type constraints" };

    // API error
    // @ts-expect-error
    if (e instanceof Error) return { message: e.cause[0].detail };

    // TODO: convert API error to its own class so this can be reached.
    return { message: 'Failed to add the member' };
  }
}
