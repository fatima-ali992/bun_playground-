import { betterAuth} from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { openAPI } from 'better-auth/plugins'

import prisma from "./repositories/Prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma,{ provider:'postgresql' }),
  trustedOrigins: ['http://localhost:5173','*'],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    openAPI()
  ],
});

export type AuthType = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}
  