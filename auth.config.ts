import { NextAuthConfig } from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import { JWT } from 'next-auth/jwt';

const authConfig = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? ''
    }),
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch('http://project-pw2.test/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });

          const result = await response.json();

          if (response.ok && result.status) {
            // Returning the user object here will save it in the session
            return {
              id: result.data.user.id,
              name: result.data.user.name,

              email: result.data.user.email,
              token: result.data.token // Include the token if needed
            };
          } else {
            // Returning null indicates failure
            throw new Error(result.message || 'Invalid credentials');
          }
        } catch (error) {
          throw new Error('Failed to authenticate. Please try again.');
        }
      }
    })
  ],
  pages: {
    signIn: '/' // Specify your sign-in page
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id!;
        token.name = user.name || '';
        token.image = user.image || '';
        token.email = user.email || '';
        token.token = user.token || '';
        token.emailVerified = null; // Explicitly set as null or map it from your user data
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name || '',
        image: token.image || '',
        email: token.email || '',
        token: token.token || '',
        emailVerified: token.emailVerified ?? null // Map as Date | null
      };
      return session;
    }
  }
} satisfies NextAuthConfig;

export default authConfig;
