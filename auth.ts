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

export class AuthService {

  static async registerUser(
    name: string,
    email: string,
    password: string
  ) {

    const user = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    console.log("New user created");

    return user;
  }

  static async signInUser(
    email: string,
    password: string
  ) {

    const session = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    console.log("User signed in");

    return session;
  }
}
export type AuthType = {
  user: typeof auth.$Infer.Session.user | null
  session: typeof auth.$Infer.Session.session | null
}
  