import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the default `Session` interface to include custom fields.
   */
  interface Session {
    user: {
      id: string; // Add custom fields like `id`
      name: string;
      email: string;
      token: string; // Include token for API calls
      emailVerified?: Date | null; // Match `AdapterUser`'s expected type
    };
  }

  /**
   * Extend `User` to include custom fields if needed.
   */
  interface User {
    id: string;
    token: string;
    emailVerified?: Date | null; // Match `AdapterUser`'s expected type
  }
}

declare module 'next-auth/jwt' {
  /**
   * Extend the `JWT` interface to include additional properties stored in the token.
   */
  interface JWT {
    id: string;
    name: string;
    email: string;
    token: string;
    emailVerified?: Date | null; // Match `AdapterUser`'s expected type
  }
}
