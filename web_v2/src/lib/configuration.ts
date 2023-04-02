import { z } from 'zod';

export const configSchema = z.object({
  oauth: z.object({
    google: z.object({
      client_id: z.string().nonempty(),
    }),
  }),
  api_uri: z.string().nonempty().url(),
});

export type Config = z.infer<typeof configSchema>;

export const config: Config = configSchema.parse({
  oauth: {
    google: {
      client_id: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID,
    },
  },
  api_uri: process.env.NEXT_PUBLIC_API_URI,
});
