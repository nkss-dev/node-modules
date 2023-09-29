'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import api from '../../../../utils/api-actions';

const clubNameSchema = z.string();

const clubMemberSchema = z.object({
  roll_number: z.string(),
  position: z.string(),
  extra_groups: z.array(z.string()),
  comments: z.string().optional(),
});

export async function submit(formData: FormData) {
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
}
