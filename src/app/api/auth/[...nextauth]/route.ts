import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import type { JWT } from 'next-auth/jwt';
import type { Session, User } from 'next-auth';
import { AuthOptions } from 'next-auth';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "邮箱", type: "email" },
        password: { label: "密码", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error('请输入邮箱和密码');
          }

          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user || !user.password) {
            throw new Error('用户不存在');
          }

          console.log('Comparing passwords:', {
            provided: credentials.password,
            stored: user.password
          });

          const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isCorrectPassword) {
            console.log('Password comparison failed');
            throw new Error('密码错误');
          }

          const { password, ...userWithoutPass } = user;
          return userWithoutPass;
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions as unknown as AuthOptions);

export { handler as GET, handler as POST };