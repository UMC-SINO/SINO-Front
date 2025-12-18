import { z } from 'zod';

export const signinSchema = z.object({
  name: z.string().min(3, '최소 3자 이상 입력해주세요.'),
});

export type SigninFormData = z.infer<typeof signinSchema>;
